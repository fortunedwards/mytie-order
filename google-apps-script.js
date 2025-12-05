// Google Apps Script for MyTie Order Form
// Deploy this as a web app with execute permissions set to "Anyone"

function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    const SHEET_ID = '1c7hOSsv3YOToXA3vTX2fHIFmH9D8cH0MdOwkPvqOF1s';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Get form data from parameters
    const data = e.parameter || {};
    
    // Log the received data for debugging
    console.log('Received data:', JSON.stringify(data));
    
    // Create headers if this is the first submission
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp', 'First Name', 'Last Name', 'Phone Number', 
        'WhatsApp Number', 'State', 'Delivery Address', 'Availability'
      ]]);
    }
    
    // Add the new row of data
    sheet.appendRow([
      new Date(),
      data.firstName || 'N/A',
      data.lastName || 'N/A',
      data.phoneNumber || 'N/A',
      data.whatsappNumber || 'N/A',
      data.state || 'N/A',
      data.deliveryAddress || 'N/A',
      data.availability || 'N/A'
    ]);
    
    console.log('Order saved successfully');
    
    return ContentService
      .createTextOutput('SUCCESS')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('Error:', error.toString());
    return ContentService
      .createTextOutput('ERROR: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}