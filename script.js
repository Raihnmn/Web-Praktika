// Accordion functionality for Working Process section
document.addEventListener('DOMContentLoaded', function() {
    const processItems = document.querySelectorAll('.process-item');
    
    processItems.forEach(item => {
        const header = item.querySelector('.process-header');
        const content = item.querySelector('.process-content');
        const toggleBtn = item.querySelector('.toggle-btn');
        
        header.addEventListener('click', function() {
            // Close all other items
            processItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('process-item-active');
                    otherItem.querySelector('.process-content').style.display = 'none';
                    otherItem.querySelector('.toggle-btn').textContent = '+';
                }
            });
            
            // Toggle current item
            item.classList.toggle('process-item-active');
            
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                toggleBtn.textContent = '−';
            } else {
                content.style.display = 'none';
                toggleBtn.textContent = '+';
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.program-card, .testimonial-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-menu');
        const navButtons = document.querySelector('.nav-buttons');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'mobile-menu-toggle';
                menuToggle.innerHTML = '☰';
                menuToggle.style.cssText = `
                    display: block;
                    background: none;
                    border: none;
                    font-size: 28px;
                    cursor: pointer;
                    padding: 10px;
                `;
                
                const navWrapper = document.querySelector('.nav-wrapper');
                navWrapper.insertBefore(menuToggle, navButtons);
                
                menuToggle.addEventListener('click', function() {
                    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                    nav.style.flexDirection = 'column';
                    nav.style.position = 'absolute';
                    nav.style.top = '70px';
                    nav.style.left = '0';
                    nav.style.right = '0';
                    nav.style.background = 'white';
                    nav.style.padding = '20px';
                    nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                });
            }
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
});
