// Google Apps Script for MyTie Order Form
// Deploy this as a web app with execute permissions set to "Anyone"

function doPost(e) {
  return saveOrder(e);
}

function doGet(e) {
  return saveOrder(e);
}

function saveOrder(e) {
  try {
    const SHEET_ID = '1c7hOSsv3YOToXA3vTX2fHIFmH9D8cH0MdOwkPvqOF1s';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    const data = e.parameter;
    console.log('Received order:', JSON.stringify(data));
    
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp', 'First Name', 'Last Name', 'Phone Number', 
        'WhatsApp Number', 'State', 'Delivery Address', 'Availability'
      ]]);
    }
    
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
    
    return ContentService.createTextOutput('Order saved successfully!');
    
  } catch (error) {
    console.error('Error saving order:', error);
    return ContentService.createTextOutput('Error: ' + error.toString());
  }
}