// Global variables
let activeSlide = 0;
const totalSlides = 3;
let slideInterval;

// Special menu carousel variables
let activeSpecialSlide = 0;
const totalSpecialSlides = 3;
let specialSlideInterval;

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeDropdowns();
    initializeSpecialCarousel();
    
    // Add touch event listeners to carousel (after DOM is ready)
    initializeTouchEvents();
    
    // Initialize animations
    initializeAnimations();
});

// Initialize touch events
function initializeTouchEvents() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', handleTouchStart, false);
        carousel.addEventListener('touchend', handleTouchEnd, false);
    }
}

// Initialize animations and observers
function initializeAnimations() {
    // Initialize scroll animations
    animateOnScroll();
    
    // Initialize pie chart observer
    observePieCharts();
    
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('show');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('show');
    }
}

// Dropdown menu functions
function toggleDropdown(sectionId) {
    const content = document.getElementById(sectionId + '-content');
    const arrow = document.getElementById(sectionId + '-arrow');
    
    if (!content || !arrow) return;
    
    // Close all other dropdowns
    const allContents = document.querySelectorAll('.dropdown-content');
    const allArrows = document.querySelectorAll('.dropdown-arrow');
    
    allContents.forEach(item => {
        if (item.id !== sectionId + '-content') {
            item.classList.remove('open');
            item.style.maxHeight = '0px';
        }
    });
    
    allArrows.forEach(item => {
        if (item.id !== sectionId + '-arrow') {
            item.classList.remove('rotated');
        }
    });
    
    // Toggle current dropdown with dynamic height calculation
    if (content.classList.contains('open')) {
        // Close dropdown
        content.style.maxHeight = '0px';
        content.classList.remove('open');
        arrow.classList.remove('rotated');
    } else {
        // Open dropdown - calculate actual content height
        content.style.maxHeight = 'none';
        content.style.overflow = 'visible';
        const actualHeight = content.scrollHeight;
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
        
        // Force reflow then animate to actual height
        content.offsetHeight;
        content.style.maxHeight = actualHeight + 'px';
        content.classList.add('open');
        arrow.classList.add('rotated');
        
        // After animation completes, remove height restriction
        setTimeout(() => {
            if (content.classList.contains('open')) {
                content.style.maxHeight = 'none';
                content.style.overflow = 'visible';
            }
        }, 500);
    }
}

function initializeDropdowns() {
    // Non aggiungere event listeners ai dropdown buttons
    // Lascia che l'onclick nell'HTML gestisca tutto
    // Questa funzione può essere usata per altre inizializzazioni se necessario
}

// Carousel functions
function initializeCarousel() {
    if (document.getElementById('carouselTrack')) {
        startSlideShow();
        updateCarousel();
    }
}

function nextSlide() {
    activeSlide = (activeSlide + 1) % totalSlides;
    updateCarousel();
    resetSlideShow();
}

function prevSlide() {
    activeSlide = (activeSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetSlideShow();
}

function currentSlideGo(slideIndex) {
    activeSlide = slideIndex - 1;
    updateCarousel();
    resetSlideShow();
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!track) return; // Prevents error if element is missing
    
    // Update track position
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    
    // Update active states
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === activeSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeSlide);
    });
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideShow() {
    clearInterval(slideInterval);
    startSlideShow();
}

// Carousel dot navigation
function goToSlideNumber(slideIndex) {
    currentSlideGo(slideIndex);
}

// Special Menu Carousel Functions
function initializeSpecialCarousel() {
    if (document.getElementById('specialCarouselTrack')) {
        startSpecialSlideShow();
        updateSpecialCarousel();
        animatePieCharts();
    }
}

function nextSpecialSlide() {
    activeSpecialSlide = (activeSpecialSlide + 1) % totalSpecialSlides;
    updateSpecialCarousel();
    resetSpecialSlideShow();
    animateCurrentPieChart();
}

function prevSpecialSlide() {
    activeSpecialSlide = (activeSpecialSlide - 1 + totalSpecialSlides) % totalSpecialSlides;
    updateSpecialCarousel();
    resetSpecialSlideShow();
    animateCurrentPieChart();
}

function goToSpecialSlide(slideIndex) {
    activeSpecialSlide = slideIndex - 1;
    updateSpecialCarousel();
    resetSpecialSlideShow();
    animateCurrentPieChart();
}

function updateSpecialCarousel() {
    const track = document.getElementById('specialCarouselTrack');
    const slides = document.querySelectorAll('.special-slide');
    const dots = document.querySelectorAll('.special-dot');
    
    if (!track) return;
    
    // Update track position
    track.style.transform = `translateX(-${activeSpecialSlide * 100}%)`;
    
    // Update active states
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === activeSpecialSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeSpecialSlide);
    });
}

function startSpecialSlideShow() {
    specialSlideInterval = setInterval(nextSpecialSlide, 6000);
}

function resetSpecialSlideShow() {
    clearInterval(specialSlideInterval);
    startSpecialSlideShow();
}

// Pie Chart Animation Functions
function animatePieCharts() {
    const pieCharts = document.querySelectorAll('.pie-chart');
    pieCharts.forEach(chart => {
        const percentage = parseInt(chart.dataset.percentage);
        const circle = chart.querySelector('.progress-circle');
        if (circle) {
            animatePieChart(circle, percentage);
        }
    });
}

function animateCurrentPieChart() {
    const currentSlide = document.querySelectorAll('.special-slide')[activeSpecialSlide];
    if (currentSlide) {
        const pieChart = currentSlide.querySelector('.pie-chart');
        if (pieChart) {
            const percentage = parseInt(pieChart.dataset.percentage);
            const circle = pieChart.querySelector('.progress-circle');
            if (circle) {
                // Reset animation
                circle.style.strokeDashoffset = '251.33';
                setTimeout(() => {
                    animatePieChart(circle, percentage);
                }, 100);
            }
        }
    }
}

function animatePieChart(circle, percentage) {
    const circumference = 2 * Math.PI * 80; // radius = 80
    const offset = circumference - (percentage / 100) * circumference;
    
    // Set initial state
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    
    // Animate to target
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 500);
}

// Intersection Observer for pie chart animations when scrolling
function observePieCharts() {
    const pieCharts = document.querySelectorAll('.pie-chart');
    
    if (pieCharts.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = parseInt(entry.target.dataset.percentage);
                const circle = entry.target.querySelector('.progress-circle');
                if (circle) {
                    animatePieChart(circle, percentage);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    pieCharts.forEach(chart => {
        observer.observe(chart);
    });
}

// Scroll animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.dropdown-section, .menu-item, .contact-item');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    animateOnScroll();
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    }
}, 10);

// Touch/swipe support for carousel
let startX = 0;
let endX = 0;

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Window events
window.addEventListener('scroll', debouncedScrollHandler);

window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Add loading animation styles
window.addEventListener('load', function() {
    // Add styles if not already present
    if (!document.getElementById('dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .navbar {
                transition: all 0.3s ease;
            }
            
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
});