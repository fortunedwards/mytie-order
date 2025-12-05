export default function handler(req, res) {
  if (req.method === 'POST') {
    const orderData = {
      ...req.body,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    console.log('Order received:', orderData);
    
    res.status(200).json({ 
      success: true, 
      message: 'Order received successfully',
      orderId: orderData.id
    });
    
  } else if (req.method === 'GET') {
    res.status(200).json({ 
      success: true, 
      orders: [],
      count: 0,
      message: 'API is working'
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}