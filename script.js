document.addEventListener('DOMContentLoaded', function() {
    const processItems = document.querySelectorAll('.process-item');
    
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

    processItems.forEach(item => {
        const header = item.querySelector('.process-header');
        const content = item.querySelector('.process-content');
        const toggleBtn = item.querySelector('.toggle-btn');
        
        header.addEventListener('click', function() {
            processItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('process-item-active');
                    otherItem.querySelector('.process-content').style.display = 'none';
                    otherItem.querySelector('.toggle-btn').textContent = '+';
                }
            });
            
            
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
    
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            
            console.log('Form submitted:', { name, email, message });
            
            
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            
            
            contactForm.reset();
        });
    }
    
    
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
    
    
    const animateElements = document.querySelectorAll('.program-card, .testimonial-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
        
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

    const carousel = document.querySelector('.testimonials .carousel');
    if (carousel) {
        const viewport = carousel.querySelector('.carousel-viewport');
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        
        const section = carousel.closest('.testimonials');
        const header = section ? section.querySelector('.section-header') : null;
        const titleEl = header ? header.querySelector('.section-title') : null;
        const dotsContainer = section ? section.querySelector('.carousel-dots') : null;
        
        if (dotsContainer && titleEl && titleEl.contains(dotsContainer)) {
            carousel.parentNode.insertBefore(dotsContainer, carousel.nextSibling);
        }
        
        const totalSlides = slides.length;
        let centerIndex = 0;

        const visibleCount = () => {
            if (window.innerWidth >= 1024) return 3; 
            if (window.innerWidth >= 768) return 2;   
            return 1;                                  
        };

        const getGap = () => {
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap || style.getPropertyValue('--slide-gap') || '24');
            return isNaN(gap) ? 24 : gap;
        };

        const computeCardWidth = () => {
            const v = visibleCount();
            const g = getGap();
            const vw = viewport.clientWidth;
            const wCalc = (vw - g * (v - 1)) / v;
            const shrunk = wCalc * 0.92; 
            return Math.max(220, Math.min(320, shrunk));
        };

        const updateSlideClasses = () => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'adjacent');
                if (i === centerIndex) slide.classList.add('active');
            });
        };

        const updateTransform = () => {
            const g = getGap();
            const w = computeCardWidth();
            track.style.setProperty('--slide-width', `${w}px`);
            const centerOffset = (viewport.clientWidth - w) / 2;
            const translateX = centerOffset - (centerIndex * (w + g));
            track.style.transform = `translateX(${translateX}px)`;
            updateSlideClasses();
            updateDots();
            pauseHiddenVideos();
            updateButtons();
            positionButtons();
        };

        const pauseHiddenVideos = () => {
            const span = Math.floor(visibleCount() / 2);
            const left = centerIndex - span;
            const right = centerIndex + span;
            slides.forEach((s, i) => {
                const video = s.querySelector('video');
                if (!video) return;
                if (i < left || i > right) {
                    try { video.pause(); } catch(e) {}
                }
            });
        };

        const getPageCount = () => totalSlides;

        const buildDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < getPageCount(); i++) {
                const btn = document.createElement('button');
                btn.className = 'carousel-dot' + (i === centerIndex ? ' active' : '');
                btn.setAttribute('aria-label', `Ke halaman ${i+1}`);
                btn.addEventListener('click', () => {
                    centerIndex = i;
                    updateTransform();
                });
                dotsContainer.appendChild(btn);
            }
        };

        const updateDots = () => {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === centerIndex);
            });
        };

        const updateButtons = () => {
            
            if (prevBtn) prevBtn.disabled = false;
            if (nextBtn) nextBtn.disabled = false;
        };

        const goToPrev = () => {
            centerIndex = (centerIndex - 1 + totalSlides) % totalSlides;
            updateTransform();
        };

        const goToNext = () => {
            centerIndex = (centerIndex + 1) % totalSlides;
            updateTransform();
        };

        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);

        window.addEventListener('resize', () => {
            buildDots();
            updateTransform();
        });
        
        viewport.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        });
        viewport.setAttribute('tabindex', '0');
        
        
        slides.forEach((s) => {
            const video = s.querySelector('video');
            const wrapper = s.querySelector('.video-wrapper');
            if (!video || !wrapper) return;
            video.addEventListener('play', () => wrapper.classList.add('playing'));
            video.addEventListener('pause', () => wrapper.classList.remove('playing'));
            video.addEventListener('ended', () => wrapper.classList.remove('playing'));
        });

        
        centerIndex = Math.floor(totalSlides / 2);
        buildDots();
        updateTransform();

        // Position buttons vertically aligned with active video center
        function positionButtons() {
            if (!prevBtn || !nextBtn) return;
            const activeVideo = track.querySelector('.testimonial-card.active .video-wrapper');
            const containerRect = carousel.getBoundingClientRect();
            const refRect = activeVideo ? activeVideo.getBoundingClientRect() : viewport.getBoundingClientRect();
            const middle = refRect.top + refRect.height / 2 - containerRect.top;
            const topValue = `${middle}px`;
            prevBtn.style.top = topValue;
            nextBtn.style.top = topValue;
            // ensure translateY centers the circle over the line
            prevBtn.style.transform = 'translateY(-50%)';
            nextBtn.style.transform = 'translateY(-50%)';
        }
    }

    
    const pf = document.querySelector('.portfolio-first .pf-carousel');
    if (pf) {
        const viewport = pf.querySelector('.pf-viewport');
        const track = pf.querySelector('.pf-track');
        const prevBtn = pf.querySelector('.pf-btn.prev');
        const nextBtn = pf.querySelector('.pf-btn.next');

        const getCardWidth = () => {
            const firstCard = track.querySelector('.pf-card');
            if (!firstCard) return viewport.clientWidth;
            const style = window.getComputedStyle(firstCard);
            const width = firstCard.getBoundingClientRect().width;
            const gap = parseFloat(window.getComputedStyle(track).gap || '0');
            return width + gap;
        };

        prevBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
        });

        
        viewport.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        });
        viewport.setAttribute('tabindex', '0');
    }
});
