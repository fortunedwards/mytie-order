// Save orders to JSON file in GitHub repository
async function saveToGitHubJSON(orderData) {
    const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';
    const REPO_OWNER = 'fortunedwards';
    const REPO_NAME = 'mytie-order';
    const FILE_PATH = 'orders.json';
    
    try {
        // Get existing file
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
            const content = atob(fileData.content);
            existingOrders = JSON.parse(content);
            sha = fileData.sha;
        }
        
        // Add new order
        existingOrders.push({
            ...orderData,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        
        // Update file
        const updateResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Add new order',
                content: btoa(JSON.stringify(existingOrders, null, 2)),
                sha: sha
            })
        });
        
        return updateResponse.ok;
    } catch (error) {
        console.error('Error saving to GitHub:', error);
        return false;
    }
}