// Vercel serverless function to handle orders
export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('New order received:', req.body);
    
    res.status(200).json({ 
      success: true, 
      message: 'Order received successfully',
      order: req.body 
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}