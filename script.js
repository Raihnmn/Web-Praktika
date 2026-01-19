// Accordion functionality for Working Process section
document.addEventListener('DOMContentLoaded', function() {
    const processItems = document.querySelectorAll('.process-item');
    
    // Initialize accordion states based on active class
    processItems.forEach(item => {
        const contentInit = item.querySelector('.process-content');
        const toggleInit = item.querySelector('.toggle-btn');
        if (item.classList.contains('process-item-active')) {
            contentInit.style.display = 'block';
            if (toggleInit) toggleInit.textContent = '−';
        } else {
            contentInit.style.display = 'none';
            if (toggleInit) toggleInit.textContent = '+';
        }
    });

    // Set up click handlers
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
    
        // Animated counters for Stats section
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');

        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        const animateCount = (el, target, suffix = '', duration = 1200) => {
            const start = 0;
            const startTime = performance.now();

            const step = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOutCubic(progress);
                const value = Math.round(start + (target - start) * eased);
                el.textContent = `${value}${suffix}`;
                if (progress < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
        };

        if (statNumbers.length) {
            const statsObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        if (el.dataset.counted === 'true') return;
                        const target = parseFloat(el.dataset.target || '0');
                        const suffix = el.dataset.suffix || '';
                        el.dataset.counted = 'true';
                        animateCount(el, target, suffix);
                        obs.unobserve(el);
                    }
                });
            }, { threshold: 0.3 });

            statNumbers.forEach((el) => statsObserver.observe(el));
        }
    
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

    // Testimonials carousel (center mode: 1 full card, side peeks)
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const viewport = carousel.querySelector('.carousel-viewport');
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dotsContainer = document.querySelector('.carousel-dots');
        let pageIndex = 0;
        let slideWidth = 0;
        let peek = 160; // padding left/right inside viewport to reveal neighbors
        let pages = slides.length;

        const getGap = () => {
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap || '0');
            return isNaN(gap) ? 0 : gap;
        };

        const calcPeek = () => {
            const w = viewport.clientWidth;
            if (w >= 1200) return 180;
            if (w >= 900) return 160;
            if (w >= 700) return 120;
            if (w >= 480) return 80;
            return 50;
        };

        const layout = () => {
            const gap = getGap();
            const vw = viewport.clientWidth;
            peek = calcPeek();
            // Apply dynamic padding for side peeks
            viewport.style.paddingLeft = peek + 'px';
            viewport.style.paddingRight = peek + 'px';

            // Position arrows just outside the viewport/card edges
            const btnSize = 48;
            const outsideOffset = 12; // gap between arrow and card edge
            const carouselWidth = carousel.clientWidth;
            const vpLeft = viewport.offsetLeft;
            const vpRightSpace = carouselWidth - vpLeft - viewport.clientWidth;
            if (prevBtn) {
                const leftPos = Math.max(8, vpLeft - btnSize - outsideOffset);
                prevBtn.style.left = leftPos + 'px';
            }
            if (nextBtn) {
                const rightPos = Math.max(8, vpRightSpace - btnSize - outsideOffset);
                nextBtn.style.right = rightPos + 'px';
            }

            // Card width equals content width (vw - 2*peek), cap further to make video smaller
            slideWidth = Math.min(620, Math.max(260, vw - 2 * peek));

            slides.forEach(s => {
                s.style.flex = `0 0 ${slideWidth}px`;
            });

            pages = slides.length;
            buildDots();
            clampPage();
            updateTransform();
            pauseHiddenVideos();
            updateControls();
        };

        const clampPage = () => {
            if (pageIndex >= pages) pageIndex = pages - 1;
            if (pageIndex < 0) pageIndex = 0;
        };

        const updateTransform = () => {
            const gap = getGap();
            const pageWidth = slideWidth + gap; // move by one card + gap
            track.style.transform = `translateX(${-pageIndex * pageWidth}px)`;
            updateDots();
            updateControls();
        };

        const pauseHiddenVideos = () => {
            slides.forEach((s, i) => {
                const video = s.querySelector('video');
                if (!video) return;
                if (i !== pageIndex) {
                    try { video.pause(); } catch(e) {}
                }
            });
        };

        const buildDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < pages; i++) {
                const btn = document.createElement('button');
                btn.className = 'carousel-dot' + (i === pageIndex ? ' active' : '');
                btn.setAttribute('aria-label', `Ke halaman ${i+1}`);
                btn.addEventListener('click', () => {
                    pageIndex = i;
                    updateTransform();
                    pauseHiddenVideos();
                });
                dotsContainer.appendChild(btn);
            }
        };

        const updateDots = () => {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === pageIndex);
            });
        };

        // Looping navigation
        prevBtn.addEventListener('click', () => {
            pageIndex = (pageIndex - 1 + pages) % pages;
            updateTransform();
            pauseHiddenVideos();
        });

        nextBtn.addEventListener('click', () => {
            pageIndex = (pageIndex + 1) % pages;
            updateTransform();
            pauseHiddenVideos();
        });

        window.addEventListener('resize', layout);
        // keyboard arrows
        viewport.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { prevBtn.click(); }
            if (e.key === 'ArrowRight') { nextBtn.click(); }
        });
        viewport.setAttribute('tabindex', '0');
        layout();

        // Disable arrows at ends and update aria states
        function updateControls() {
            if (!prevBtn || !nextBtn) return;
            // Looping mode: controls are always enabled
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            prevBtn.setAttribute('aria-disabled', 'false');
            nextBtn.setAttribute('aria-disabled', 'false');
        }
    }
});
