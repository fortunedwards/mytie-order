// Local Storage Solution - stores data in browser, allows manual export

function saveOrderLocally(orderData) {
    // Get existing orders or create empty array
    const existingOrders = JSON.parse(localStorage.getItem('mytie-orders') || '[]');
    
    // Add new order
    existingOrders.push({
        ...orderData,
        id: Date.now(),
        timestamp: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('mytie-orders', JSON.stringify(existingOrders));
}

function exportOrdersAsJSON() {
    const orders = JSON.parse(localStorage.getItem('mytie-orders') || '[]');
    const dataStr = JSON.stringify(orders, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'mytie-orders.json';
    link.click();
}

// Replace form submission with this:
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phoneNumber: formData.get('phoneNumber'),
        whatsappNumber: formData.get('whatsappNumber'),
        state: formData.get('state'),
        deliveryAddress: formData.get('deliveryAddress'),
        availability: formData.get('availability')
    };
    
    saveOrderLocally(data);
    orderForm.reset();
    showSuccessPopup();
    
    // Show export button
    showExportButton();
});

function showExportButton() {
    if (!document.getElementById('export-btn')) {
        const exportBtn = document.createElement('button');
        exportBtn.id = 'export-btn';
        exportBtn.textContent = 'Export Orders (Admin)';
        exportBtn.onclick = exportOrdersAsJSON;
        exportBtn.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;background:#001F3F;color:white;padding:10px;border:none;border-radius:5px;cursor:pointer;';
        document.body.appendChild(exportBtn);
    }
}