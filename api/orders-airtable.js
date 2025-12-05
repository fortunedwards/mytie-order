export default async function handler(req, res) {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_NAME = 'Orders';
  
  if (req.method === 'POST') {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [{
            fields: {
              'First Name': req.body.firstName,
              'Last Name': req.body.lastName,
              'Phone': req.body.phoneNumber,
              'WhatsApp': req.body.whatsappNumber,
              'State': req.body.state,
              'Address': req.body.deliveryAddress,
              'Availability': req.body.availability,
              'Timestamp': new Date().toISOString()
            }
          }]
        })
      });
      
      if (response.ok) {
        res.status(200).json({ success: true, message: 'Order saved to Airtable' });
      } else {
        throw new Error('Airtable API error');
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}