
// // ============================================
// // 2. PRODUCT ROUTES
// // ============================================

// import pool from '../db.js'; 
// import bwipjs from "bwip-js";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const outputDir = path.join(__dirname, "../barcodes");
// if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// export function generateUniqueSKU(productName) {
//     const prefix = productName.substring(0, 3).toUpperCase();
//     const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase(); 
//     return `${prefix}-${randomStr}`;
// }

// export function generateBarcode(sku) {
//     return new Promise((resolve, reject) => {
//         bwipjs.toBuffer({
//             bcid: "code128",
//             text: sku,
//             scale: 3,
//             height: 10,
//             includetext: true,
//             backgroundcolor: "FFFFFF",
//             textxalign: "center"
//         }, (err, png) => {
//             if (err) return reject(err);

//             // Save file in local directory
//             const filename = `${sku}.png`;
//             const filePath = path.join(outputDir, filename);

//             fs.writeFileSync(filePath, png);


//             const relativePath = `/barcodes/${filename}`;

//             resolve(relativePath);
//         });
//     });
// }







// // GET all products with filters, pagination, and sorting
// export const getProduct = async (req, res) => {
//   try {
//     const { 
//       page = 1, 
//       limit = 10, 
//       search = '', 
//       status = '',
//       sortBy = 'created_at',
//       sortOrder = 'DESC'
//     } = req.query;

//     const offset = (page - 1) * limit;

//     // Build WHERE clause dynamically
//     let whereConditions = [];
//     let queryParams = [];

//     if (search) {
//       whereConditions.push('(p.title LIKE ? OR p.sku LIKE ? OR p.barcode LIKE ?)');
//       queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
//     }

//     if (status) {
//       whereConditions.push('p.status = ?');
//       queryParams.push(status);
//     }

//     const whereClause = whereConditions.length > 0 
//       ? 'WHERE ' + whereConditions.join(' AND ') 
//       : '';

//     // Main query
//     const query = `
//       SELECT p.*
//       FROM product p
//       ${whereClause}
//       ORDER BY p.${sortBy} ${sortOrder}
//       LIMIT ? OFFSET ?
//     `;

//     queryParams.push(parseInt(limit), offset);

//     const [products] = await pool.execute(query, queryParams);

//     // Count total for pagination
//     const countQuery = `
//       SELECT COUNT(*) as total
//       FROM product p
//       ${whereClause}
//     `;

//     const [countResult] = await pool.execute(
//       countQuery, 
//       queryParams.slice(0, -2)
//     );

//     res.json({
//       success: true,
//       data: products,
//       pagination: {
//         total: countResult[0].total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         totalPages: Math.ceil(countResult[0].total / limit)
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error fetching products',
//       error: error.message 
//     });
//   }
// };

// // GET single product by ID
// export const getProductById =  async (req, res) => {
//   try {
//     const { id } = req.params;
//     const query = 'SELECT * FROM product WHERE id = ?';

//     const [products] = await pool.execute(query, [id]);

//     if (products.length === 0) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Product not found' 
//       });
//     }

//     // Get product images
//     const [images] = await pool.execute(
//       'SELECT * FROM product_images WHERE product_id = ?',
//       [id]
//     );

//     res.json({
//       success: true,
//       data: {
//         ...products[0],
//         images
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error fetching product',
//       error: error.message 
//     });
//   }
// };

// // POST create new product
// // export const createProduct = async (req, res) => {
// //   const connection = await pool.getConnection();

// //   try {
// //     await connection.beginTransaction();

// //     const {
// //       title,
// //       articleProfileTitle, 
// //       warehouseName,     
// //       location,
// //       status = 'new',
// //       count,
// //       sku,
// //       barcode,
// //       description,
// //       last_updated_by,
// //     } = req.body;

  
// //     const [articleProfiles] = await connection.execute(
// //       'SELECT id FROM article_profile WHERE title = ? LIMIT 1',
// //       [articleProfileTitle]
// //     );

// //     if (articleProfiles.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Article profile not found'
// //       });
// //     }
// //     const article_profile_id = articleProfiles[0].id;

// //     const [warehouses] = await connection.execute(
// //       'SELECT id FROM warehouse WHERE title = ? LIMIT 1',
// //       [warehouseName]
// //     );

// //     if (warehouses.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Warehouse not found'
// //       });
// //     }
// //     const warehouse_id = warehouses[0].id;

   
// //     const [productResult] = await connection.execute(
// //       `INSERT INTO product
// //         (title, article_profile_id, warehouse_id, location, status, count, sku, barcode, 
// //          description, created_at, updated_at, last_updated_by)
// //        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)`,
// //       [title, article_profile_id, warehouse_id, location, status, count, sku, barcode, description, last_updated_by]
// //     );

// //     const productId = productResult.insertId;

// //     await connection.commit();

// //     res.status(201).json({
// //       success: true,
// //       message: 'Product created successfully',
// //       data: { id: productId }
// //     });

// //   } catch (error) {
// //     await connection.rollback();
// //     console.error('Error creating product:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Error creating product',
// //       error: error.message
// //     });
// //   } finally {
// //     connection.release();
// //   }
// // };


// export const createProduct = async (req, res) => {
//   const connection = await pool.getConnection();

//   try {
//     await connection.beginTransaction();

//     const {
//       title,
//       articleProfileTitle,
//       warehouseName,
//       location,
//       status = 'new',
//       count,
//       description,
//       last_updated_by,
//     } = req.body;


//     const sku = generateUniqueSKU(title);
//     console.log("Generated SKU:", sku);

//     const barcodeFilePath = await generateBarcode(sku);
//     console.log("Generated relative barcode path:", barcodeFilePath);

    
//     const [articleProfiles] = await connection.execute(
//       'SELECT id FROM article_profile WHERE title = ? LIMIT 1',
//       [articleProfileTitle]
//     );

//     if (articleProfiles.length === 0) {
//       return res.status(404).json({ success: false, message: 'Article profile not found' });
//     }
//     const article_profile_id = articleProfiles[0].id;

    
//     const [warehouses] = await connection.execute(
//       'SELECT id FROM warehouse WHERE title = ? LIMIT 1',
//       [warehouseName]
//     );

//     if (warehouses.length === 0) {
//       return res.status(404).json({ success: false, message: 'Warehouse not found' });
//     }
//     const warehouse_id = warehouses[0].id;

//     console.log("Saving to DB barcode:", barcodeFilePath);
//     console.log("Incoming body:", req.body);


    
//     const [productResult] = await connection.execute(
//       `INSERT INTO product
//         (title, article_profile_id, warehouse_id, location, status, count, sku, barcode,
//          description, created_at, updated_at, last_updated_by)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)`,
//       [
//         title,
//         article_profile_id,
//         warehouse_id,
//         location,
//         status,
//         count,
//         sku,
//         barcodeFilePath,
//         description,
//         last_updated_by
//       ]
//     );

//     await connection.commit();

//     res.status(201).json({
//       success: true,
//       message: 'Product created successfully',
//       data: {
//         id: productResult.insertId,
//         sku,
//         barcode: barcodeFilePath
//       }
//     });

//   } catch (error) {
//     await connection.rollback();
//     console.error('Error creating product:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating product',
//       error: error.message
//     });
//   } finally {
//     connection.release();
//   }
// };


// // PUT update product
// export const updateProductById = async (req, res) => {
//   const connection = await pool.getConnection();
  
//   try {
//     await connection.beginTransaction();

//     const { id } = req.params;
//     const {
//       title,
//       warehouse_id,
//       location,
//       status,
//       count,
//       sku,
//       barcode,
//       description,
//       last_updated_by,
//     } = req.body;

//     const [product] = await connection.execute(
//       'SELECT article_profile_id FROM product WHERE id = ?',
//       [id]
//     );

//     if (product.length === 0) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Product not found' 
//       });
//     }

//     await connection.execute(
//       `UPDATE product SET
//         title = ?, warehouse_id = ?, location = ?, status = ?,
//         count = ?, sku = ?, barcode = ?, description = ?,
//         updated_at = NOW(), last_updated_by = ?
//       WHERE id = ?`,
//       [title, warehouse_id, location, status, count, sku, barcode, 
//        description, last_updated_by, id]
//     );

//     // Add new images
//     if (req.files && req.files.length > 0) {
//       const imageValues = req.files.map(file => [id, file.filename, file.path]);
//       await connection.query(
//         'INSERT INTO product_images (product_id, filename, filepath) VALUES ?',
//         [imageValues]
//       );
//     }

//     await connection.commit();

//     res.json({
//       success: true,
//       message: 'Product updated successfully'
//     });

//   } catch (error) {
//     await connection.rollback();
//     console.error('Error updating product:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error updating product',
//       error: error.message 
//     });
//   } finally {
//     connection.release();
//   }
// };

// // DELETE product
// export const deleteProduct =  async (req, res) => {
//   try {
//     const { id } = req.params;

//     await pool.execute('DELETE FROM product_images WHERE product_id = ?', [id]);
//     const [result] = await pool.execute('DELETE FROM product WHERE id = ?', [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Product not found' 
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Product deleted successfully'
//     });

//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error deleting product',
//       error: error.message 
//     });
//   }
// };


// ============================================
// 4. UTILITY ROUTES
// ============================================

// Generate SKU

// '/api/products/generate/sku', 
    
// export const getSku = async (req, res) => {
//   try {
//     const sku = 'SKU-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
//     res.json({ success: true, sku });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Generate Barcode

// '/api/products/generate/barcode', 
    
// export const getBarcode = async (req, res) => {
//   try {
//     const barcode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
//     res.json({ success: true, barcode });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };









import pool from '../db.js';
import Joi from "joi";
import { DateTime } from "luxon";
import bwipjs from "bwip-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { do_ma_query } from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, "../barcodes");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);


// Utility Functions
// export function generateUniqueSKU(productName) {
//   const prefix = productName.substring(0, 3).toUpperCase();
//   const timestamp = Date.now().toString(36).toUpperCase();
//   const randomStr = Math.random().toString(36).substring(2, 4).toUpperCase();
//   return `${prefix}-${timestamp}-${randomStr}`;
// }


function luhnChecksum(numStr) {
  let sum = 0;
  let doubleDigit = true;
  for (let i = numStr.length - 1; i >= 0; i--) {
    let n = parseInt(numStr[i], 10);
    if (doubleDigit) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    doubleDigit = !doubleDigit;
  }
  return (10 - (sum % 10)) % 10;
}


export function generateBarcodeNumber(productName) {
  
  const prefix = productName.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X');
  const timestamp36 = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 4).toUpperCase();

  const numericStr = (
    prefix
      .split('')
      .map(c => ('0' + (c.charCodeAt(0) - 64)).slice(-2))
      .join('') +
    parseInt(timestamp36, 36).toString().slice(-6) +
    Math.floor(Math.random() * 90 + 10)
  ).slice(-12);

  const checkDigit = luhnChecksum(numericStr);

  return numericStr + checkDigit;
}


export function generateBarcodeImage(barcodeNumber) {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: 'code128',   
        text: barcodeNumber,
        scale: 3,            
        height: 20,          
        includetext: true,   
        textxalign: 'center',
        backgroundcolor: 'FFFFFF',
      },
      (err, png) => {
        if (err) return reject(err);

        const filename = `${barcodeNumber}.png`;
        const filePath = path.join(outputDir, filename);
        fs.writeFileSync(filePath, png);

        resolve(`/barcodes/${filename}`); 
      }
    );
  });
}


// GET
export const getProduct = async (req, res) => {
  try {
    const {warehouseFilter} = req;
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
      warehouse_id = "",
      article_profile_id = "",
      sortBy = "created_at",
      sortOrder = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;

  
    let whereConditions = [];
    let queryParams = [];

    	if (warehouseFilter) {
			whereConditions.push("p.warehouse_id = ?");
			queryParams.push(warehouseFilter);
		} else if (warehouse_id) {
			whereConditions.push("p.warehouse_id = ?");
			queryParams.push(warehouse_id);
		}

    if (search) {
      whereConditions.push("(p.title LIKE ? OR p.barcode LIKE ?)");
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      whereConditions.push("p.status = ?");
      queryParams.push(status);
    }

    if (warehouse_id) {
      whereConditions.push("p.warehouse_id = ?");
      queryParams.push(warehouse_id);
    }

    if (article_profile_id) {
      whereConditions.push("p.article_profile_id = ?");
      queryParams.push(article_profile_id);
    }

    const whereClause = whereConditions.length > 0 ? "WHERE " + whereConditions.join(" AND ") : "";

    // Validate sortBy to prevent SQL injection
    const allowedSortFields = ["created_at", "updated_at", "title", "count", "status"];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : "created_at";
    const validSortOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

    // Main query with joins
    const query = `
      SELECT 
        p.*,
        ap.title as article_profile_name,
        w.title as warehouse_name,
        creator.name as created_by_name,
       
        updater.name as updated_by_name
      FROM product p
      LEFT JOIN article_profile ap ON p.article_profile_id = ap.id
      LEFT JOIN warehouse w ON p.warehouse_id = w.id
      LEFT JOIN users creator ON p.last_updated_by = creator.id
      LEFT JOIN users updater ON p.last_updated_by = updater.id
      ${whereClause}
      ORDER BY p.${validSortBy} ${validSortOrder}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(parseInt(limit), parseInt(offset));

    const products = await do_ma_query(query, queryParams);

    // Count total for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM product p
      ${whereClause}
    `;

    const countResult = await do_ma_query(countQuery, queryParams.slice(0, -2));

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(countResult[0].total / limit),
      },
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};

// GET single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const id_schema = Joi.object({
      id: Joi.number().integer().min(1).required().label("product ID"),
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
  p.*,
  ap.title AS article_profile_name,
  ap.id AS article_profile_id,
  w.title AS warehouse_name,
  w.id AS warehouse_id,
  creator.name AS created_by_name
FROM product p
LEFT JOIN article_profile ap ON p.article_profile_id = ap.id
LEFT JOIN warehouse w ON p.warehouse_id = w.id
LEFT JOIN users creator ON p.last_updated_by = creator.id
WHERE p.id = ?

    `;

    const products = await do_ma_query(query, [id]);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }

    res.status(200).json({
      success: true,
      data: products[0],
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};


export const getProductByScan = async (req, res) => {
  try {
    const { code } = req.params; 

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Scan code is required",
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }

    // Search by both SKU and Barcode
    const query = `
      SELECT 
        p.*,
        ap.title as article_profile_name,
        w.title as warehouse_name,
        creator.name as created_by_name
      FROM product p
      LEFT JOIN article_profile ap ON p.article_profile_id = ap.id
      LEFT JOIN warehouse w ON p.warehouse_id = w.id
      LEFT JOIN users creator ON p.last_updated_by = creator.id
      WHERE p.barcode = ?
      LIMIT 1
    `;

    const products = await do_ma_query(query, [code, code]);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found with this Barcode",
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }

    res.status(200).json({
      success: true,
      data: products[0],
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching product by scan:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};


export const createProduct = async (req, res) => {
  try {
    const product_schema = Joi.object({
      title: 
      Joi.string().min(3).max(127).required().label("product title"),
      article_profile_id: 
      Joi.number().integer().min(1).required().label("article profile ID"),
      warehouse_id: 
      Joi.number().integer().min(1).required().label("warehouse ID"),
      location: 
      Joi.string().max(255).allow("", null).label("location"),
      status: 
      Joi.string().valid("new", "used", "repaired", "broken", "installed").default("new").label("status"),
      count: 
      Joi.number().integer().min(0).required().label("count"),
      description: 
      Joi.string().max(255).allow("", null).label("description"),
      last_updated_by: 
      Joi.number().integer().min(1).required().label("user ID"),
    });

    const { error, value } = product_schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: error.details[0].message,
      });
    }

    // Verify article profile exists
    const article_check = await do_ma_query("SELECT COUNT(*) AS count FROM article_profile WHERE id = ?", [
      value.article_profile_id,
    ]);

    if (article_check[0].count === 0) {
      return res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Article profile not found",
      });
    }

    // Verify warehouse exists
    const warehouse_check = await do_ma_query("SELECT COUNT(*) AS count FROM warehouse WHERE id = ?", [
      value.warehouse_id,
    ]);

    if (warehouse_check[0].count === 0) {
      return res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Warehouse not found",
      });
    }

    // Verify user exists
    const user_check = await do_ma_query("SELECT COUNT(*) AS count FROM users WHERE id = ?", [
      value.last_updated_by,
    ]);

    if (user_check[0].count === 0) {
      return res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "User not found",
      });
    }

    // Generate SKU and Barcode
    // const sku = generateUniqueSKU(value.title);
    const barcodeNumber = generateBarcodeNumber(value.title);
    let barcodeImagePath;

    try {
      barcodeImagePath = await generateBarcodeImage(barcodeNumber);
    } catch (barcodeError) {
      console.error("Error generating barcode:", barcodeError);
      return res.status(500).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Error generating barcode",
      });
    }

  
    const product_insert_res = await do_ma_query(
      `INSERT INTO product
        (title, article_profile_id, warehouse_id, location, status, count,  barcode, barcode_image,
         description, created_at, updated_at, last_updated_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)`,
      [
        value.title,
        value.article_profile_id,
        value.warehouse_id,
        value.location || null,
        value.status,
        value.count,
        
        barcodeNumber,
        barcodeImagePath,
        value.description || null,
        value.last_updated_by,
      ]
    );

    if (product_insert_res.affectedRows === 1) {
      res.status(201).json({
        success: true,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Product created successfully",
        data: {
          id: product_insert_res.insertId,
        
          barcode: barcodeNumber,
          barcode_image: barcodeImagePath,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Product creation failed",
      });
    }
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({
      success: false,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      message: "Internal server error",
    });
  }
};



export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product_schema = Joi.object({
      title: Joi.string().min(3).max(127).required().label("product title"),
      article_profile_id: Joi.number().integer().min(1).required().label("article profile ID"),
      warehouse_id: Joi.number().integer().min(1).required().label("warehouse ID"),
      location: Joi.string().max(255).allow("", null).label("location"),
      status: Joi.string()
        .valid("new", "used", "repaired", "broken", "installed")
        .required()
        .label("status"),
      count: Joi.number().integer().min(0).required().label("count"),
      description: Joi.string().max(255).allow("", null).label("description"),
      last_updated_by: Joi.number().integer().min(1).required().label("user ID"),
    });

    const { error, value } = product_schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: error.details[0].message,
      });
    }

    // Check if product exists
    const product_check = await do_ma_query("SELECT * FROM product WHERE id = ?", [id]);

    if (product_check.length === 0) {
      return res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Product not found",
      });
    }

    // Verify article profile exists
    const article_check = await do_ma_query("SELECT COUNT(*) AS count FROM article_profile WHERE id = ?", [
      value.article_profile_id,
    ]);

    if (article_check[0].count === 0) {
      return res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Article profile not found",
      });
    }

    // Verify warehouse exists
    const warehouse_check = await do_ma_query("SELECT COUNT(*) AS count FROM warehouse WHERE id = ?", [
      value.warehouse_id,
    ]);

    if (warehouse_check[0].count === 0) {
      return res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Warehouse not found",
      });
    }

    // Update product (SKU and Barcode remain unchanged)
    const product_update_res = await do_ma_query(
      `UPDATE product SET
        title = ?, article_profile_id = ?, warehouse_id = ?, location = ?, 
        status = ?, count = ?, description = ?, updated_at = NOW(), last_updated_by = ?
      WHERE id = ?`,
      [
        value.title,
        value.article_profile_id,
        value.warehouse_id,
        value.location || null,
        value.status,
        value.count,
        value.description || null,
        value.last_updated_by,
        id,
      ]
    );

    if (product_update_res.affectedRows === 1) {
      res.status(200).json({
        success: true,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Product updated successfully",
      });
    } else {
      res.status(304).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "No changes made to product",
      });
    }
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      success: false,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      message: "Internal server error",
    });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const id_schema = Joi.object({
      id: Joi.number().integer().min(1).required().label("product ID"),
    });

    const { error } = id_schema.validate({ id }, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: error.details[0].message,
      });
    }

    // Check if product exists and get barcode path
    const product_check = await do_ma_query("SELECT barcode FROM product WHERE id = ?", [id]);

    if (product_check.length === 0) {
      return res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Product not found",
      });
    }

    // Delete barcode file if exists
    const barcodePath = product_check[0].barcode;
    if (barcodePath) {
      const fullPath = path.join(__dirname, "..", barcodePath);
      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
        } catch (fileError) {
          console.error("Error deleting barcode file:", fileError);
        }
      }
    }

    // Delete product
    const product_delete_res = await do_ma_query("DELETE FROM product WHERE id = ?", [id]);

    if (product_delete_res.affectedRows === 1) {
      res.status(200).json({
        success: true,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Product deleted successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Product deletion failed",
      });
    }
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      success: false,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      message: "Internal server error",
    });
  }
};

// GET article profiles for dropdown
export const getArticleProfiles = async (req, res) => {
  try {
    const query = "SELECT id, title as name FROM article_profile ORDER BY title ASC";
    const article_profiles = await do_ma_query(query);

    res.status(200).json({
      success: true,
      data: article_profiles,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching article profiles:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching article profiles",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};

// GET warehouses for dropdown
export const getWarehousesForDropdown = async (req, res) => {
  try {
    const query = "SELECT id, title as name FROM warehouse WHERE status = 'active' ORDER BY title ASC";
    const warehouses = await do_ma_query(query);

    res.status(200).json({
      success: true,
      data: warehouses,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching warehouses",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};




//LOW STOCKS and OUT OF STOCKS


export const getLowStockProducts = async (req, res) => {
  try {
    const { warehouseFilter } = req;
    const {
      page = 1,
      limit = 10,
      search = "",
      warehouse_id = "",
      article_profile_id = "",
      sortBy = "count",
      sortOrder = "ASC",
      threshold = 10,
    } = req.query;

    const offset = (page - 1) * limit;

    let whereConditions = ["p.count > 0 AND p.count <= ?"];
    let queryParams = [threshold];

    // Apply warehouse filter for Admin users
    if (warehouseFilter) {
      whereConditions.push("p.warehouse_id = ?");
      queryParams.push(warehouseFilter);
    } else if (warehouse_id) {
      whereConditions.push("p.warehouse_id = ?");
      queryParams.push(warehouse_id);
    }

    if (search) {
      whereConditions.push("(p.title LIKE ? OR p.barcode LIKE ?)");
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (article_profile_id) {
      whereConditions.push("p.article_profile_id = ?");
      queryParams.push(article_profile_id);
    }

    const whereClause = "WHERE " + whereConditions.join(" AND ");

    const allowedSortFields = ["count", "created_at", "title"];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : "count";
    const validSortOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const query = `
      SELECT 
        p.*,
        ap.title as article_profile_name,
        w.title as warehouse_name,
        w.location as store_location
      FROM product p
      LEFT JOIN article_profile ap ON p.article_profile_id = ap.id
      LEFT JOIN warehouse w ON p.warehouse_id = w.id
      ${whereClause}
      ORDER BY p.${validSortBy} ${validSortOrder}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(parseInt(limit), parseInt(offset));

    const products = await do_ma_query(query, queryParams);

    const countQuery = `
      SELECT COUNT(*) as total
      FROM product p
      ${whereClause}
    `;

    const countResult = await do_ma_query(countQuery, queryParams.slice(0, -2));

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(countResult[0].total / limit),
      },
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching low stock products",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};

// GET out of stock products
export const getOutOfStockProducts = async (req, res) => {
  try {
    const { warehouseFilter } = req;
    const {
      page = 1,
      limit = 10,
      search = "",
      warehouse_id = "",
      article_profile_id = "",
      sortBy = "updated_at",
      sortOrder = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;

    let whereConditions = ["p.count = 0"];
    let queryParams = [];

    if (warehouseFilter) {
      whereConditions.push("p.warehouse_id = ?");
      queryParams.push(warehouseFilter);
    } else if (warehouse_id) {
      whereConditions.push("p.warehouse_id = ?");
      queryParams.push(warehouse_id);
    }

    if (search) {
      whereConditions.push("(p.title LIKE ? OR p.barcode LIKE ?)");
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (article_profile_id) {
      whereConditions.push("p.article_profile_id = ?");
      queryParams.push(article_profile_id);
    }

    const whereClause = "WHERE " + whereConditions.join(" AND ");

    const allowedSortFields = ["updated_at", "created_at", "title"];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : "updated_at";
    const validSortOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const query = `
      SELECT 
        p.*,
        ap.title as article_profile_name,
        w.title as warehouse_name,
        w.location as store_location
      FROM product p
      LEFT JOIN article_profile ap ON p.article_profile_id = ap.id
      LEFT JOIN warehouse w ON p.warehouse_id = w.id
      ${whereClause}
      ORDER BY p.${validSortBy} ${validSortOrder}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(parseInt(limit), parseInt(offset));

    const products = await do_ma_query(query, queryParams);

    const countQuery = `
      SELECT COUNT(*) as total
      FROM product p
      ${whereClause}
    `;

    const countResult = await do_ma_query(countQuery, queryParams.slice(0, -2));

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total: countResult[0].total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(countResult[0].total / limit),
      },
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching out of stock products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching out of stock products",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};

// GET low stock statistics
export const getLowStockStats = async (req, res) => {
  try {
    const { warehouseFilter } = req;
    const { threshold = 10 } = req.query;

    let whereClause = "";
    let queryParams = [];

    if (warehouseFilter) {
      whereClause = "WHERE warehouse_id = ?";
      queryParams = [warehouseFilter];
    }

    const statsQuery = `
      SELECT 
        COUNT(CASE WHEN count > 0 AND count <= ? THEN 1 END) as low_stock_count,
        COUNT(CASE WHEN count = 0 THEN 1 END) as out_of_stock_count,
        COUNT(*) as total_products,
        SUM(CASE WHEN count > 0 AND count <= ? THEN count END) as low_stock_qty,
        COUNT(DISTINCT warehouse_id) as affected_warehouses
      FROM product
      ${whereClause}
    `;

    const params = [threshold, threshold, ...queryParams];
    const stats = await do_ma_query(statsQuery, params);

    res.status(200).json({
      success: true,
      data: stats[0],
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  } catch (error) {
    console.error("Error fetching low stock stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
    });
  }
};

// UPDATE low stock alert threshold
export const updateLowStockAlert = async (req, res) => {
  try {
    const { id } = req.params;

    const schema = Joi.object({
      alert_threshold: Joi.number().integer().min(0).required().label("alert threshold"),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: error.details[0].message,
      });
    }

    const updateQuery = `
      UPDATE product 
      SET alert_threshold = ?, updated_at = NOW()
      WHERE id = ?
    `;

    const result = await do_ma_query(updateQuery, [value.alert_threshold, id]);

    if (result.affectedRows === 1) {
      res.status(200).json({
        success: true,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Alert threshold updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error("Error updating alert threshold:", error);
    res.status(500).json({
      success: false,
      timestamp: DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss"),
      message: "Internal server error",
    });
  }
};






























































