const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'fortunedwards';
const REPO_NAME = 'mytie-order';
const FILE_PATH = 'orders.json';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const orderData = {
      ...req.body,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    try {
      // Get existing orders from GitHub
      const getResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      let existingOrders = [];
      let sha = null;
      
      if (getResponse.ok) {
        const fileData = await getResponse.json();
        const content = Buffer.from(fileData.content, 'base64').toString('utf8');
        existingOrders = JSON.parse(content);
        sha = fileData.sha;
      }
      
      // Add new order
      existingOrders.push(orderData);
      
      // Update file on GitHub
      const updateResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Add order #${orderData.id}`,
          content: Buffer.from(JSON.stringify(existingOrders, null, 2)).toString('base64'),
          sha: sha
        })
      });
      
      if (updateResponse.ok) {
        console.log('Order saved to GitHub:', orderData);
        res.status(200).json({ 
          success: true, 
          message: 'Order saved permanently to GitHub',
          orderId: orderData.id
        });
      } else {
        throw new Error('Failed to update GitHub file');
      }
      
    } catch (error) {
      console.error('GitHub API Error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to save order: ' + error.message 
      });
    }
    
  } else if (req.method === 'GET') {
    try {
      const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (response.ok) {
        const fileData = await response.json();
        const content = Buffer.from(fileData.content, 'base64').toString('utf8');
        const orders = JSON.parse(content);
        
        res.status(200).json({ 
          success: true, 
          orders: orders.reverse(),
          count: orders.length 
        });
      } else {
        res.status(200).json({ success: true, orders: [], count: 0 });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}