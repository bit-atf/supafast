document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('leadModal');
    const modalContent = modal.querySelector('.modal-content');
    const closeButton = modal.querySelector('.modal-close');
    const form = document.getElementById('leadForm');
    
    // Get all CTA buttons that should open the modal
    const ctaButtons = document.querySelectorAll('.cta-button, .slots-cta');
    
    // Initialize EmailJS with your public key
    emailjs.init("kRQt_8yYk3DraxxHz");
    
    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        
        // Store current scroll position
        document.body.style.top = `-${window.scrollY}px`;
    }
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.top = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    // Add click handlers to all CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Prevent modal from closing when clicking inside the content
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state to submit button
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Get form data
        const formData = {
            name: form.querySelector('[name="name"]').value,
            email: form.querySelector('[name="email"]').value,
            phone: form.querySelector('[name="phone"]').value,
            service: form.querySelector('[name="service"]').value,
            message: form.querySelector('[name="message"]').value,
        };
        
        try {
            // Send email to business owner using EmailJS
            await emailjs.send(
                'service_8j2aapa', 
                'template_nmzcsoh',  // Updated template ID
                {
                    from_name: formData.name,
                    to_name: "Admin",
                    from_email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message,
                    reply_to: formData.email,
                }
            );

            // Send confirmation email to customer
            await emailjs.send(
                'service_8j2aapa',
                'template_gxya4dp',
                {
                    to_name: formData.name,
                    to_email: formData.email,
                    service: formData.service,
                    message: `Thank you for your interest in our ${formData.service} service. Our team will be in touch within 10 minutes to discuss your project.`,
                    reply_to: 'hello@varimahenry.com'
                }
            );
            
            // Show success message
            form.innerHTML = `
                <div class="success-message">
                    <h3>Thank you for your interest!</h3>
                    <p>We'll get back to you within 10 minutes to discuss your project.</p>
                </div>
            `;
            
            // Close modal after 3 seconds
            setTimeout(closeModal, 3000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show detailed error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = error.message || 'There was an error sending your message. Please try again.';
            submitButton.parentNode.insertBefore(errorDiv, submitButton);
            
            // Remove error message after 5 seconds
            setTimeout(() => errorDiv.remove(), 5000);
        }
    });
}); 