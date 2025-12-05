// Simplified Google Apps Script - easier to set up
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Get form data
  const formData = e.parameter;
  
  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Phone', 'WhatsApp', 'State', 'Address', 'Availability']);
  }
  
  // Add new order
  sheet.appendRow([
    new Date(),
    formData.firstName,
    formData.lastName,
    formData.phoneNumber,
    formData.whatsappNumber,
    formData.state,
    formData.deliveryAddress,
    formData.availability
  ]);
  
  return ContentService.createTextOutput('Success');
}