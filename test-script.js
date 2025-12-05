function doPost(e) {
  const sheet = SpreadsheetApp.openById('1c7hOSsv3YOToXA3vTX2fHIFmH9D8cH0MdOwkPvqOF1s').getActiveSheet();
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Phone', 'WhatsApp', 'State', 'Address', 'Availability']);
  }
  
  const data = e.parameter;
  sheet.appendRow([
    new Date(),
    data.firstName,
    data.lastName, 
    data.phoneNumber,
    data.whatsappNumber,
    data.state,
    data.deliveryAddress,
    data.availability
  ]);
  
  return ContentService.createTextOutput('Success');
}