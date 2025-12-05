import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const orderData = {
      ...req.body,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    try {
      // Save to Vercel KV
      await kv.lpush('mytie-orders', JSON.stringify(orderData));
      
      console.log('Order saved to KV:', orderData);
      
      res.status(200).json({ 
        success: true, 
        message: 'Order saved permanently',
        orderId: orderData.id
      });
    } catch (error) {
      console.error('KV Error:', error);
      res.status(500).json({ success: false, message: 'Failed to save order' });
    }
    
  } else if (req.method === 'GET') {
    try {
      const orders = await kv.lrange('mytie-orders', 0, -1);
      const parsedOrders = orders.map(order => JSON.parse(order)).reverse();
      
      res.status(200).json({ 
        success: true, 
        orders: parsedOrders,
        count: parsedOrders.length 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}