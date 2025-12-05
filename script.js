// Success popup function
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 10px; text-align: center; max-width: 400px; margin: 1rem;">
                <div style="color: #22c55e; font-size: 3rem; margin-bottom: 1rem;">✓</div>
                <h3 style="color: #333; font-size: 1.5rem; margin-bottom: 1rem;">Order Submitted Successfully!</h3>
                <p style="color: #666; margin-bottom: 1.5rem;">Thank you for your order. We will contact you soon to help you make a selection of your choice.</p>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #001F3F; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}

// --- Product Image Slider Logic ---

// Function to handle moving the slides for a specific carousel
function setupSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const prevButton = slider.querySelector('.prev-button');
    const nextButton = slider.querySelector('.next-button');
    let currentSlideIndex = 0;

    // Function to update which slide is visible
    function showSlide(index) {
        // Remove 'active-slide' class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active-slide');
        });

        // Ensure index wraps around (circular slideshow)
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }

        // Add 'active-slide' class to the current slide
        slides[currentSlideIndex].classList.add('active-slide');
    }

    // Event listener for the Next button
    nextButton.addEventListener('click', () => {
        showSlide(currentSlideIndex + 1);
    });

    // Event listener for the Previous button
    prevButton.addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Select all the buttons that act as the FAQ questions
    const faqQuestions = document.querySelectorAll('.faq-question');

    // Loop through each question button
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Get the corresponding answer panel (the sibling element)
            const answer = question.nextElementSibling;

            // Toggle the 'open' class on the answer panel
            // This is what the CSS uses to show/hide the content
            answer.classList.toggle('open');
            
            // Toggle the 'active' class on the question button
            // This is used to change the '+' sign to a '−' sign
            question.classList.toggle('active');

            // OPTIONAL: Close other open FAQ items when a new one is opened
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('open');
                }
            });
        });
    });

    // Initialize all sliders
    setupSlider('tie-slider-1');
    setupSlider('tie-slider-2');
    setupSlider('tie-slider-3');

    // Hero image shuffling
    const heroSection = document.querySelector('[style*="background-image"]');
    const heroImages = ['tie1.jpg', 'tie2.jpg', 'tie3.jpg', 'tie4.jpg', 'tie5.jpg'];
    let currentImageIndex = 0;
    
    function shuffleHeroImage() {
        if (heroSection) {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            const newImageUrl = `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("${heroImages[currentImageIndex]}")`;
            heroSection.style.backgroundImage = newImageUrl;
        }
    }
    
    // Change hero image every 5 seconds
    if (heroSection) {
        setInterval(shuffleHeroImage, 5000);
    }

    // Form submission to Google Sheets
    const orderForm = document.getElementById('order-form');
    const errorMessage = document.querySelector('.error-message');
    
    if (orderForm && orderForm.tagName === 'FORM') {
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted');
            
            // Show loading message
            if (errorMessage) {
                errorMessage.textContent = 'Submitting order...';
                errorMessage.style.color = 'blue';
            }
            
            const formData = new FormData(orderForm);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                phoneNumber: formData.get('phoneNumber'),
                whatsappNumber: formData.get('whatsappNumber'),
                state: formData.get('state'),
                deliveryAddress: formData.get('deliveryAddress'),
                availability: formData.get('availability'),
                timestamp: new Date().toLocaleString()
            };
            
            console.log('Form data:', data);
            
            // Create email body with form data
            const emailBody = `
New MyTie Order:

Name: ${data.firstName} ${data.lastName}
Phone: ${data.phoneNumber}
WhatsApp: ${data.whatsappNumber}
State: ${data.state}
Address: ${data.deliveryAddress}
Availability: ${data.availability}
Timestamp: ${data.timestamp}
            `;
            
            // Open email client
            const mailtoLink = `mailto:fortunedwards@gmail.com?subject=New MyTie Order&body=${encodeURIComponent(emailBody)}`;
            window.open(mailtoLink);
            
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
    } else {
        console.error('Order form not found');
    }
});