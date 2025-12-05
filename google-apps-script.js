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
    console.log('=== ORDER PROCESSING START ===');
    console.log('Full event:', JSON.stringify(e));
    
    const SHEET_ID = '1c7hOSsv3YOToXA3vTX2fHIFmH9D8cH0MdOwkPvqOF1s';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    const data = e.parameter;
    console.log('Order data:', JSON.stringify(data));
    
    // Check if data is empty (common on first attempt)
    if (!data || Object.keys(data).length === 0) {
      console.log('No data received - likely cold start');
      return ContentService.createTextOutput('No data received');
    }
    
    // Add headers if needed
    if (sheet.getLastRow() === 0) {
      console.log('Adding headers to sheet');
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp', 'First Name', 'Last Name', 'Phone Number', 
        'WhatsApp Number', 'State', 'Delivery Address', 'Availability'
      ]]);
    }
    
    // Add the order
    const rowData = [
      new Date(),
      data.firstName || 'N/A',
      data.lastName || 'N/A',
      data.phoneNumber || 'N/A',
      data.whatsappNumber || 'N/A',
      data.state || 'N/A',
      data.deliveryAddress || 'N/A',
      data.availability || 'N/A'
    ];
    
    console.log('Adding row:', JSON.stringify(rowData));
    sheet.appendRow(rowData);
    console.log('Order saved successfully!');
    
    return ContentService.createTextOutput('SUCCESS: Order saved!');
    
  } catch (error) {
    console.error('ERROR saving order:', error.toString());
    return ContentService.createTextOutput('ERROR: ' + error.toString());
  }
}