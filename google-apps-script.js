// Google Apps Script for MyTie Order Form
// Deploy this as a web app with execute permissions set to "Anyone"

function doPost(e) {
  try {
    const SHEET_ID = '1c7hOSsv3YOToXA3vTX2fHIFmH9D8cH0MdOwkPvqOF1s';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Get form data from different possible sources
    let data = e.parameter || {};
    
    // If no parameter data, try parsing the post data
    if (Object.keys(data).length === 0 && e.postData) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        // If JSON parsing fails, try URL-encoded data
        const params = new URLSearchParams(e.postData.contents);
        data = Object.fromEntries(params);
      }
    }
    
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
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', message: 'Order submitted successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return doPost(e);
}