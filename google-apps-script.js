// Google Apps Script for MyTie Order Form
// Deploy this as a web app with execute permissions set to "Anyone"

function doPost(e) {
  try {
    // Get the active spreadsheet using the provided sheet ID
    const SHEET_ID = '1c7hOSsv3YOToXA3vTX2fHIFmH9D8cH0MdOwkPvqOF1s';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Parse the form data
    const data = e.parameter;
    
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
      data.firstName || '',
      data.lastName || '',
      data.phoneNumber || '',
      data.whatsappNumber || '',
      data.state || '',
      data.deliveryAddress || '',
      data.availability || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', message: 'Order submitted successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return doPost(e);
}