import pool from '../db.js';
import Joi from "joi"
import  {DateTime} from "luxon";
import { do_ma_query } from '../db.js';




function parseDateSafe(dateStr) {
	if (!dateStr) return null;
	const dt = DateTime.fromFormat(dateStr, "yyyy-MM-dd HH:mm:ss ZZ");
	return dt.isValid ? dt.toFormat("yyyy-MM-dd HH:mm:ss") : null;
}


  
  export const getWhTitle = async (req, res) => {
	try {
		const wh_label = "warehouse title";

		const wh_title_schema = Joi.object({
			idx: Joi.string()
				.min(3)
				.max(127)
				.pattern(new RegExp("^(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9-_.]+(?<![-_.])$"))
				.required()
				.label(wh_label)
				.messages({
					"string.pattern.base": `${wh_label} can include letters (a-z), numbers (0-9), and these special characters (-_.). You cannot start or end a ${wh_label} with a special character or use multiple special characters in a row.`,
				}),
		});

		const { error, value } = wh_title_schema.validate(req.params, { abortEarly: false });

		if (error) {
			return res.status(400).json({
				success: false,
				available: null,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: error.details[0].message,
			});
		}

		let read_wh_title = await do_ma_query("SELECT COUNT(*) AS count FROM warehouse WHERE title = ?;", [value.idx]);

		if (read_wh_title[0].count === 0) {
			return res.status(200).json({
				success: true,
				available: true,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Resource available.",
			});
		} else {
			return res.status(422).json({
				success: false,
				available: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Resource already taken.",
			});
		}
	} catch (err) {
		console.error(`Route: ${req.originalUrl}, Error:`, err);
		res.status(500).json({
			success: false,
			available: null,
			timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
			message: "Internal server error.",
		});
	}
};



  
  export const getWhPhone = async (req, res) => {
	try {
		const phone_no_label = "phone number";

		const phone_no_schema = Joi.object({
			idx: Joi.string()
				.pattern(new RegExp("^[0-9]{10}$"))
				.required()
				.label(phone_no_label)
				.messages({
					"string.pattern.base": `${phone_no_label} must have exactly 10 digits and contain only numbers.`,
				}),
		});

		const { error, value } = phone_no_schema.validate(req.params, { abortEarly: false });

		if (error) {
			return res.status(400).json({
				success: false,
				available: null,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: error.details[0].message,
			});
		}

		let read_wh_phone = await do_ma_query("SELECT COUNT(*) AS count FROM warehouse WHERE phone_1 = ?;", [
			value.idx,
		]);

		if (read_wh_phone[0].count === 0) {
			return res.status(200).json({
				success: true,
				available: true,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Resource available.",
			});
		} else {
			return res.status(422).json({
				success: false,
				available: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Resource already taken.",
			});
		}
	} catch (err) {
		console.error(`Route: ${req.originalUrl}, Error:`, err);
		res.status(500).json({
			success: false,
			available: null,
			timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
			message: "Internal server error.",
		});
	}
};


  
  
  export const getWhEmail = async (req, res) => {
	try {
		const email_id_label = "email ID";

		const email_schema = Joi.object({
			idx: Joi.string().max(127).email().required().label(email_id_label),
		});

		const { error, value } = email_schema.validate(req.params, { abortEarly: false });

		if (error) {
			return res.status(400).json({
				success: false,
				available: null,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: error.details[0].message,
			});
		}

		let read_email = await do_ma_query("SELECT COUNT(*) AS count FROM warehouse WHERE email_1 = ?;", [value.idx]);

		if (read_email[0].count === 0) {
			return res.status(200).json({
				success: true,
				available: true,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Resource available.",
			});
		} else {
			return res.status(422).json({
				success: false,
				available: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Resource already taken.",
			});
		}
	} catch (err) {
		console.error(`Route: ${req.originalUrl}, Error:`, err);
		res.status(500).json({
			success: false,
			available: null,
			timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
			message: "Internal server error.",
		});
	}
};



// Get all warehouses with filters
export const getAllWarehouses = async (req, res) => {
  try {
    const { searchTerm, sortBy } = req.query;


	let query = `
  SELECT 
    w.id,
    w.title AS name,
    w.phone_1 AS phone,
    w.email_1 AS email,
    w.address,
    w.status,
    w.created_at,
    w.updated_at,
    u.name AS contact_person_name,
    COALESCE(COUNT(DISTINCT p.id), 0) AS total_products
  FROM warehouse w
  LEFT JOIN users u ON w.contact_person_id = u.id
  LEFT JOIN product p ON p.warehouse_id = w.id
`;

let whereConditions = [];
let queryParams = [];

if (searchTerm) {
    whereConditions.push(`(w.title LIKE ? OR w.phone_1 LIKE ? OR w.email_1 LIKE ? OR w.address LIKE ?)`);
    const searchPattern = `%${searchTerm}%`;
    queryParams.push(searchPattern, searchPattern, searchPattern, searchPattern);
}

if (whereConditions.length > 0) {
    query += ` WHERE ${whereConditions.join(' AND ')}`;
}

// GROUP BY
query += `
  GROUP BY w.id, w.title, w.phone_1, w.email_1, w.address, w.status, w.created_at, w.updated_at, u.name
`;

// HAVING
query += ` HAVING total_products > 0`;

// ORDER BY
if (sortBy === 'date_asc') {
    query += ` ORDER BY w.created_at ASC`;
} else {
    query += ` ORDER BY w.created_at DESC`; // default
}


    const warehouses = await do_ma_query(query, queryParams);

    res.status(200).json({
      success: true,
      data: warehouses,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      message: "Warehouses retrieved successfully.",
    });
  } catch (err) {
    console.error(`Route: ${req.originalUrl}, Error:`, err);
    res.status(500).json({
      success: false,
      data: [],
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      message: "Internal server error.",
    });
  }
};





// Get warehouse by ID
export const getWarehouseById = async (req, res) => {
	try {
		const { id } = req.params;

		const id_schema = Joi.object({
			id: Joi.number().integer().min(1).required().label("warehouse ID"),
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

		const query = `
			SELECT 
				w.id,
				w.title as wh_title,
				w.contact_person_id as user_id,
				REPLACE(w.phone_1, '+91', '') as phone_1,
				w.email_1,
				w.address,
				w.status,
				w.created_at,
				w.updated_at,
				u.name as contact_person_name
				
			FROM warehouse w
			LEFT JOIN users u ON w.contact_person_id = u.id
			WHERE w.id = ?
		`;

		const warehouse = await do_ma_query(query, [id]);

		if (warehouse.length === 0) {
			return res.status(404).json({
				success: false,
				data: null,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Warehouse not found.",
			});
		}

		res.status(200).json({
			success: true,
			data: warehouse[0],
			timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
			message: "Warehouse retrieved successfully.",
		});
	} catch (err) {
		console.error(`Route: ${req.originalUrl}, Error:`, err);
		res.status(500).json({
			success: false,
			data: null,
			timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
			message: "Internal server error.",
		});
	}
};




  
 export const createWh = async (req, res) => {
	try {
		const wh_label = "warehouse title";
		const user_id_label = "user ID";
		const phone_no_label = "phone number";
		const email_id_label = "email ID";
		const address_label = "address";

		const wh_schema = Joi.object({
			wh_title: Joi.string()
				.min(3)
				.max(127)
				.pattern(new RegExp("^(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9-_.]+(?<![-_.])$"))
				.required()
				.label(wh_label)
				.messages({
					"string.pattern.base": `${wh_label} can include letters (a-z), numbers (0-9), and these special characters (-_.). You cannot start or end a ${wh_label} with a special character or use multiple special characters in a row.`,
				}),
			user_id: Joi.number().integer().min(1).required().label(user_id_label),
			phone_1: Joi.string()
				.pattern(new RegExp("^[0-9]{10}$"))
				.required()
				.label(phone_no_label)
				.messages({
					"string.pattern.base": `${phone_no_label} must have exactly 10 digits and contain only numbers.`,
				}),
			email_1: Joi.string().max(127).email().required().label(email_id_label),
			address: Joi.string().min(10).max(255).required().label(address_label),
		});

		const { error, value } = wh_schema.validate(req.body, { abortEarly: false });

		if (error) {
			return res.status(400).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: error.details[0].message,
			});
		}

		let phone_no = "+91" + value.phone_1;

		let verify_unique = await do_ma_query(
			"SELECT COUNT(*) AS count FROM warehouse WHERE title = ? OR phone_1 = ? OR email_1 = ?;",
			[value.wh_title, phone_no, value.email_1]
		);

		if (verify_unique[0].count > 0) {
			return res.status(422).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Resource already taken.",
			});
		}

		// also verify user_id existence from the DB

		let wh_insert_res = await do_ma_query(
			`INSERT INTO warehouse SET title = ?, contact_person_id = ?, phone_1 = ?, email_1 = ?, address = ?, status = "active", created_at = NOW(), updated_at = NOW();`,
			[value.wh_title, value.user_id, phone_no, value.email_1, value.address]
		);

		if (wh_insert_res.affectedRows === 1) {
			res.status(201).json({
				success: true,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Warehouse created successfully.",
			});
		} else {
			res.status(304).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Warehouse creation failed.",
			});
		}
	} catch (err) {
		console.error(`Route: ${req.originalUrl}, Error:`, err);
		res.status(500).json({
			success: false,
			timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
			message: "Internal server error.",
		});
	}
};




// Delete warehouse
export const deleteWarehouse = async (req, res) => {
	try {
		const { id } = req.params;

		const id_schema = Joi.object({
			id: Joi.number().integer().min(1).required().label("warehouse ID"),
		});

		const { error } = id_schema.validate({ id }, { abortEarly: false });

		if (error) {
			return res.status(400).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: error.details[0].message,
			});
		}

		// Check if warehouse exists
		let wh_check = await do_ma_query("SELECT COUNT(*) AS count FROM warehouse WHERE id = ?;", [id]);
		
		if (wh_check[0].count === 0) {
			return res.status(404).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Warehouse not found.",
			});
		}

		// Check if warehouse has products
		let product_check = await do_ma_query("SELECT COUNT(*) AS count FROM product WHERE warehouse_id = ?;", [id]);
		
		if (product_check[0].count > 0) {
			return res.status(409).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Cannot delete warehouse with existing products. Please remove products first.",
			});
		}

		let wh_delete_res = await do_ma_query("DELETE FROM warehouse WHERE id = ?;", [id]);

		if (wh_delete_res.affectedRows === 1) {
			res.status(200).json({
				success: true,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Warehouse deleted successfully.",
			});
		} else {
			res.status(304).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Warehouse deletion failed.",
			});
		}
	} catch (err) {
		console.error(`Route: ${req.originalUrl}, Error:`, err);
		res.status(500).json({
			success: false,
			timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
			message: "Internal server error.",
		});
	}
};




// Update warehouse
export const updateWarehouse = async (req, res) => {
	try {
		const { id } = req.params;

		const wh_label = "warehouse title";
		const user_id_label = "user ID";
		const phone_no_label = "phone number";
		const email_id_label = "email ID";
		const address_label = "address";

		const wh_schema = Joi.object({
			wh_title: Joi.string()
				.min(3)
				.max(127)
				.pattern(new RegExp("^(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9-_.]+(?<![-_.])$"))
				.required()
				.label(wh_label)
				.messages({
					"string.pattern.base": `${wh_label} can include letters (a-z), numbers (0-9), and these special characters (-_.). You cannot start or end a ${wh_label} with a special character or use multiple special characters in a row.`,
				}),
			user_id: Joi.number().integer().min(1).required().label(user_id_label),
			phone_1: Joi.string()
				.pattern(new RegExp("^[0-9]{10}$"))
				.required()
				.label(phone_no_label)
				.messages({
					"string.pattern.base": `${phone_no_label} must have exactly 10 digits and contain only numbers.`,
				}),
			email_1: Joi.string().max(127).email().required().label(email_id_label),
			address: Joi.string().min(10).max(255).required().label(address_label),
		});

		const { error, value } = wh_schema.validate(req.body, { abortEarly: false });

		if (error) {
			return res.status(400).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: error.details[0].message,
			});
		}

		// Check if warehouse exists
		let wh_check = await do_ma_query("SELECT COUNT(*) AS count FROM warehouse WHERE id = ?;", [id]);
		
		if (wh_check[0].count === 0) {
			return res.status(404).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Warehouse not found.",
			});
		}

		let phone_no = "+91" + value.phone_1;

		// Check for duplicates excluding current warehouse
		let verify_unique = await do_ma_query(
			"SELECT COUNT(*) AS count FROM warehouse WHERE (title = ? OR phone_1 = ? OR email_1 = ?) AND id != ?;",
			[value.wh_title, phone_no, value.email_1, id]
		);

		if (verify_unique[0].count > 0) {
			return res.status(422).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Warehouse with this title, phone, or email already exists.",
			});
		}

		// Verify user exists
		let user_check = await do_ma_query("SELECT COUNT(*) AS count FROM users WHERE id = ?;", [value.user_id]);
		
		if (user_check[0].count === 0) {
			return res.status(404).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Contact person not found.",
			});
		}

		let wh_update_res = await do_ma_query(
			`UPDATE warehouse SET title = ?, contact_person_id = ?, phone_1 = ?, email_1 = ?, address = ?, updated_at = NOW() WHERE id = ?;`,
			[value.wh_title, value.user_id, phone_no, value.email_1, value.address, id]
		);

		if (wh_update_res.affectedRows === 1) {
			res.status(200).json({
				success: true,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "Warehouse updated successfully.",
			});
		} else {
			res.status(304).json({
				success: false,
				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
				message: "No changes made to warehouse.",
			});
		}
	} catch (err) {
		console.error(`Route: ${req.originalUrl}, Error:`, err);
		res.status(500).json({
			success: false,
			timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
			message: "Internal server error.",
		});
	}
};


// export const get = async (req, res) => {
//   try {
//     const { search, storeName, country, sortBy } = req.query;

//     let query = `
//       SELECT 
//         w.*,
//         u.name AS user_name,
//       FROM warehouses w
//       LEFT JOIN users u ON w.user_id = u.id
//       WHERE 1=1
//     `;
//     const params = [];

//     if (search) {
//       query += ` AND (w.title LIKE ? OR u.name LIKE ? OR w.phone_1 LIKE ?)`;
//       params.push(`%${search}%`, `%${search}%`, `%${search}%`);
//     }

//     if (storeName) {
//       query += ` AND w.title = ?`;
//       params.push(storeName);
//     }

//     if (country) {
//       query += ` AND w.country = ?`;
//       params.push(country);
//     }

//     if (sortBy === 'date_asc') query += ` ORDER BY w.created_at ASC`;
//     else if (sortBy === 'date_desc') query += ` ORDER BY w.created_at DESC`;
//     else query += ` ORDER BY w.id DESC`;

//     const [warehouses] = await pool.execute(query, params);

//     res.json({ success: true, data: warehouses });
//   } catch (error) {
//     console.error('Error fetching warehouses:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };



// export const getById = async (req, res) => {
//   try {
//     const [warehouses] = await pool.execute(
//       `SELECT 
//         w.*,
//         u.name AS user_name,
//       FROM warehouses w
//       LEFT JOIN users u ON w.user_id = u.id
//       WHERE w.id = ?`,
//       [req.params.id]
//     );

//     if (warehouses.length === 0)
//       return res.status(404).json({ success: false, message: 'Warehouse not found' });

//     res.json({ success: true, data: warehouses[0] });
//   } catch (error) {
//     console.error('Error fetching warehouse:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };



// export const post = async (req, res) => {
//   try {
//     const { title, user_id, phone_1, email_1, address, status } = req.body;

//     // Validation
//     if (!title) return res.status(400).json({ success: false, message: 'Title is required' });
//     if (!user_id) return res.status(400).json({ success: false, message: 'User ID is required' });
//     if (!phone_1) return res.status(400).json({ success: false, message: 'Phone is required' });
//     if (!email_1) return res.status(400).json({ success: false, message: 'Email is required' });
//     if (!address) return res.status(400).json({ success: false, message: 'Address is required' });

//     const allowedStatus = ['active', 'inactive'];
//     const warehouseStatus = allowedStatus.includes(status) ? status : 'active';

//     const [result] = await pool.execute(
//       `INSERT INTO warehouses (title, user_id, phone_1, email_1, address, status)
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [title, user_id, phone_1, email_1, address, warehouseStatus]
//     );

//     res.status(201).json({
//       success: true,
//       message: 'Warehouse created successfully',
//       data: { id: result.insertId }
//     });
//   } catch (error) {
//     console.error('Error creating warehouse:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };



// export const put = async (req, res) => {
//   try {
//     const { title, user_id, phone_1, email_1, address, status } = req.body;

//     const allowedStatus = ['active', 'inactive'];
//     const warehouseStatus = allowedStatus.includes(status) ? status : 'active';

//     const [result] = await pool.execute(
//       `UPDATE warehouses SET
//         title = ?, user_id = ?, phone_1 = ?, email_1 = ?, address = ?, status = ?
//        WHERE id = ?`,
//       [title, user_id, phone_1, email_1, address, warehouseStatus, req.params.id]
//     );

//     if (result.affectedRows === 0)
//       return res.status(404).json({ success: false, message: 'Warehouse not found' });

//     res.json({ success: true, message: 'Warehouse updated successfully' });
//   } catch (error) {
//     console.error('Error updating warehouse:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };



// export const deleteById = async (req, res) => {
//   try {
//     const [result] = await pool.execute('DELETE FROM warehouses WHERE id = ?', [req.params.id]);

//     if (result.affectedRows === 0)
//       return res.status(404).json({ success: false, message: 'Warehouse not found' });

//     res.json({ success: true, message: 'Warehouse deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting warehouse:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };






// // Get unique countries (for filter dropdown)
// router.get('/warehouses/filters/countries', authMiddleware, async (req, res) => {
//   try {
//     const [countries] = await db.query(
//       'SELECT DISTINCT country FROM warehouses WHERE country IS NOT NULL ORDER BY country'
//     );
    
//     res.json({
//       success: true,
//       data: countries.map(c => c.country)
//     });
//   } catch (error) {
//     console.error('Error fetching countries:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // Get unique store names (for filter dropdown)
// router.get('/warehouses/filters/stores', authMiddleware, async (req, res) => {
//   try {
//     const [stores] = await db.query(
//       'SELECT DISTINCT name FROM warehouses ORDER BY name'
//     );
    
//     res.json({
//       success: true,
//       data: stores.map(s => s.name)
//     });
//   } catch (error) {
//     console.error('Error fetching stores:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });








// // Create warehouse
// export const createWh = async (req, res) => {
// 	try {
// 		const wh_label = "warehouse title";
// 		const user_id_label = "user ID";
// 		const phone_no_label = "phone number";
// 		const email_id_label = "email ID";
// 		const address_label = "address";

// 		const wh_schema = Joi.object({
// 			wh_title: Joi.string()
// 				.min(3)
// 				.max(127)
// 				.pattern(new RegExp("^(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9-_.]+(?<![-_.])$"))
// 				.required()
// 				.label(wh_label)
// 				.messages({
// 					"string.pattern.base": `${wh_label} can include letters (a-z), numbers (0-9), and these special characters (-_.). You cannot start or end a ${wh_label} with a special character or use multiple special characters in a row.`,
// 				}),
// 			user_id: Joi.number().integer().min(1).required().label(user_id_label),
// 			phone_1: Joi.string()
// 				.pattern(new RegExp("^[0-9]{10}$"))
// 				.required()
// 				.label(phone_no_label)
// 				.messages({
// 					"string.pattern.base": `${phone_no_label} must have exactly 10 digits and contain only numbers.`,
// 				}),
// 			email_1: Joi.string().max(127).email().required().label(email_id_label),
// 			address: Joi.string().min(10).max(255).required().label(address_label),
// 		});

// 		const { error, value } = wh_schema.validate(req.body, { abortEarly: false });

// 		if (error) {
// 			return res.status(400).json({
// 				success: false,
// 				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
// 				message: error.details[0].message,
// 			});
// 		}

// 		let phone_no = "+91" + value.phone_1;

// 		let verify_unique = await do_ma_query(
// 			"SELECT COUNT(*) AS count FROM warehouse WHERE title = ? OR phone_1 = ? OR email_1 = ?;",
// 			[value.wh_title, phone_no, value.email_1]
// 		);

// 		if (verify_unique[0].count > 0) {
// 			return res.status(422).json({
// 				success: false,
// 				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
// 				message: "Warehouse with this title, phone, or email already exists.",
// 			});
// 		}

// 		// Verify user exists
// 		let user_check = await do_ma_query("SELECT COUNT(*) AS count FROM users WHERE id = ?;", [value.user_id]);
		
// 		if (user_check[0].count === 0) {
// 			return res.status(404).json({
// 				success: false,
// 				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
// 				message: "Contact person not found.",
// 			});
// 		}

// 		let wh_insert_res = await do_ma_query(
// 			`INSERT INTO warehouse SET title = ?, contact_person_id = ?, phone_1 = ?, email_1 = ?, address = ?, status = "active", created_at = NOW(), updated_at = NOW();`,
// 			[value.wh_title, value.user_id, phone_no, value.email_1, value.address]
// 		);

// 		if (wh_insert_res.affectedRows === 1) {
// 			res.status(201).json({
// 				success: true,
// 				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
// 				message: "Warehouse created successfully.",
// 			});
// 		} else {
// 			res.status(304).json({
// 				success: false,
// 				timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
// 				message: "Warehouse creation failed.",
// 			});
// 		}
// 	} catch (err) {
// 		console.error(`Route: ${req.originalUrl}, Error:`, err);
// 		res.status(500).json({
// 			success: false,
// 			timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
// 			message: "Internal server error.",
// 		});
// 	}
// };
