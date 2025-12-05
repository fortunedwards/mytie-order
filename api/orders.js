// In-memory storage (resets on each deployment)
let orders = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const orderData = {
      ...req.body,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    // Add to in-memory storage
    orders.push(orderData);
    
    // Log for debugging (visible in Vercel function logs)
    console.log('=== NEW ORDER RECEIVED ===');
    console.log(JSON.stringify(orderData, null, 2));
    console.log('=== TOTAL ORDERS:', orders.length, '===');
    
    res.status(200).json({ 
      success: true, 
      message: 'Order received successfully',
      orderId: orderData.id,
      totalOrders: orders.length
    });
    
  } else if (req.method === 'GET') {
    res.status(200).json({ 
      success: true, 
      orders: orders,
      count: orders.length,
      note: 'Orders reset on each deployment. Check Vercel function logs for persistent records.'
    });
    
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}