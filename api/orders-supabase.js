import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          phone_number: req.body.phoneNumber,
          whatsapp_number: req.body.whatsappNumber,
          state: req.body.state,
          delivery_address: req.body.deliveryAddress,
          availability: req.body.availability,
          created_at: new Date().toISOString()
        }]);
      
      if (error) throw error;
      
      res.status(200).json({ success: true, message: 'Order saved to Supabase' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
    
  } else if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      res.status(200).json({ success: true, orders: data, count: data.length });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}