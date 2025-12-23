// stockFlowController.js
import pool from '../db.js';
import Joi from "joi";
import { DateTime } from "luxon";
import { do_ma_query } from '../db.js';

// GET all stock flows with filters, pagination, and sorting
export const getStockFlows = async (req, res) => {
  try {
    const { warehouseFilter, user } = req;
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
      transport = "",
      from_wh = "",
      to_wh = "",
      sortBy = "created_at",
      sortOrder = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;

    let whereConditions = [];
    let queryParams = [];

    // FIXED: Apply warehouse filter for Admin users
    if (warehouseFilter) {
      whereConditions.push("(sf.from_wh = ? OR sf.to_wh = ?)");
      queryParams.push(warehouseFilter, warehouseFilter);
    }

    if (search) {
      whereConditions.push("(sf.description LIKE ? OR sf.from_loc LIKE ? OR sf.to_loc LIKE ?)");
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      whereConditions.push("sf.status = ?");
      queryParams.push(status);
    }

    if (transport) {
      whereConditions.push("sf.transport = ?");
      queryParams.push(transport);
    }

    if (from_wh) {
      whereConditions.push("sf.from_wh = ?");
      queryParams.push(from_wh);
    }

    if (to_wh) {
      whereConditions.push("sf.to_wh = ?");
      queryParams.push(to_wh);
    }

    const whereClause = whereConditions.length > 0 ? "WHERE " + whereConditions.join(" AND ") : "";

    // Validate sortBy to prevent SQL injection
    const allowedSortFields = ["created_at", "status", "transport", "quantity"];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : "created_at";
    const validSortOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

    // Main query with joins
    const query = `
      SELECT 
        sf.*,
        w1.title as from_warehouse_name,
        w2.title as to_warehouse_name
      FROM stock_flow sf
      LEFT JOIN warehouse w1 ON sf.from_wh = w1.id
      LEFT JOIN warehouse w2 ON sf.to_wh = w2.id
      ${whereClause}
      ORDER BY sf.${validSortBy} ${validSortOrder}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(parseInt(limit), parseInt(offset));

    const stockFlows = await do_ma_query(query, queryParams);

    // Count total for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM stock_flow sf
      ${whereClause}
    `;

    const countResult = await do_ma_query(countQuery, queryParams.slice(0, -2));

    console.log(`📊 Stock flow query results: ${stockFlows.length} flows (filtered: ${warehouseFilter ? 'Yes' : 'No'})`);

    res.status(200).json({
      success: true,
      data: stockFlows,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(countResult[0].total / limit),
      },
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching stock flows:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching stock flows",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};

// GET single stock flow by ID
export const getStockFlowById = async (req, res) => {
  try {
    const { id } = req.params;
    const { warehouseFilter } = req;

    const id_schema = Joi.object({
      id: Joi.number().integer().min(1).required().label("stock flow ID"),
    });

    const { error } = id_schema.validate({ id }, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: error.details[0].message,
      });
    }

    let query = `
      SELECT 
        sf.*,
        w1.title as from_warehouse_name,
        w2.title as to_warehouse_name
      FROM stock_flow sf
      LEFT JOIN warehouse w1 ON sf.from_wh = w1.id
      LEFT JOIN warehouse w2 ON sf.to_wh = w2.id
      WHERE sf.id = ?
    `;

    const queryParams = [id];

    // Apply warehouse filter for Admin
    if (warehouseFilter) {
      query += " AND (sf.from_wh = ? OR sf.to_wh = ?)";
      queryParams.push(warehouseFilter, warehouseFilter);
    }

    const stockFlows = await do_ma_query(query, queryParams);

    if (stockFlows.length === 0) {
      return res.status(404).json({
        success: false,
        message: warehouseFilter ? "Stock flow not found or access denied" : "Stock flow not found",
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }

    res.status(200).json({
      success: true,
      data: stockFlows[0],
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching stock flow:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching stock flow",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};

// CREATE stock flow
export const createStockFlow = async (req, res) => {
  try {
    const { warehouseFilter, user } = req;

    const stockflow_schema = Joi.object({
      from_wh: Joi.number().integer().min(1).allow(null).label("from warehouse"),
      to_wh: Joi.number().integer().min(1).allow(null).label("to warehouse"),
      from_loc: Joi.string().max(255).allow("", null).label("from location"),
      to_loc: Joi.string().max(255).allow("", null).label("to location"),
      quantity: Joi.number().integer().min(1).required().label("quantity"),
      transport: Joi.string().valid('bus', 'courier', 'employee', 'transport_co').required().label("transport"),
      status: Joi.string().valid('approved', 'delivered', 'in-transit').default('approved').label("status"),
      description: Joi.string().max(255).allow("", null).label("description"),
    });

    const { error, value } = stockflow_schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: error.details[0].message,
      });
    }

    // Validate: At least one warehouse must be specified
    if (!value.from_wh && !value.to_wh) {
      return res.status(400).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Either from warehouse or to warehouse must be specified",
      });
    }

    // FIXED: Admin can only create flows involving their warehouse
    if (warehouseFilter) {
      if (value.from_wh && value.from_wh !== warehouseFilter && 
          value.to_wh && value.to_wh !== warehouseFilter) {
        return res.status(403).json({
          success: false,
          timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
          message: "You can only create stock flows for your assigned warehouse",
        });
      }
    }

    // Verify warehouses exist
    if (value.from_wh) {
      const from_wh_check = await do_ma_query("SELECT COUNT(*) AS count FROM warehouse WHERE id = ?", [value.from_wh]);
      if (from_wh_check[0].count === 0) {
        return res.status(404).json({
          success: false,
          timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
          message: "From warehouse not found",
        });
      }
    }

    if (value.to_wh) {
      const to_wh_check = await do_ma_query("SELECT COUNT(*) AS count FROM warehouse WHERE id = ?", [value.to_wh]);
      if (to_wh_check[0].count === 0) {
        return res.status(404).json({
          success: false,
          timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
          message: "To warehouse not found",
        });
      }
    }

    // Insert stock flow
    const stockflow_insert_res = await do_ma_query(
      `INSERT INTO stock_flow
        (from_wh, to_wh, from_loc, to_loc, quantity, transport, status, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        value.from_wh || null,
        value.to_wh || null,
        value.from_loc || null,
        value.to_loc || null,
        value.quantity,
        value.transport,
        value.status || 'approved',
        value.description || null,
      ]
    );

    if (stockflow_insert_res.affectedRows === 1) {
      res.status(201).json({
        success: true,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Stock flow created successfully",
        data: {
          id: stockflow_insert_res.insertId,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Stock flow creation failed",
      });
    }
  } catch (err) {
    console.error("Error creating stock flow:", err);
    res.status(500).json({
      success: false,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      message: "Internal server error",
    });
  }
};

// UPDATE stock flow
export const updateStockFlowById = async (req, res) => {
  try {
    const { id } = req.params;
    const { warehouseFilter } = req;

    const stockflow_schema = Joi.object({
      from_wh: Joi.number().integer().min(1).allow(null).label("from warehouse"),
      to_wh: Joi.number().integer().min(1).allow(null).label("to warehouse"),
      from_loc: Joi.string().max(255).allow("", null).label("from location"),
      to_loc: Joi.string().max(255).allow("", null).label("to location"),
      quantity: Joi.number().integer().min(1).required().label("quantity"),
      transport: Joi.string().valid('bus', 'courier', 'employee', 'transport_co').required().label("transport"),
      status: Joi.string().valid('approved', 'delivered', 'in-transit').required().label("status"),
      description: Joi.string().max(255).allow("", null).label("description"),
    });

    const { error, value } = stockflow_schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: error.details[0].message,
      });
    }

    // Check if stock flow exists
    let checkQuery = "SELECT * FROM stock_flow WHERE id = ?";
    const checkParams = [id];

    if (warehouseFilter) {
      checkQuery += " AND (from_wh = ? OR to_wh = ?)";
      checkParams.push(warehouseFilter, warehouseFilter);
    }

    const stockflow_check = await do_ma_query(checkQuery, checkParams);

    if (stockflow_check.length === 0) {
      return res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: warehouseFilter ? "Stock flow not found or access denied" : "Stock flow not found",
      });
    }

    // Update stock flow
    const stockflow_update_res = await do_ma_query(
      `UPDATE stock_flow SET
        from_wh = ?, to_wh = ?, from_loc = ?, to_loc = ?, 
        quantity = ?, transport = ?, status = ?, description = ?
      WHERE id = ?`,
      [
        value.from_wh || null,
        value.to_wh || null,
        value.from_loc || null,
        value.to_loc || null,
        value.quantity,
        value.transport,
        value.status,
        value.description || null,
        id,
      ]
    );

    if (stockflow_update_res.affectedRows === 1) {
      res.status(200).json({
        success: true,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Stock flow updated successfully",
      });
    } else {
      res.status(304).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "No changes made to stock flow",
      });
    }
  } catch (err) {
    console.error("Error updating stock flow:", err);
    res.status(500).json({
      success: false,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      message: "Internal server error",
    });
  }
};

// DELETE stock flow
export const deleteStockFlow = async (req, res) => {
  try {
    const { id } = req.params;
    const { warehouseFilter } = req;

    const id_schema = Joi.object({
      id: Joi.number().integer().min(1).required().label("stock flow ID"),
    });

    const { error } = id_schema.validate({ id }, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: error.details[0].message,
      });
    }

    // Check if stock flow exists
    let checkQuery = "SELECT * FROM stock_flow WHERE id = ?";
    const checkParams = [id];

    if (warehouseFilter) {
      checkQuery += " AND (from_wh = ? OR to_wh = ?)";
      checkParams.push(warehouseFilter, warehouseFilter);
    }

    const stockflow_check = await do_ma_query(checkQuery, checkParams);

    if (stockflow_check.length === 0) {
      return res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: warehouseFilter ? "Stock flow not found or access denied" : "Stock flow not found",
      });
    }

    // Delete stock flow
    const stockflow_delete_res = await do_ma_query("DELETE FROM stock_flow WHERE id = ?", [id]);

    if (stockflow_delete_res.affectedRows === 1) {
      res.status(200).json({
        success: true,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Stock flow deleted successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Stock flow deletion failed",
      });
    }
  } catch (err) {
    console.error("Error deleting stock flow:", err);
    res.status(500).json({
      success: false,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      message: "Internal server error",
    });
  }
};

// GET stock flow statistics
export const getStockFlowStats = async (req, res) => {
  try {
    const { warehouseFilter } = req;

    let whereClause = "";
    let queryParams = [];

    if (warehouseFilter) {
      whereClause = "WHERE (from_wh = ? OR to_wh = ?)";
      queryParams = [warehouseFilter, warehouseFilter];
    }

    const statsQuery = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'in-transit' THEN 1 ELSE 0 END) as in_transit,
        SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered,
        SUM(quantity) as total_quantity
      FROM stock_flow
      ${whereClause}
    `;

    const stats = await do_ma_query(statsQuery, queryParams);

    res.status(200).json({
      success: true,
      data: stats[0],
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching stock flow stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};