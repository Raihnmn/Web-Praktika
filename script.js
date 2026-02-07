document.addEventListener('DOMContentLoaded', function() {
    const processItems = document.querySelectorAll('.process-item');

    // Initialize process accordion with animations
    processItems.forEach(item => {
        const content = item.querySelector('.process-content');
        const toggle = item.querySelector('.toggle-btn');
        
        if (!content) return;
        
        // Set transition styles via JS
        content.style.transition = 'max-height 0.35s ease, opacity 0.35s ease, padding 0.35s ease';
        content.style.overflow = 'hidden';
        item.style.transition = 'background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease';
        
        if (toggle) {
            toggle.style.transition = 'transform 0.3s ease, background 0.3s ease, color 0.3s ease';
        }
        
        if (item.classList.contains('process-item-active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            content.style.paddingTop = '0';
            content.style.paddingBottom = '20px';
            item.style.backgroundColor = '#BFFF00';
            if (toggle) {
                toggle.textContent = '−';
                toggle.style.transform = 'rotate(180deg)';
                toggle.style.background = '#1E1E1E';
                toggle.style.color = '#fff';
                toggle.style.borderColor = '#1E1E1E';
            }
        } else {
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            content.style.paddingTop = '0';
            content.style.paddingBottom = '0';
            item.style.backgroundColor = '#fff';
            if (toggle) {
                toggle.textContent = '+';
                toggle.style.transform = 'rotate(0deg)';
                toggle.style.background = 'transparent';
                toggle.style.color = '#1E1E1E';
            }
        }
    });

    processItems.forEach(item => {
        const header = item.querySelector('.process-header');
        const content = item.querySelector('.process-content');
        const toggleBtn = item.querySelector('.toggle-btn');

        header.addEventListener('click', function() {
            // Close all other items with animation
            processItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const oc = otherItem.querySelector('.process-content');
                    const ot = otherItem.querySelector('.toggle-btn');
                    otherItem.classList.remove('process-item-active');
                    otherItem.style.backgroundColor = '#fff';
                    if (oc) {
                        oc.style.maxHeight = '0px';
                        oc.style.opacity = '0';
                        oc.style.paddingBottom = '0';
                    }
                    if (ot) {
                        ot.textContent = '+';
                        ot.style.transform = 'rotate(0deg)';
                        ot.style.background = 'transparent';
                        ot.style.color = '#1E1E1E';
                    }
                }
            });

            item.classList.toggle('process-item-active');

            if (item.classList.contains('process-item-active')) {
                // Open animation
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                content.style.paddingBottom = '20px';
                item.style.backgroundColor = '#BFFF00';
                toggleBtn.textContent = '−';
                toggleBtn.style.transform = 'rotate(180deg)';
                toggleBtn.style.background = '#1E1E1E';
                toggleBtn.style.color = '#fff';
                toggleBtn.style.borderColor = '#1E1E1E';
            } else {
                // Close animation
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                content.style.paddingBottom = '0';
                item.style.backgroundColor = '#fff';
                toggleBtn.textContent = '+';
                toggleBtn.style.transform = 'rotate(0deg)';
                toggleBtn.style.background = 'transparent';
                toggleBtn.style.color = '#1E1E1E';
            }
        });
        
        // Hover effect on header
        header.addEventListener('mouseenter', function() {
            if (!item.classList.contains('process-item-active')) {
                item.style.backgroundColor = '#FAFAFA';
            }
        });
        
        header.addEventListener('mouseleave', function() {
            if (!item.classList.contains('process-item-active')) {
                item.style.backgroundColor = '#fff';
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

    // Stats Card Hover Animation
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(163, 230, 53, 0.2)';
            this.style.borderColor = '#a3e635';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });

    // Program Card Hover Animation
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        const icon = card.querySelector('.program-icon');
        if (icon) {
            icon.style.transition = 'transform 0.3s ease';
            icon.style.display = 'inline-block';
        }
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        const slider = partnersTrack.closest('.partners-slider');
        const originalLogos = Array.from(partnersTrack.querySelectorAll('.partner-logo'));
        const logoCount = originalLogos.length;
        if (logoCount > 0) {
        const sliderStyle = document.createElement('style');
        sliderStyle.textContent = `
            .partners-slider {
                overflow: hidden;
                width: 100%;
                position: relative;
            }
            .partners-track {
                display: flex;
                width: max-content;
                animation: scroll-partners 20s linear infinite;
            }
            .partners-track:hover {
                animation-play-state: paused;
            }
            .partner-logo {
                flex-shrink: 0;
                min-width: 180px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .partner-logo img {
                width: auto;
                max-width: 150px;
                height: 40px;
                object-fit: contain;
                filter: grayscale(100%);
                opacity: 0.6;
                transition: filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
            }
            .partner-logo:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }
            .partner-logo:hover img {
                filter: grayscale(0%);
                opacity: 1;
            }
        `;
        document.head.appendChild(sliderStyle);
        
        // Clone logos enough times to fill screen + buffer
        const cloneMultiplier = 10; // Clone 10 times for safety
        for (let i = 0; i < cloneMultiplier; i++) {
            originalLogos.forEach(logo => {
                const clone = logo.cloneNode(true);
                partnersTrack.appendChild(clone);
            });
        }
        
        // Calculate width after clones are added and set animation
        requestAnimationFrame(() => {
            const gap = parseFloat(window.getComputedStyle(partnersTrack).gap) || 40;
            let singleSetWidth = 0;
            originalLogos.forEach(logo => {
                singleSetWidth += logo.offsetWidth + gap;
            });
            
            // Create keyframes for the exact width
            const keyframes = document.createElement('style');
            keyframes.textContent = `
                @keyframes scroll-partners {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-${singleSetWidth}px);
                    }
                }
            `;
            document.head.appendChild(keyframes);
            
            // Set duration based on number of logos (slower = smoother)
            const duration = logoCount * 3; // 3 seconds per logo
            partnersTrack.style.animationDuration = `${duration}s`;
        });
        } // end if logoCount > 0
    }
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return; 
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    document.querySelectorAll('[data-scroll], [data-scroll-to]').forEach(el => {
        el.addEventListener('click', () => {
            const selector = el.getAttribute('data-scroll') || el.getAttribute('data-scroll-to');
            if (!selector) return;
            const target = document.querySelector(selector);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    const animEls = document.querySelectorAll('.anim-fade-up, .anim-pop, .anim-slide-left, .anim-slide-right');
    animEls.forEach(el => {
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
        const navMenu = document.querySelector('.nav-menu');
        const navButtons = document.querySelector('.nav-buttons');
        const navbar = document.querySelector('.navbar');

        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'mobile-menu-toggle';
                menuToggle.setAttribute('aria-label', 'Toggle menu');
                menuToggle.innerHTML = '☰';

                const navWrapper = document.querySelector('.nav-wrapper');
                if (navWrapper) {
                    navWrapper.insertBefore(menuToggle, navWrapper.firstChild);
                }

                menuToggle.addEventListener('click', function() {
                    const open = navbar.classList.toggle('mobile-open');
                    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
            }
        } else {
            if (navbar) navbar.classList.remove('mobile-open');
            if (navMenu) navMenu.removeAttribute('style');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) toggle.remove();
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
            slides.forEach((slide) => {
                slide.classList.remove('active', 'adjacent');
                slide.style.opacity = '0.5';
                slide.style.transform = 'scale(0.95)';
                slide.style.transition = 'all 0.4s ease';
                slide.style.borderColor = 'rgba(255,255,255,0.15)';
            });
            const left = (centerIndex - 1 + totalSlides) % totalSlides;
            const right = (centerIndex + 1) % totalSlides;
            
            // Active card (center)
            if (slides[centerIndex]) {
                slides[centerIndex].classList.add('active');
                slides[centerIndex].style.opacity = '1';
                slides[centerIndex].style.transform = 'scale(1)';
                slides[centerIndex].style.borderColor = 'rgba(255,255,255,0.35)';
            }
            
            // Adjacent cards (left and right)
            [left, right].forEach(idx => {
                if (slides[idx]) {
                    slides[idx].classList.add('adjacent');
                    slides[idx].style.opacity = '0.7';
                    slides[idx].style.transform = 'scale(0.95)';
                }
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
                // Style dots via JS
                btn.style.width = '12px';
                btn.style.height = '12px';
                btn.style.borderRadius = '50%';
                btn.style.border = 'none';
                btn.style.cursor = 'pointer';
                btn.style.transition = 'all 0.3s ease';
                btn.style.backgroundColor = i === centerIndex ? '#BFFF00' : 'rgba(255,255,255,0.4)';
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
                d.style.backgroundColor = i === centerIndex ? '#BFFF00' : 'rgba(255,255,255,0.4)';
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
        
        // Button hover effects
        [prevBtn, nextBtn].forEach(btn => {
            if (!btn) return;
            btn.addEventListener('mouseenter', function() {
                this.style.borderColor = 'rgba(255,255,255,0.6)';
                this.style.boxShadow = '0 0 15px rgba(255,255,255,0.2)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.borderColor = 'rgba(255,255,255,0.3)';
                this.style.boxShadow = 'none';
            });
        });

        slides.forEach((slide, i) => {
            slide.addEventListener('click', (e) => {
                if (i === centerIndex) return;
                centerIndex = i;
                updateTransform();
            });
        });

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

        function positionButtons() {
            if (!prevBtn || !nextBtn) return;
            const activeVideo = track.querySelector('.testimonial-card.active .video-wrapper');
            const containerRect = carousel.getBoundingClientRect();
            const refRect = activeVideo ? activeVideo.getBoundingClientRect() : viewport.getBoundingClientRect();
            const middle = refRect.top + refRect.height / 2 - containerRect.top;
            const offset = -50; 
            const topValue = `${middle + offset}px`;
            prevBtn.style.top = topValue;
            nextBtn.style.top = topValue;
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

        const setupInfinite = () => {
            const cards = Array.from(track.querySelectorAll('.pf-card'));
            const cloneCount = Math.min(2, cards.length); 
            for (let i = 0; i < cloneCount; i++) {
                track.appendChild(cards[i].cloneNode(true));
                track.insertBefore(cards[cards.length - 1 - i].cloneNode(true), track.firstChild);
            }
            viewport.scrollLeft = cloneCount * getCardWidth();
            return { cloneCount, originalCount: cards.length };
        };

        const loopState = setupInfinite();

        const checkBounds = () => {
            const w = getCardWidth();
            const rawIndex = Math.round(viewport.scrollLeft / w);
            const start = loopState.cloneCount;
            const end = loopState.cloneCount + loopState.originalCount - 1;
            if (rawIndex < start) {
                viewport.scrollLeft = (rawIndex + loopState.originalCount) * w;
            } else if (rawIndex > end) {
                viewport.scrollLeft = (rawIndex - loopState.originalCount) * w;
            }
        };

        prevBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
            setTimeout(checkBounds, 350);
        });
        nextBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
            setTimeout(checkBounds, 350);
        });

        let scrollTimer;
        viewport.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(checkBounds, 120);
        });

        
        viewport.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        });
        viewport.setAttribute('tabindex', '0');
    }

    // Program carousel for BootcampsV2
    const progCarousel = document.querySelector('.program-carousel');
    if (progCarousel) {
        const viewport = progCarousel.querySelector('.carousel-viewport');
        const track = progCarousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevBtn = progCarousel.querySelector('.carousel-btn.prev');
        const nextBtn = progCarousel.querySelector('.carousel-btn.next');
        const dotsContainer = progCarousel.parentElement.querySelector('.program-dots');

        let currentSlide = 0;

        const getVisibleCount = () => {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        };

        const updateDimensions = () => {
            const gap = 24;
            const visible = getVisibleCount();
            const containerWidth = viewport.clientWidth;
            const cardWidth = Math.max(240, Math.min(340, (containerWidth - (gap * (visible - 1))) / visible));
            track.style.setProperty('--slide-width', `${cardWidth}px`);
            track.style.gap = `${gap}px`;
            return { cardWidth, gap, visible };
        };

        const buildDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const { visible } = updateDimensions();
            const dotCount = Math.max(1, slides.length - visible + 1);
            for (let i = 0; i < dotCount; i++) {
                const btn = document.createElement('button');
                btn.className = 'carousel-dot' + (i === currentSlide ? ' active' : '');
                btn.setAttribute('aria-label', `Ke halaman ${i+1}`);
                btn.addEventListener('click', () => { currentSlide = i; updateSlider(); });
                dotsContainer.appendChild(btn);
            }
        };

        const updateSlider = () => {
            const { cardWidth, gap, visible } = updateDimensions();
            const moveAmount = currentSlide * (cardWidth + gap);
            track.style.transform = `translateX(-${moveAmount}px)`;
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
            }
            const maxIndex = Math.max(0, slides.length - visible);
            if (prevBtn) prevBtn.style.opacity = currentSlide <= 0 ? '0.5' : '1';
            if (nextBtn) nextBtn.style.opacity = currentSlide >= maxIndex ? '0.5' : '1';
        };

        const nextSlide = () => {
            const { visible } = updateDimensions();
            const maxIndex = Math.max(0, slides.length - visible);
            currentSlide = currentSlide < maxIndex ? currentSlide + 1 : 0;
            updateSlider();
        };
        const prevSlide = () => {
            const { visible } = updateDimensions();
            const maxIndex = Math.max(0, slides.length - visible);
            currentSlide = currentSlide > 0 ? currentSlide - 1 : maxIndex;
            updateSlider();
        };

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        window.addEventListener('resize', () => { buildDots(); updateSlider(); });

        buildDots();
        updateSlider();
    }
    const hub = document.querySelector('.contact-section .hub-carousel');
    if (hub) {
        const viewport = hub.querySelector('.hub-viewport');
        const track = hub.querySelector('.hub-track');
        const slides = Array.from(track.children);
        const prevBtn = hub.querySelector('.hub-btn.prev');
        const nextBtn = hub.querySelector('.hub-btn.next');
        const dotsContainer = hub.parentElement.querySelector('.hub-dots');

        let centerVisible = 0;

        const visibleCount = () => {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        };

        const getGap = () => {
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap || '20');
            return isNaN(gap) ? 20 : gap;
        };

        const computeCardWidth = () => {
            const v = visibleCount();
            const g = getGap();
            const vw = viewport.clientWidth;
            const wCalc = (vw - g * (v - 1)) / v;
            return Math.max(240, Math.min(380, wCalc));
        };

        const visibleSlides = () => slides.filter(s => !s.hasAttribute('hidden'));

        const updateButtons = () => {
            if (prevBtn) prevBtn.disabled = false;
            if (nextBtn) nextBtn.disabled = false;
        };

        const buildDots = () => {
            if (!dotsContainer) return;
            const vis = visibleSlides();
            dotsContainer.innerHTML = '';
            vis.forEach((_, i) => {
                const btn = document.createElement('button');
                btn.className = 'carousel-dot' + (i === centerVisible ? ' active' : '');
                btn.setAttribute('aria-label', `Ke halaman ${i+1}`);
                btn.addEventListener('click', () => { centerVisible = i; updateTransform(); });
                dotsContainer.appendChild(btn);
            });
        };

        const updateDots = () => {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((d, i) => d.classList.toggle('active', i === centerVisible));
        };

        const updateTransform = () => {
            const g = getGap();
            const w = computeCardWidth();
            track.style.setProperty('--hub-card-width', `${w}px`);
            const centerOffset = (viewport.clientWidth - w) / 2;
            const translateX = centerOffset - (centerVisible * (w + g));
            track.style.transform = `translateX(${translateX}px)`;
            updateDots();
            updateButtons();
            positionButtons();
            updateActiveCard();
        };

        const goPrev = () => {
            const len = visibleSlides().length || 1;
            centerVisible = (centerVisible - 1 + len) % len;
            updateTransform();
        };
        const goNext = () => {
            const len = visibleSlides().length || 1;
            centerVisible = (centerVisible + 1) % len;
            updateTransform();
        };

        prevBtn.addEventListener('click', goPrev);
        nextBtn.addEventListener('click', goNext);
        viewport.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') goPrev(); if (e.key === 'ArrowRight') goNext(); });
        viewport.setAttribute('tabindex', '0');

        slides.forEach((s) => s.addEventListener('click', () => {
            const idx = visibleSlides().indexOf(s);
            if (idx === -1) return;
            if (idx !== centerVisible) { centerVisible = idx; updateTransform(); }
        }));

        window.addEventListener('resize', () => { buildDots(); updateTransform(); });

        const setHubCategory = (cat, scroll = false) => {
            slides.forEach((s) => {
                const isMatch = cat === 'all' || s.dataset.cat === cat;
                if (isMatch) s.removeAttribute('hidden'); else s.setAttribute('hidden', '');
            });
            document.querySelectorAll('.hub-tab').forEach((b) => {
                const isActive = b.dataset.hubCat === cat;
                b.classList.toggle('active', isActive);
                // Update button colors
                if (isActive) {
                    b.style.backgroundColor = '#a3e635'; // lime-400
                    b.style.color = '#111827'; // gray-900
                } else {
                    b.style.backgroundColor = '#f3f4f6'; // gray-100
                    b.style.color = '#374151'; // gray-700
                }
            });
            centerVisible = 0;
            buildDots();
            updateTransform();
            if (scroll) {
                const section = document.querySelector('#contact');
                if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        const updateActiveCard = () => {
            const vis = visibleSlides();
            vis.forEach((c) => c.classList.remove('active'));
            if (vis.length) {
                const idx = Math.min(Math.max(centerVisible, 0), vis.length - 1);
                vis[idx].classList.add('active');
            }
        };

        document.querySelectorAll('[data-hub-cat]').forEach((el) => {
            el.addEventListener('click', (e) => {
                const cat = el.getAttribute('data-hub-cat');
                setTimeout(() => setHubCategory(cat, true), 0);
            });
        });

        setHubCategory('showcase', false);

        function positionButtons() {
            if (!prevBtn || !nextBtn) return;
            const containerRect = hub.getBoundingClientRect();
            const refRect = viewport.getBoundingClientRect();
            const middle = refRect.top + refRect.height / 2 - containerRect.top;
            const topValue = `${middle}px`;
            prevBtn.style.top = topValue;
            nextBtn.style.top = topValue;
            prevBtn.style.transform = 'translateY(-50%)';
            nextBtn.style.transform = 'translateY(-50%)';
        }
    }

    document.querySelectorAll('img').forEach((img) => {
        img.setAttribute('draggable', 'false');
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    document.querySelectorAll('.logo-img, .partners-track img').forEach((img) => {
        img.addEventListener('contextmenu', (e) => e.preventDefault());
        img.addEventListener('selectstart', (e) => e.preventDefault());
        img.addEventListener('mousedown', (e) => e.preventDefault());
    });

    const waBtn = document.getElementById('waFabBtn');
    if (waBtn) {
        waBtn.addEventListener('click', () => {
            const number = waBtn.getAttribute('data-wa-number') || '';
            const text = waBtn.getAttribute('data-wa-text') || '';
            if (!number) return;
            const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank', 'noopener');
        });
    }
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const header = item.querySelector('.faq-header');
        const body = item.querySelector('.faq-body');
        if (!header || !body) return;
        // Initialize closed state
        body.style.maxHeight = null;
        body.style.opacity = '0';
        header.addEventListener('click', () => {
            const willOpen = !item.classList.contains('active');
            item.classList.toggle('active');
            if (willOpen) {
                body.style.maxHeight = body.scrollHeight + 'px';
                body.style.opacity = '1';
            } else {
                body.style.maxHeight = null;
                body.style.opacity = '0';
            }
        });
    });

    // Recalculate heights on resize for open FAQ items
    window.addEventListener('resize', () => {
        document.querySelectorAll('.faq-item.active .faq-body').forEach((body) => {
            body.style.maxHeight = body.scrollHeight + 'px';
        });
    });

    // Portfolio CTA Button - Gradient Border Animation
    const portfolioCtaBtn = document.getElementById('portfolioCtaBtn');
    if (portfolioCtaBtn) {
        // Set initial styles
        portfolioCtaBtn.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        portfolioCtaBtn.style.transition = 'all 0.3s ease';
        portfolioCtaBtn.style.position = 'relative';
        portfolioCtaBtn.style.background = 'transparent';
        portfolioCtaBtn.style.boxShadow = 'none';

        portfolioCtaBtn.addEventListener('mouseenter', function() {
            this.style.border = '2px solid transparent';
            this.style.background = 'linear-gradient(#1a1a1a, #1a1a1a) padding-box, linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd) border-box';
            this.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.3), 0 0 40px rgba(72, 219, 251, 0.2)';
            this.style.transform = 'translateY(-2px)';
        });

        portfolioCtaBtn.addEventListener('mouseleave', function() {
            this.style.border = '2px solid rgba(255, 255, 255, 0.3)';
            this.style.background = 'transparent';
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });
    }

    // Impact Stats Counter Animation
    const impactCounters = document.querySelectorAll('.impact-counter');
    let impactAnimated = false;

    const animateImpactCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000; 
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            counter.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        requestAnimationFrame(updateCounter);
    };

    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !impactAnimated) {
                impactAnimated = true;
                impactCounters.forEach(counter => {
                    animateImpactCounter(counter);
                });
            }
        });
    }, { threshold: 0.3 });

    const impactSection = document.querySelector('.impact-stats');
    if (impactSection) {
        impactObserver.observe(impactSection);
    }

    // Portfolio First Card Hover Animation
    const pfCards = document.querySelectorAll('.portfolio-first .pf-card');
    pfCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.borderColor = 'rgba(255,255,255,0.35)';
            card.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.20), 0 0 22px rgba(255,255,255,0.16), 0 12px 28px rgba(0,0,0,0.30)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.borderColor = 'rgba(255,255,255,0.16)';
            card.style.boxShadow = 'none';
        });
    });

    // Portfolio First Button Hover Animation
    const pfBtns = document.querySelectorAll('.portfolio-first .pf-btn');
    pfBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const currentTransform = btn.style.transform.replace('translateY(-50%)', '').trim();
            btn.style.transform = 'translateY(-50%) scale(1.08)';
            btn.style.borderColor = 'rgba(255,255,255,0.6)';
            btn.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.25), 0 0 18px rgba(255,255,255,0.18)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(-50%) scale(1)';
            btn.style.borderColor = 'rgba(255,255,255,0.35)';
            btn.style.boxShadow = 'none';
        });
    });
});
