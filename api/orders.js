import fs from 'fs';
import path from 'path';

const ordersFile = path.join(process.cwd(), 'orders.json');

function readOrders() {
  try {
    if (fs.existsSync(ordersFile)) {
      const data = fs.readFileSync(ordersFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading orders:', error);
  }
  return [];
}

function saveOrders(orders) {
  try {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving orders:', error);
    return false;
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const orderData = {
      ...req.body,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    const orders = readOrders();
    orders.push(orderData);
    
    if (saveOrders(orders)) {
      console.log('New order saved:', orderData);
      res.status(200).json({ 
        success: true, 
        message: 'Order saved successfully',
        orderId: orderData.id
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to save order' 
      });
    }
  } else if (req.method === 'GET') {
    const orders = readOrders();
    res.status(200).json({ 
      success: true, 
      orders: orders,
      count: orders.length 
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}