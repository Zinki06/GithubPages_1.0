document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const slideCounter = document.getElementById('slide-counter');
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    let isTransitioning = false;

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    function showSlide(index, direction = 'next') {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Hide the current slide with animation
        const currentSlide = document.querySelector('.slide.active');
        if (currentSlide) {
            currentSlide.style.transform = direction === 'next' ? 'translateX(-30px)' : 'translateX(30px)';
            currentSlide.style.opacity = '0';
            
            setTimeout(() => {
                currentSlide.classList.remove('active');
                currentSlide.style.transform = '';
                currentSlide.style.opacity = '';
            }, 300);
        }

        // Show the new slide with animation
        setTimeout(() => {
            slides[index].classList.add('active');
            currentSlideIndex = index;

            // Update slide counter with animation
            if (slideCounter) {
                slideCounter.style.transform = 'scale(0.8)';
                slideCounter.style.opacity = '0.5';
                
                setTimeout(() => {
                    slideCounter.textContent = `${index + 1} / ${totalSlides}`;
                    slideCounter.style.transform = 'scale(1)';
                    slideCounter.style.opacity = '1';
                }, 150);
            }
            
            // Update URL hash
            history.replaceState(null, null, `#${index + 1}`);
            
            // Reset transition flag
            setTimeout(() => {
                isTransitioning = false;
            }, 100);
        }, 150);
    }

    function nextSlide() {
        if (isTransitioning) return;
        const nextIndex = (currentSlideIndex + 1) % totalSlides;
        showSlide(nextIndex, 'next');
    }

    function prevSlide() {
        if (isTransitioning) return;
        const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex, 'prev');
    }

    function goToSlide(slideNumber) {
        if (isTransitioning || slideNumber < 1 || slideNumber > totalSlides) return;
        const direction = slideNumber > currentSlideIndex + 1 ? 'next' : 'prev';
        showSlide(slideNumber - 1, direction);
    }

    // Button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        nextBtn.addEventListener('mouseenter', () => {
            nextBtn.style.transform = 'translateY(-2px) scale(1.05)';
        });
        nextBtn.addEventListener('mouseleave', () => {
            nextBtn.style.transform = '';
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        prevBtn.addEventListener('mouseenter', () => {
            prevBtn.style.transform = 'translateY(-2px) scale(1.05)';
        });
        prevBtn.addEventListener('mouseleave', () => {
            prevBtn.style.transform = '';
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
            case 'Escape':
                // Toggle fullscreen mode
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    document.documentElement.requestFullscreen();
                }
                break;
        }
        
        // Number key navigation (1-9)
        if (e.key >= '1' && e.key <= '9') {
            const slideNum = parseInt(e.key);
            if (slideNum <= totalSlides) {
                e.preventDefault();
                goToSlide(slideNum);
            }
        }
    });

    // Touch/swipe support
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < minSwipeDistance) return;
        
        if (swipeDistance > 0) {
            // Swipe right - previous slide
            prevSlide();
        } else {
            // Swipe left - next slide
            nextSlide();
        }
    }

    // Mouse wheel navigation
    let wheelTimeout;
    document.addEventListener('wheel', (e) => {
        if (isTransitioning) return;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                nextSlide();
            } else if (e.deltaY < 0) {
                prevSlide();
            }
        }, 50);
    }, { passive: true });

    // Handle hash changes
    window.addEventListener('hashchange', () => {
        const slideNumber = parseInt(location.hash.substring(1), 10);
        if (!isNaN(slideNumber) && slideNumber > 0 && slideNumber <= totalSlides) {
            goToSlide(slideNumber);
        }
    });

    // Presentation mode (F5 or F11)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F5' || e.key === 'F11') {
            e.preventDefault();
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            }
        }
    });

    // Add slide transition style
    const style = document.createElement('style');
    style.textContent = `
        #slide-counter {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .slide {
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .navigation button {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);

    // Initial setup
    const initialSlideNumber = parseInt(location.hash.substring(1), 10);
    if (!isNaN(initialSlideNumber) && initialSlideNumber > 0 && initialSlideNumber <= totalSlides) {
        // Set initial slide without animation
        slides[initialSlideNumber - 1].classList.add('active');
        currentSlideIndex = initialSlideNumber - 1;
        if (slideCounter) {
            slideCounter.textContent = `${initialSlideNumber} / ${totalSlides}`;
        }
    } else {
        // Start with first slide
        slides[0].classList.add('active');
        currentSlideIndex = 0;
        if (slideCounter) {
            slideCounter.textContent = `1 / ${totalSlides}`;
        }
        history.replaceState(null, null, '#1');
    }

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
    }, 100);

    // Preload next/previous slides for better performance
    function preloadSlides() {
        const nextIndex = (currentSlideIndex + 1) % totalSlides;
        const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        
        [slides[nextIndex], slides[prevIndex]].forEach(slide => {
            const images = slide.querySelectorAll('img');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        });
    }

    // Call preload on slide change
    document.addEventListener('slideChanged', preloadSlides);
}); 