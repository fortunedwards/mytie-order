// EmailJS version - sends emails directly
// Add this script tag to your HTML: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");

// Replace the form submission part with this:
orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (errorMessage) {
        errorMessage.textContent = 'Submitting order...';
        errorMessage.style.color = 'blue';
    }
    
    const formData = new FormData(orderForm);
    const templateParams = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phoneNumber: formData.get('phoneNumber'),
        whatsappNumber: formData.get('whatsappNumber'),
        state: formData.get('state'),
        deliveryAddress: formData.get('deliveryAddress'),
        availability: formData.get('availability'),
        timestamp: new Date().toLocaleString()
    };
    
    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
        
        if (errorMessage) {
            errorMessage.textContent = '';
        }
        orderForm.reset();
        showSuccessPopup();
        
    } catch (error) {
        console.error('Error:', error);
        if (errorMessage) {
            errorMessage.textContent = 'Error submitting order. Please try again.';
            errorMessage.style.color = 'red';
        }
    }
});