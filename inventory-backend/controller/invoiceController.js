// // invoiceController.js
// import PDFDocument from 'pdfkit';
// import { do_ma_query } from '../db.js';
// import { DateTime } from 'luxon';

// export const generateStockFlowInvoice = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch stock flow data with all related information
//     const query = `
// SELECT 
//   sf.*,
//   w1.title as from_warehouse_name,
//   COALESCE(w1.address, 'No address') as from_warehouse_address,
//   COALESCE(w1.contact_person, 'N/A') as from_warehouse_contact,
//   COALESCE(w1.phone_1, 'N/A') as from_warehouse_phone,
//   COALESCE(w1.email_1, 'N/A') as from_warehouse_email,
  
//   w2.title as to_warehouse_name,
//   COALESCE(w2.address, 'No address') as to_warehouse_address,
//   COALESCE(w2.contact_person, 'N/A') as to_warehouse_contact,
//   COALESCE(w2.phone_1, 'N/A') as to_warehouse_phone,
//   COALESCE(w2.email_1, 'N/A') as to_warehouse_email
// FROM stock_flow sf
// LEFT JOIN warehouse w1 ON sf.from_wh = w1.id
// LEFT JOIN warehouse w2 ON sf.to_wh = w2.id
// WHERE sf.id = ?



//     `;

//     const [stockFlow] = await do_ma_query(query, [id]);

//     if (!stockFlow) {
//       return res.status(404).json({
//         success: false,
//         message: 'Stock flow not found',
//       });
//     }

//     // Create PDF document
//     const doc = new PDFDocument({ 
//       size: 'A4',
//       margin: 50,
//       bufferPages: true
//     });

//     // Set response headers
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader(
//       'Content-Disposition',
//       `attachment; filename=stock-flow-invoice-${id}.pdf`
//     );

//     doc.pipe(res);

//     // Colors
//     const primaryColor = '#3b82f6';
//     const secondaryColor = '#64748b';
//     const successColor = '#22c55e';
//     const dangerColor = '#ef4444';

//     // Header with Company Logo/Name
//     doc
//       .fontSize(28)
//       .fillColor(primaryColor)
//       .font('Helvetica-Bold')
//       .text('STOCK TRANSFER INVOICE', 50, 50);

//     doc
//       .fontSize(10)
//       .fillColor(secondaryColor)
//       .font('Helvetica')
//       .text('Transfer Documentation', 50, 85);

//     // Invoice Number and Date - Right aligned
//     doc
//       .fontSize(10)
//       .fillColor(secondaryColor)
//       .text(`Invoice #: SF-${String(id).padStart(6, '0')}`, 400, 50, { align: 'right' });
    
//     doc
//       .text(`Date: ${DateTime.fromJSDate(new Date(stockFlow.created_at)).toFormat('dd MMM yyyy')}`, 400, 65, { align: 'right' });

//     doc
//       .text(`Status: ${stockFlow.status.toUpperCase()}`, 400, 80, { align: 'right' })
//       .fillColor(
//         stockFlow.status === 'approved' ? successColor :
//         stockFlow.status === 'in-transit' ? '#f59e0b' :
//         successColor
//       );

//     // Horizontal line
//     doc
//       .moveTo(50, 110)
//       .lineTo(545, 110)
//       .strokeColor(primaryColor)
//       .lineWidth(2)
//       .stroke();

//     // From/To Section
//     let yPosition = 130;

//     // From Warehouse Box
//     doc
//       .rect(50, yPosition, 240, 100)
//       .fillAndStroke('#f1f5f9', secondaryColor)
//       .lineWidth(0.5);

//     doc
//       .fontSize(12)
//       .fillColor(dangerColor)
//       .font('Helvetica-Bold')
//       .text('FROM WAREHOUSE', 60, yPosition + 10);

//     doc
//       .fontSize(10)
//       .fillColor('#1e293b')
//       .font('Helvetica-Bold')
//       .text(stockFlow.from_warehouse_name || 'N/A', 60, yPosition + 30);

//     doc
//       .fontSize(9)
//       .fillColor(secondaryColor)
//       .font('Helvetica')
//       .text(stockFlow.from_warehouse_address || 'No address', 60, yPosition + 45, { width: 220 });

//     if (stockFlow.from_warehouse_phone) {
//       doc.text(`Phone: ${stockFlow.from_warehouse_phone}`, 60, yPosition + 70);
//     }
//     if (stockFlow.from_warehouse_email) {
//       doc.text(`Email: ${stockFlow.from_warehouse_email}`, 60, yPosition + 85);
//     }

//     // To Warehouse Box
//     doc
//       .rect(305, yPosition, 240, 100)
//       .fillAndStroke('#f1f5f9', secondaryColor)
//       .lineWidth(0.5);

//     doc
//       .fontSize(12)
//       .fillColor(successColor)
//       .font('Helvetica-Bold')
//       .text('TO WAREHOUSE', 315, yPosition + 10);

//     doc
//       .fontSize(10)
//       .fillColor('#1e293b')
//       .font('Helvetica-Bold')
//       .text(stockFlow.to_warehouse_name || 'N/A', 315, yPosition + 30);

//     doc
//       .fontSize(9)
//       .fillColor(secondaryColor)
//       .font('Helvetica')
//       .text(stockFlow.to_warehouse_address || 'No address', 315, yPosition + 45, { width: 220 });

//     if (stockFlow.to_warehouse_phone) {
//       doc.text(`Phone: ${stockFlow.to_warehouse_phone}`, 315, yPosition + 70);
//     }
//     if (stockFlow.to_warehouse_email) {
//       doc.text(`Email: ${stockFlow.to_warehouse_email}`, 315, yPosition + 85);
//     }

//     yPosition += 120;

//     // Transfer Details Section
//     doc
//       .fontSize(14)
//       .fillColor(primaryColor)
//       .font('Helvetica-Bold')
//       .text('TRANSFER DETAILS', 50, yPosition);

//     yPosition += 25;

//     // Details Table
//     const details = [
//       { label: 'Article Profile', value: stockFlow.article_profile_name || 'N/A' },
//       { label: 'Product Name', value: stockFlow.product_name || 'N/A' },
//       { label: 'Product SKU', value: stockFlow.product_sku || 'N/A' },
//       { label: 'Product Barcode', value: stockFlow.product_barcode || 'N/A' },
//       { label: 'Quantity', value: `${stockFlow.quantity} units`, bold: true },
//       { label: 'From Location', value: stockFlow.from_loc || 'N/A' },
//       { label: 'To Location', value: stockFlow.to_loc || 'N/A' },
//       { 
//         label: 'Transport Method', 
//         value: stockFlow.transport === 'transport_co' ? 'Transport Company' :
//                stockFlow.transport.charAt(0).toUpperCase() + stockFlow.transport.slice(1)
//       },
//     ];

//     details.forEach((detail, index) => {
//       const bgColor = index % 2 === 0 ? '#ffffff' : '#f8fafc';
      
//       doc
//         .rect(50, yPosition, 495, 25)
//         .fill(bgColor);

//       doc
//         .fontSize(10)
//         .fillColor(secondaryColor)
//         .font('Helvetica')
//         .text(detail.label, 60, yPosition + 7);

//       doc
//         .fontSize(10)
//         .fillColor('#1e293b')
//         .font(detail.bold ? 'Helvetica-Bold' : 'Helvetica')
//         .text(detail.value, 250, yPosition + 7);

//       yPosition += 25;
//     });

//     // Description Box
//     if (stockFlow.description) {
//       yPosition += 15;
      
//       doc
//         .fontSize(12)
//         .fillColor(primaryColor)
//         .font('Helvetica-Bold')
//         .text('DESCRIPTION', 50, yPosition);

//       yPosition += 20;

//       doc
//         .rect(50, yPosition, 495, 'auto')
//         .fillAndStroke('#f8fafc', '#e2e8f0')
//         .lineWidth(1);

//       doc
//         .fontSize(10)
//         .fillColor('#1e293b')
//         .font('Helvetica')
//         .text(stockFlow.description, 60, yPosition + 10, { width: 475 });

//       yPosition += 60;
//     }

//     // Processed By Section
//     yPosition += 30;

//     doc
//       .fontSize(10)
//       .fillColor(secondaryColor)
//       .font('Helvetica')
//       .text('Processed by:', 50, yPosition);

//     doc
//       .fontSize(10)
//       .fillColor('#1e293b')
//       .font('Helvetica-Bold')
//       .text(stockFlow.created_by_name || 'System', 50, yPosition + 15);

//     if (stockFlow.created_by_email) {
//       doc
//         .fontSize(9)
//         .fillColor(secondaryColor)
//         .font('Helvetica')
//         .text(stockFlow.created_by_email, 50, yPosition + 30);
//     }

//     // Footer
//     const footerY = doc.page.height - 80;

//     doc
//       .moveTo(50, footerY)
//       .lineTo(545, footerY)
//       .strokeColor('#e2e8f0')
//       .lineWidth(1)
//       .stroke();

//     doc
//       .fontSize(8)
//       .fillColor(secondaryColor)
//       .font('Helvetica')
//       .text(
//         'This is a computer-generated document. No signature required.',
//         50,
//         footerY + 10,
//         { align: 'center' }
//       );

//     doc
//       .fontSize(8)
//       .text(
//         `Generated on ${DateTime.local().toFormat('dd MMM yyyy HH:mm:ss')}`,
//         50,
//         footerY + 25,
//         { align: 'center' }
//       );

//     // Finalize PDF
//     doc.end();

//   } catch (error) {
//     console.error('Error generating invoice:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error generating invoice',
//       error: error.message,
//     });
//   }
// };



// invoiceController.js
import PDFDocument from 'pdfkit';
import { do_ma_query } from '../db.js';
import { DateTime } from 'luxon';


export const generateStockFlowInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT 
        sf.*,
        w1.title as from_warehouse_name,
        w1.address as from_warehouse_address,
        w1.phone_1 as from_warehouse_phone,
        w1.email_1 as from_warehouse_email,
        u1.name as from_warehouse_contact,
        w2.title as to_warehouse_name,
        w2.address as to_warehouse_address,
        w2.phone_1 as to_warehouse_phone,
        w2.email_1 as to_warehouse_email,
        u2.name as to_warehouse_contact
      FROM stock_flow sf
      LEFT JOIN warehouse w1 ON sf.from_wh = w1.id
      LEFT JOIN users u1 ON w1.contact_person_id = u1.id
      LEFT JOIN warehouse w2 ON sf.to_wh = w2.id
      LEFT JOIN users u2 ON w2.contact_person_id = u2.id
      WHERE sf.id = ?
    `;

    const [stockFlow] = await do_ma_query(query, [id]);

    if (!stockFlow) {
      return res.status(404).json({
        success: false,
        message: 'Stock flow not found',
      });
    }

    const doc = new PDFDocument({ 
      size: 'A4',
      margin: 50,
      bufferPages: true
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=stock-flow-invoice-${id}.pdf`
    );

    doc.pipe(res);

    // Colors
    const primaryColor = '#3b82f6';
    const secondaryColor = '#64748b';
    const successColor = '#22c55e';
    const dangerColor = '#ef4444';

    // Header
    doc
      .fontSize(28)
      .fillColor(primaryColor)
      .font('Helvetica-Bold')
      .text('STOCK TRANSFER INVOICE', 50, 50);

    doc
      .fontSize(10)
      .fillColor(secondaryColor)
      .font('Helvetica')
      .text('Transfer Documentation', 50, 85);

    // Invoice Number & Date
    doc
      .fontSize(10)
      .fillColor(secondaryColor)
      .text(`Invoice #: SF-${String(id).padStart(6, '0')}`, 400, 50, { align: 'right' })
      .text(`Date: ${DateTime.fromJSDate(new Date(stockFlow.created_at)).toFormat('dd MMM yyyy')}`, 400, 65, { align: 'right' });

    // Status with color
    const statusColor = 
      stockFlow.status === 'approved' ? successColor :
      stockFlow.status === 'in-transit' ? '#f59e0b' :
      successColor;

    doc
      .fillColor(statusColor)
      .text(`Status: ${stockFlow.status.toUpperCase()}`, 400, 80, { align: 'right' });

    // Line
    doc
      .moveTo(50, 110)
      .lineTo(545, 110)
      .strokeColor(primaryColor)
      .lineWidth(2)
      .stroke();

    let yPos = 130;

    // FROM Section
    doc
      .rect(50, yPos, 240, 120)
      .fillAndStroke('#fef2f2', dangerColor)
      .lineWidth(0.5);

    doc
      .fontSize(12)
      .fillColor(dangerColor)
      .font('Helvetica-Bold')
      .text('FROM', 60, yPos + 10);

    // Determine FROM display
    const fromLabel = stockFlow.from_wh ? 'Warehouse' : 'Location';
    const fromValue = stockFlow.from_wh 
      ? (stockFlow.from_warehouse_name || 'N/A')
      : (stockFlow.from_loc || 'N/A');

    doc
      .fontSize(10)
      .fillColor('#1e293b')
      .font('Helvetica-Bold')
      .text(fromValue, 60, yPos + 30);

    if (stockFlow.from_wh) {
      doc
        .fontSize(9)
        .fillColor(secondaryColor)
        .font('Helvetica')
        .text(stockFlow.from_warehouse_address || 'No address', 60, yPos + 45, { width: 220 });
      doc.text(`Contact: ${stockFlow.from_warehouse_contact || 'N/A'}`, 60, yPos + 70);
      doc.text(`Phone: ${stockFlow.from_warehouse_phone || 'N/A'}`, 60, yPos + 85);
      doc.text(`Email: ${stockFlow.from_warehouse_email || 'N/A'}`, 60, yPos + 100);
    }

    // TO Section
    doc
      .rect(305, yPos, 240, 120)
      .fillAndStroke('#f0fdf4', successColor)
      .lineWidth(0.5);

    doc
      .fontSize(12)
      .fillColor(successColor)
      .font('Helvetica-Bold')
      .text('TO', 315, yPos + 10);

    const toLabel = stockFlow.to_wh ? 'Warehouse' : 'Location';
    const toValue = stockFlow.to_wh 
      ? (stockFlow.to_warehouse_name || 'N/A')
      : (stockFlow.to_loc || 'N/A');

    doc
      .fontSize(10)
      .fillColor('#1e293b')
      .font('Helvetica-Bold')
      .text(toValue, 315, yPos + 30);

    if (stockFlow.to_wh) {
      doc
        .fontSize(9)
        .fillColor(secondaryColor)
        .font('Helvetica')
        .text(stockFlow.to_warehouse_address || 'No address', 315, yPos + 45, { width: 220 });
      doc.text(`Contact: ${stockFlow.to_warehouse_contact || 'N/A'}`, 315, yPos + 70);
      doc.text(`Phone: ${stockFlow.to_warehouse_phone || 'N/A'}`, 315, yPos + 85);
      doc.text(`Email: ${stockFlow.to_warehouse_email || 'N/A'}`, 315, yPos + 100);
    }

    yPos += 140;

    // Transfer Details
    doc
      .fontSize(14)
      .fillColor(primaryColor)
      .font('Helvetica-Bold')
      .text('TRANSFER DETAILS', 50, yPos);

    yPos += 25;

    const details = [
      { label: 'Quantity', value: `${stockFlow.quantity} units`, bold: true },
      { 
        label: 'Transport Method', 
        value: stockFlow.transport === 'transport_co' ? 'Transport Company' :
               stockFlow.transport.charAt(0).toUpperCase() + stockFlow.transport.slice(1)
      },
    ];

    details.forEach((detail, index) => {
      const bgColor = index % 2 === 0 ? '#ffffff' : '#f8fafc';
      
      doc
        .rect(50, yPos, 495, 25)
        .fill(bgColor);

      doc
        .fontSize(10)
        .fillColor(secondaryColor)
        .font('Helvetica')
        .text(detail.label, 60, yPos + 7);

      doc
        .fontSize(10)
        .fillColor('#1e293b')
        .font(detail.bold ? 'Helvetica-Bold' : 'Helvetica')
        .text(detail.value, 250, yPos + 7);

      yPos += 25;
    });

    // Description
    if (stockFlow.description) {
      yPos += 15;
      
       const descHeight = Math.max(60, doc.heightOfString(stockFlow.description, { width: 475 }) + 20);
  const remainingHeight = doc.page.height - yPos - 80; // 80 for footer

  if (descHeight + 35 > remainingHeight) { // 35 for "DESCRIPTION" title and padding
    doc.addPage();
    yPos = 50; // reset top margin on new page
  }

    doc
    .fontSize(12)
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .text('DESCRIPTION', 50, yPos);

  yPos += 20;


      // const descHeight = Math.max(60, doc.heightOfString(stockFlow.description, { width: 475 }) + 20);

      doc
        .rect(50, yPos, 495, descHeight)
        .fillAndStroke('#f8fafc', '#e2e8f0')
        .lineWidth(1);

      doc
        .fontSize(10)
        .fillColor('#1e293b')
        .font('Helvetica')
        .text(stockFlow.description, 60, yPos + 10, { width: 475 });

      yPos += descHeight + 10;
    }

    // Footer
    const footerY = doc.page.height - 80;

    doc
      .moveTo(50, footerY)
      .lineTo(545, footerY)
      .strokeColor('#e2e8f0')
      .lineWidth(1)
      .stroke();

    doc
      .fontSize(8)
      .fillColor(secondaryColor)
      .font('Helvetica')
      .text(
        'This is a computer-generated document. No signature required.',
        50,
        footerY + 10,
        { align: 'center' }
      );

    doc
      .fontSize(8)
      .text(
        `Generated on ${DateTime.local().toFormat('dd MMM yyyy HH:mm:ss')}`,
        50,
        footerY + 25,
        { align: 'center' }
      );

    doc.end();

  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating invoice',
      error: error.message,
    });
  }
};




// // invoiceController.js
// import PDFDocument from 'pdfkit';
// import { do_ma_query } from '../db.js';
// import { DateTime } from 'luxon';

// export const generateStockFlowInvoice = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch stock flow data
//     const query = `
//       SELECT 
//         sf.*,
//         w1.title as from_warehouse_name,
//         w2.title as to_warehouse_name
//       FROM stock_flow sf
//       LEFT JOIN warehouse w1 ON sf.from_wh = w1.id
//       LEFT JOIN warehouse w2 ON sf.to_wh = w2.id
//       WHERE sf.id = ?
      
//     `;

//     const [stockFlow] = await do_ma_query(query, [id]);

//     if (!stockFlow) {
//       return res.status(404).json({
//         success: false,
//         message: 'Stock flow not found',
//       });
//     }

//     // Create PDF
//     const doc = new PDFDocument({ size: 'A4', margin: 50 });
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader(
//       'Content-Disposition',
//       `attachment; filename=stock-flow-invoice-${id}.pdf`
//     );

//     doc.pipe(res);

//     const primaryColor = '#3b82f6';
//     const secondaryColor = '#64748b';

//     // Header
//     doc
//       .fontSize(24)
//       .fillColor(primaryColor)
//       .font('Helvetica-Bold')
//       .text('STOCK TRANSFER INVOICE', { align: 'center' });

//     doc.moveDown(1);

//     // Invoice Number
//     doc
//       .fontSize(12)
//       .fillColor(secondaryColor)
//       .font('Helvetica')
//       .text(`Invoice #: SF-${String(id).padStart(6, '0')}`, { align: 'right' });

//     doc.moveDown(2);

//     // From / To Warehouses
//     doc
//       .fontSize(14)
//       .fillColor(primaryColor)
//       .font('Helvetica-Bold')
//       .text('From Warehouse:', 50);

//     doc
//       .fontSize(12)
//       .fillColor('#1e293b')
//       .font('Helvetica')
//       .text(stockFlow.from_warehouse_name || 'N/A', 50);

//     doc.moveDown(1);

//     doc
//       .fontSize(14)
//       .fillColor(primaryColor)
//       .font('Helvetica-Bold')
//       .text('To Warehouse:', 50);

//     doc
//       .fontSize(12)
//       .fillColor('#1e293b')
//       .font('Helvetica')
//       .text(stockFlow.to_warehouse_name || 'N/A', 50);

//     doc.moveDown(2);

//     // Quantity
//     doc
//       .fontSize(14)
//       .fillColor(primaryColor)
//       .font('Helvetica-Bold')
//       .text('Quantity:', 50);

//     doc
//       .fontSize(12)
//       .fillColor('#1e293b')
//       .font('Helvetica')
//       .text(`${stockFlow.quantity} units`, 50);

//     doc.moveDown(2);

//     // Transport
//     doc
//       .fontSize(14)
//       .fillColor(primaryColor)
//       .font('Helvetica-Bold')
//       .text('Transport Method:', 50);

//     const transportMethod =
//       stockFlow.transport === 'transport_co'
//         ? 'Transport Company'
//         : stockFlow.transport
//         ? stockFlow.transport.charAt(0).toUpperCase() + stockFlow.transport.slice(1)
//         : 'N/A';

//     doc
//       .fontSize(12)
//       .fillColor('#1e293b')
//       .font('Helvetica')
//       .text(transportMethod, 50);

//     // Finalize PDF
//     doc.end();
//   } catch (error) {
//     console.error('Error generating invoice:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error generating invoice',
//       error: error.message,
//     });
//   }
// };
