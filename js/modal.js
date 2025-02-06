document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('leadModal');
    const modalContent = modal.querySelector('.modal-content');
    const closeButton = modal.querySelector('.modal-close');
    const form = document.getElementById('leadForm');
    
    // Get all CTA buttons that should open the modal
    const ctaButtons = document.querySelectorAll('.cta-button, .slots-cta');
    
    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
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
        
        // Here you would typically send the form data to your server
        // For now, we'll just simulate a submission
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            form.innerHTML = `
                <div class="success-message">
                    <h3>Thank you for your interest!</h3>
                    <p>We'll get back to you within 24 hours to discuss your project.</p>
                </div>
            `;
            
            // Close modal after 3 seconds
            setTimeout(closeModal, 3000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}); 