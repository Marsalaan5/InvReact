
  import pool from '../db.js';
  import Joi from "joi";
  import { DateTime } from "luxon";
  import { do_ma_query } from '../db.js';
  import { sendEmail, sendTemplateEmail } from '../services/emailService.js';


  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

  function formatLabel(value) {
    const labelMap = {
      'transport_co': 'Transport Company',
      'in-transit': 'In Transit',
      'approved': 'Approved',
      'delivered': 'Delivered',
      'bus': 'Bus',
      'courier': 'Courier',
      'employee': 'Employee',
    };
    return labelMap[value] || value.charAt(0).toUpperCase() + value.slice(1);
  }

  // MAIN EMAIL FUNCTION - Sends emails based on status
  async function sendStockFlowStatusEmail(stockFlow, userEmail) {
    const warehouseIds = [stockFlow.from_wh, stockFlow.to_wh].filter(Boolean);

    const warehouses = await do_ma_query(
      'SELECT id, title, email_1 FROM warehouse WHERE id IN (?)',
      [warehouseIds]
    );

    const warehouseMap = {};
    warehouses.forEach(w => warehouseMap[w.id] = w.title);

    const flowPath = `${warehouseMap[stockFlow.from_wh] || '-'} → ${warehouseMap[stockFlow.to_wh] || '-'}`;

    // Status configuration - MUST match your database template names exactly
    const STATUS_CONFIG = {
      approved: {
        template: 'stock_flow_created',
        subject: 'Stock Flow Created',
      },
      'in-transit': {
        template: 'stock_flow_shipping',
        subject: 'Stock Flow In Transit',
      },
      delivered: {
        template: 'stock_flow_delivered',
        subject: 'Stock Flow Delivered',
      },
    };

    const config = STATUS_CONFIG[stockFlow.status];
    if (!config) {
      console.log(` No email template configured for status: ${stockFlow.status}`);
      return;
    }

    const payload = {
      warehouse_name: '',
      stock_flow_id: stockFlow.id,
      status: formatLabel(stockFlow.status),
      from_wh: warehouseMap[stockFlow.from_wh] || '-',
      to_wh: warehouseMap[stockFlow.to_wh] || '-',
      quantity: stockFlow.quantity,
      transport: formatLabel(stockFlow.transport),
      description: stockFlow.description || '-',
      flow_path: flowPath,
      orderNumber: `SF-${stockFlow.id}`,
      trackingNumber: `TRK-${stockFlow.id}`,
      action_link: `${FRONTEND_URL}/stock-flows/${stockFlow.id}`,
    };

    //  Send to warehouses
    for (const wh of warehouses) {
      if (!wh.email_1) continue;

      try {
        await sendTemplateEmail(
          config.template,
          wh.email_1,
          { ...payload, warehouse_name: wh.title },
          config.subject
        );
        console.log(` Email sent to ${wh.title} (${wh.email_1})`);
      } catch (err) {
        console.error(` Email failed to ${wh.email_1}:`, err.message);
      }
    }

    // Send to Super Admin
    if (userEmail) {
      try {
        await sendTemplateEmail(
          config.template,
          userEmail,
          { ...payload, warehouse_name: 'Super Admin' },
          config.subject
        );
        console.log(`✅ Email sent to Super Admin (${userEmail})`);
      } catch (err) {
        console.error(`❌ Email failed to Super Admin:`, err.message);
      }
    }
  }

  // GET stock flow options
  export const getStockFlowOptions = async (req, res) => {
    try {
      const query = `
        SELECT 
          COLUMN_NAME,
          COLUMN_TYPE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'stock_flow'
          AND TABLE_SCHEMA = DATABASE()
          AND COLUMN_NAME IN ('transport', 'status')
      `;

      const columns = await do_ma_query(query);

      const options = {
        transport: [],
        status: [],
        sort: [
          { value: "created_at:DESC", label: "Newest First" },
          { value: "created_at:ASC", label: "Oldest First" },
          { value: "quantity:DESC", label: "Quantity High to Low" },
          { value: "quantity:ASC", label: "Quantity Low to High" },
        ],
      };

      columns.forEach(column => {
        const columnName = column.COLUMN_NAME;
        const columnType = column.COLUMN_TYPE;
        const enumMatch = columnType.match(/enum\((.*?)\)/i);
        
        if (enumMatch) {
          const enumValues = enumMatch[1]
            .split(',')
            .map(val => val.replace(/'/g, '').trim());

          options[columnName] = enumValues.map(value => ({
            value: value,
            label: formatLabel(value),
          }));
        }
      });

      res.status(200).json({
        success: true,
        data: options,
        timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
      });
    } catch (error) {
      console.error('Error fetching stock flow options:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching options',
        error: error.message,
        timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
      });
    }
  };

  // GET all stock flows
  export const getStockFlows = async (req, res) => {
    try {
      const { warehouseFilter } = req;
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

      const allowedSortFields = ["created_at", "status", "transport", "quantity"];
      const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : "created_at";
      const validSortOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

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

      const countQuery = `
        SELECT COUNT(*) as total
        FROM stock_flow sf
        ${whereClause}
      `;

      const countResult = await do_ma_query(countQuery, queryParams.slice(0, -2));

      console.log(`Stock flow query results: ${stockFlows.length} flows (filtered: ${warehouseFilter ? 'Yes' : 'No'})`);

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

  // GET singl STOCK FLOW
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

  // CREATE 
  export const createStockFlow = async (req, res) => {
    try {
      const { warehouseFilter, user } = req;

      const stockflow_schema = Joi.object({
        from_wh: Joi.number().integer().min(1).allow(null).label('from warehouse'),
        to_wh: Joi.number().integer().min(1).allow(null).label('to warehouse'),
        from_loc: Joi.string().max(255).allow('', null).label('from location'),
        to_loc: Joi.string().max(255).allow('', null).label('to location'),
        quantity: Joi.number().integer().min(1).required().label('quantity'),
        transport: Joi.string()
          .valid('bus', 'courier', 'employee', 'transport_co')
          .required()
          .label('transport'),
        status: Joi.string()
          .valid('approved', 'delivered', 'in-transit')
          .default('approved')
          .label('status'),
        description: Joi.string().max(255).allow('', null).label('description'),
      });

      const { error, value } = stockflow_schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          success: false,
          timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
          message: error.details[0].message,
        });
      }

      if (!value.from_wh && !value.to_wh) {
        return res.status(400).json({
          success: false,
          timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
          message: 'Either from warehouse or to warehouse must be specified',
        });
      }

      if (warehouseFilter) {
        if (
          value.from_wh &&
          value.from_wh !== warehouseFilter &&
          value.to_wh &&
          value.to_wh !== warehouseFilter
        ) {
          return res.status(403).json({
            success: false,
            timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
            message: 'You can only create stock flows for your assigned warehouse',
          });
        }
      }

      if (value.from_wh) {
        const from_wh_check = await do_ma_query(
          'SELECT COUNT(*) AS count FROM warehouse WHERE id = ?',
          [value.from_wh]
        );
        if (from_wh_check[0].count === 0) {
          return res.status(404).json({
            success: false,
            timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
            message: 'From warehouse not found',
          });
        }
      }

      if (value.to_wh) {
        const to_wh_check = await do_ma_query(
          'SELECT COUNT(*) AS count FROM warehouse WHERE id = ?',
          [value.to_wh]
        );
        if (to_wh_check[0].count === 0) {
          return res.status(404).json({
            success: false,
            timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
            message: 'To warehouse not found',
          });
        }
      }

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

      if (stockflow_insert_res.affectedRows !== 1) {
        return res.status(500).json({
          success: false,
          timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
          message: 'Stock flow creation failed',
        });
      }

      const stockFlowId = stockflow_insert_res.insertId;

      const warehouseIds = [];
      if (value.from_wh) warehouseIds.push(value.from_wh);
      if (value.to_wh) warehouseIds.push(value.to_wh);

      const warehouses = await do_ma_query(
        'SELECT id, title, email_1 FROM warehouse WHERE id IN (?)',
        [warehouseIds]
      );

      const warehouseMap = {};
      warehouses.forEach((wh) => {
        warehouseMap[wh.id] = wh.title;
      });

      const flowPath = `${warehouseMap[value.from_wh] || '-'} → ${warehouseMap[value.to_wh] || '-'}`;

      for (const wh of warehouses) {
        if (wh.email_1) {
          try {
            await sendTemplateEmail('stock_flow_created', wh.email_1, {
              warehouse_name: wh.title,
              quantity: value.quantity,
              transport: formatLabel(value.transport),
              status: formatLabel(value.status),
              description: value.description || '-',
              from_wh: warehouseMap[value.from_wh] || '-',
              to_wh: warehouseMap[value.to_wh] || '-',
              flow_path: flowPath,
              stock_flow_id: stockFlowId,
            });
          } catch (err) {
            console.error(`Failed to send email to ${wh.email_1}:`, err.message);
          }
        }
      }

      if (user?.email_1) {
        try {
          await sendTemplateEmail('stock_flow_created', user.email_1, {
            warehouse_name: 'N/A (Super Admin)',
            quantity: value.quantity,
            transport: formatLabel(value.transport),
            status: formatLabel(value.status),
            description: value.description || '-',
            from_wh: warehouseMap[value.from_wh] || '-',
            to_wh: warehouseMap[value.to_wh] || '-',
            flow_path: flowPath,
            stock_flow_id: stockFlowId,
          });
        } catch (err) {
          console.error(`Failed to send email to Super Admin ${user.email_1}:`, err.message);
        }
      }

      return res.status(201).json({
        success: true,
        timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
        message: 'Stock flow created successfully',
        data: { id: stockFlowId },
      });
    } catch (err) {
      console.error('Error creating stock flow:', err);
      return res.status(500).json({
        success: false,
        timestamp: DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
        message: 'Internal server error',
      });
    }
  };


  export const updateStockFlowById = async (req, res) => {
    try {
      const { id } = req.params;
      const { warehouseFilter, user } = req;

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

      const previousStatus = stockflow_check[0].status;

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
        const [updatedStockFlow] = await do_ma_query(
          `SELECT sf.*, 
            w1.title AS from_warehouse_name,
            w2.title AS to_warehouse_name
          FROM stock_flow sf
          LEFT JOIN warehouse w1 ON sf.from_wh = w1.id
          LEFT JOIN warehouse w2 ON sf.to_wh = w2.id
          WHERE sf.id = ?`,
          [id]
        );

        if (previousStatus !== value.status) {
          console.log(` Status changed from "${previousStatus}" to "${value.status}", sending emails...`);
          try {
            await sendStockFlowStatusEmail(updatedStockFlow, user?.email_1);
          } catch (emailError) {
            console.error(' Error sending status change emails:', emailError);
          }
        }

        return res.status(200).json({
          success: true,
          timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
          message: "Stock flow updated successfully",
          data: updatedStockFlow,
        });
      } else {
        return res.status(304).json({
          success: false,
          timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
          message: "No changes made to stock flow",
        });
      }

    } catch (err) {
      console.error("Error updating stock flow:", err);
      return res.status(500).json({
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




  export const getStockFlowChartData = async (req, res) => {
    try {
      const { warehouseFilter } = req;
      const { period = 'daily', warehouse_id } = req.query;

      let dateGrouping, dateRange;
      
      switch(period) {
        case 'daily':
          dateGrouping = 'DATE(created_at)';
          dateRange = 'INTERVAL 7 DAY';
          break;
        case 'weekly':
          dateGrouping = 'YEARWEEK(created_at, 1)';
          dateRange = 'INTERVAL 8 WEEK';
          break;
        case 'monthly':
          dateGrouping = 'DATE_FORMAT(created_at, "%Y-%m")';
          dateRange = 'INTERVAL 6 MONTH';
          break;
        default:
          dateGrouping = 'DATE(created_at)';
          dateRange = 'INTERVAL 7 DAY';
      }

      let whereConditions = [`created_at >= DATE_SUB(NOW(), ${dateRange})`];
      let queryParams = [];

      if (warehouseFilter) {
        whereConditions.push('(from_wh = ? OR to_wh = ?)');
        queryParams.push(warehouseFilter, warehouseFilter);
      } else if (warehouse_id) {
        whereConditions.push('(from_wh = ? OR to_wh = ?)');
        queryParams.push(warehouse_id, warehouse_id);
      }

      const whereClause = 'WHERE ' + whereConditions.join(' AND ');

      // Separate query for each status to avoid overlapping lines
      const query = `
        SELECT 
          ${dateGrouping} as date_key,
          status,
          COUNT(*) as flow_count,
          SUM(quantity) as total_quantity,
          GROUP_CONCAT(DISTINCT 
            CONCAT(w1.title, ' → ', w2.title) 
            SEPARATOR '; '
          ) as flow_paths
        FROM stock_flow sf
        LEFT JOIN warehouse w1 ON sf.from_wh = w1.id
        LEFT JOIN warehouse w2 ON sf.to_wh = w2.id
        ${whereClause}
        GROUP BY ${dateGrouping}, status
        ORDER BY date_key ASC, status
      `;

      const rawData = await do_ma_query(query, queryParams);

      // Transform data for better chart visualization
      const chartData = {};
      const statuses = ['approved', 'in-transit', 'delivered'];
      
      rawData.forEach(row => {
        const dateLabel = formatDateLabel(row.date_key, period);
        
        if (!chartData[dateLabel]) {
          chartData[dateLabel] = {
            date: dateLabel,
            approved: 0,
            'in-transit': 0,
            delivered: 0,
            details: {}
          };
        }
        
        chartData[dateLabel][row.status] = row.total_quantity;
        chartData[dateLabel].details[row.status] = {
          count: row.flow_count,
          quantity: row.total_quantity,
          paths: row.flow_paths
        };
      });

      const formattedData = Object.values(chartData);

      res.status(200).json({
        success: true,
        data: formattedData,
        period: period,
        dateRange: dateRange,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });

    } catch (error) {
      console.error('Error fetching stock flow chart data:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching chart data',
        error: error.message,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }
  };

  /**
   * GET Low Stock Chart Data with Better Structure
   * Query params: period (daily, weekly, monthly), warehouse_id, threshold
   */
  export const getLowStockChartData = async (req, res) => {
    try {
      const { warehouseFilter } = req;
      const { 
        period = 'daily', 
        warehouse_id,
        threshold = 10 
      } = req.query;

      let dateGrouping, dateRange;
      
      switch(period) {
        case 'daily':
          dateGrouping = 'DATE(p.updated_at)';
          dateRange = 'INTERVAL 7 DAY';
          break;
        case 'weekly':
          dateGrouping = 'YEARWEEK(p.updated_at, 1)';
          dateRange = 'INTERVAL 8 WEEK';
          break;
        case 'monthly':
          dateGrouping = 'DATE_FORMAT(p.updated_at, "%Y-%m")';
          dateRange = 'INTERVAL 6 MONTH';
          break;
        default:
          dateGrouping = 'DATE(p.updated_at)';
          dateRange = 'INTERVAL 7 DAY';
      }

      let whereConditions = [
        `p.updated_at >= DATE_SUB(NOW(), ${dateRange})`,
        'p.count > 0',
        'p.count <= ?'
      ];
      let queryParams = [threshold];

      if (warehouseFilter) {
        whereConditions.push('p.warehouse_id = ?');
        queryParams.push(warehouseFilter);
      } else if (warehouse_id) {
        whereConditions.push('p.warehouse_id = ?');
        queryParams.push(warehouse_id);
      }

      const whereClause = 'WHERE ' + whereConditions.join(' AND ');

      // Group by warehouse for better visualization
      const query = `
        SELECT 
          ${dateGrouping} as date_key,
          w.id as warehouse_id,
          w.title as warehouse_name,
          COUNT(*) as product_count,
          SUM(p.count) as total_quantity,
          GROUP_CONCAT(
            CONCAT(p.title, ' (', p.count, ')')
            ORDER BY p.count ASC
            SEPARATOR '; '
          ) as low_stock_products
        FROM product p
        LEFT JOIN warehouse w ON p.warehouse_id = w.id
        ${whereClause}
        GROUP BY ${dateGrouping}, w.id, w.title
        ORDER BY date_key ASC, warehouse_name
      `;

      const rawData = await do_ma_query(query, queryParams);

      // Transform for stacked bar chart by warehouse
      const chartData = {};
      const warehouses = new Set();

      rawData.forEach(row => {
        const dateLabel = formatDateLabel(row.date_key, period);
        warehouses.add(row.warehouse_name);
        
        if (!chartData[dateLabel]) {
          chartData[dateLabel] = {
            date: dateLabel,
            total: 0,
            warehouses: {}
          };
        }
        
        chartData[dateLabel].warehouses[row.warehouse_name] = {
          count: row.product_count,
          quantity: row.total_quantity,
          products: row.low_stock_products
        };
        chartData[dateLabel].total += row.product_count;
        chartData[dateLabel][row.warehouse_name] = row.product_count;
      });

      const formattedData = Object.values(chartData);

      // Get current low stock summary by warehouse
      const summaryQuery = `
        SELECT 
          w.title as warehouse_name,
          COUNT(*) as low_stock_count,
          SUM(p.count) as total_quantity
        FROM product p
        LEFT JOIN warehouse w ON p.warehouse_id = w.id
        WHERE p.count > 0 AND p.count <= ?
        ${warehouseFilter ? 'AND p.warehouse_id = ?' : ''}
        GROUP BY w.id, w.title
        ORDER BY low_stock_count DESC
      `;

      const summaryParams = warehouseFilter 
        ? [threshold, warehouseFilter] 
        : [threshold];
      
      const summary = await do_ma_query(summaryQuery, summaryParams);

      res.status(200).json({
        success: true,
        data: {
          chartData: formattedData,
          warehouses: Array.from(warehouses),
          summary: summary,
          threshold: threshold
        },
        period: period,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });

    } catch (error) {
      console.error('Error fetching low stock chart data:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching low stock chart data',
        error: error.message,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }
  };

  /**
   * GET Out of Stock Trend Data
   */
  export const getOutOfStockTrendData = async (req, res) => {
    try {
      const { warehouseFilter } = req;
      const { period = 'daily', warehouse_id } = req.query;

      let dateGrouping, dateRange;
      
      switch(period) {
        case 'daily':
          dateGrouping = 'DATE(p.updated_at)';
          dateRange = 'INTERVAL 7 DAY';
          break;
        case 'weekly':
          dateGrouping = 'YEARWEEK(p.updated_at, 1)';
          dateRange = 'INTERVAL 8 WEEK';
          break;
        case 'monthly':
          dateGrouping = 'DATE_FORMAT(p.updated_at, "%Y-%m")';
          dateRange = 'INTERVAL 6 MONTH';
          break;
        default:
          dateGrouping = 'DATE(p.updated_at)';
          dateRange = 'INTERVAL 7 DAY';
      }

      let whereConditions = [
        `p.updated_at >= DATE_SUB(NOW(), ${dateRange})`,
        'p.count = 0'
      ];
      let queryParams = [];

      if (warehouseFilter) {
        whereConditions.push('p.warehouse_id = ?');
        queryParams.push(warehouseFilter);
      } else if (warehouse_id) {
        whereConditions.push('p.warehouse_id = ?');
        queryParams.push(warehouse_id);
      }

      const whereClause = 'WHERE ' + whereConditions.join(' AND ');

      const query = `
        SELECT 
          ${dateGrouping} as date_key,
          w.title as warehouse_name,
          COUNT(*) as out_of_stock_count,
          GROUP_CONCAT(p.title SEPARATOR '; ') as products
        FROM product p
        LEFT JOIN warehouse w ON p.warehouse_id = w.id
        ${whereClause}
        GROUP BY ${dateGrouping}, w.title
        ORDER BY date_key ASC
      `;

      const rawData = await do_ma_query(query, queryParams);

      const chartData = {};
      rawData.forEach(row => {
        const dateLabel = formatDateLabel(row.date_key, period);
        
        if (!chartData[dateLabel]) {
          chartData[dateLabel] = {
            date: dateLabel,
            total: 0
          };
        }
        
        chartData[dateLabel][row.warehouse_name] = row.out_of_stock_count;
        chartData[dateLabel].total += row.out_of_stock_count;
      });

      res.status(200).json({
        success: true,
        data: Object.values(chartData),
        period: period,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });

    } catch (error) {
      console.error('Error fetching out of stock trend:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching trend data',
        error: error.message,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }
  };

  // Helper function to format date labels
  function formatDateLabel(dateKey, period) {
    if (!dateKey) return 'Unknown';
    
    switch(period) {
      case 'daily':
        return DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss");
      case 'weekly':
        const year = dateKey.toString().substring(0, 4);
        const week = dateKey.toString().substring(4);
        return `Week ${week}, ${year}`;
      case 'monthly':
        return DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss");
      default:
        return dateKey;
    }
  }

  /**
   * GET Stock Status Distribution (for pie/donut charts)
   */
  export const getStockStatusDistribution = async (req, res) => {
    try {
      const { warehouseFilter } = req;
      const { warehouse_id } = req.query;

      let whereConditions = [];
      let queryParams = [];

      if (warehouseFilter) {
        whereConditions.push('p.warehouse_id = ?');
        queryParams.push(warehouseFilter);
      } else if (warehouse_id) {
        whereConditions.push('p.warehouse_id = ?');
        queryParams.push(warehouse_id);
      }

      const whereClause = whereConditions.length > 0 
        ? 'WHERE ' + whereConditions.join(' AND ') 
        : '';

      const query = `
        SELECT 
          CASE 
            WHEN p.count = 0 THEN 'Out of Stock'
            WHEN p.count <= 10 THEN 'Low Stock'
            WHEN p.count <= 50 THEN 'Medium Stock'
            ELSE 'High Stock'
          END as stock_level,
          COUNT(*) as product_count,
          SUM(p.count) as total_quantity,
          GROUP_CONCAT(
            DISTINCT w.title
            SEPARATOR ', '
          ) as warehouses
        FROM product p
        LEFT JOIN warehouse w ON p.warehouse_id = w.id
        ${whereClause}
        GROUP BY stock_level
        ORDER BY 
          CASE stock_level
            WHEN 'Out of Stock' THEN 1
            WHEN 'Low Stock' THEN 2
            WHEN 'Medium Stock' THEN 3
            WHEN 'High Stock' THEN 4
          END
      `;

      const distribution = await do_ma_query(query, queryParams);

      res.status(200).json({
        success: true,
        data: distribution,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });

    } catch (error) {
      console.error('Error fetching stock distribution:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching distribution data',
        error: error.message,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }
  };

  /**
   * GET Warehouse Comparison Data
   */
  export const getWarehouseComparison = async (req, res) => {
    try {
      const { warehouseFilter } = req;
      const { threshold = 10 } = req.query;

      let whereClause = warehouseFilter ? 'WHERE w.id = ?' : '';
      let queryParams = warehouseFilter ? [warehouseFilter] : [];

      const query = `
        SELECT 
          w.id,
          w.title as warehouse_name,
          COUNT(p.id) as total_products,
          SUM(p.count) as total_stock,
          SUM(CASE WHEN p.count = 0 THEN 1 ELSE 0 END) as out_of_stock,
          SUM(CASE WHEN p.count > 0 AND p.count <= ? THEN 1 ELSE 0 END) as low_stock,
          SUM(CASE WHEN p.count > ? THEN 1 ELSE 0 END) as healthy_stock,
          AVG(p.count) as avg_stock_per_product
        FROM warehouse w
        LEFT JOIN product p ON p.warehouse_id = w.id
        ${whereClause}
        GROUP BY w.id, w.title
        ORDER BY total_products DESC
      `;

      const params = [...queryParams, threshold, threshold];
      const comparison = await do_ma_query(query, params);

      res.status(200).json({
        success: true,
        data: comparison,
        threshold: threshold,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });

    } catch (error) {
      console.error('Error fetching warehouse comparison:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching comparison data',
        error: error.message,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }
  };