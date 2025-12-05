# MyTie - Premium Quality Ties Landing Page

A modern, responsive landing page for MyTie - a premium tie collection business. Built with HTML, CSS, JavaScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Image Sliders**: Interactive product galleries with navigation controls
- **Hero Image Rotation**: Automatic background image cycling every 5 seconds
- **Order Form**: Integrated with Google Sheets for order collection
- **FAQ Section**: Collapsible frequently asked questions
- **Success Popup**: User-friendly order confirmation modal

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Tailwind CSS
- Google Apps Script (for form submissions)
- Google Fonts (Manrope & Playfair Display)

## Project Structure

```
mytie-landing-page/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── style.css           # Custom CSS styles (legacy)
├── mytie.png          # Logo image
├── logo.jpg           # Favicon
├── tie1.jpg - tie5.jpg # Hero background images
├── tie6.jpg - tie23.jpg # Product slider images
└── README.md          # Project documentation
```

## Setup Instructions

1. Clone or download this repository
2. Ensure all image files are in the root directory
3. Open `index.html` in a web browser
4. For form functionality, set up Google Apps Script (see below)

## Google Sheets Integration

The order form is connected to Google Sheets via Google Apps Script:

1. Create a new Google Apps Script project
2. Replace the default code with the provided script
3. Deploy as a web app
4. Update the fetch URL in `script.js` with your deployment URL

## Features Overview

### Product Collections
- Collection #1: ₦19,999.00 (6 images: tie3.jpg, tie6-10.jpg)
- Collection #2: ₦19,999.00 (6 images: tie4.jpg, tie11-15.jpg)  
- Collection #3: ₦19,999.00 (9 images: tie5.jpg, tie16-23.jpg)

### Order Form Fields
- First Name & Last Name
- Active Phone Number
- WhatsApp Phone Number
- Nigerian State (dropdown)
- Delivery Address
- Availability (1-3 days)

### Business Information
- Price: ₦19,999 per box (3 premium ties)
- Delivery: Nationwide to doorstep
- Payment: Cash on delivery available
- Contact: Form submission triggers follow-up

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

© 2025 MyTie. All Rights Reserved.

## Contact

For business inquiries, please use the order form on the website.