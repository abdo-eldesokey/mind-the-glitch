// Create floating particles for hero background
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 12 + 8}px;
            height: ${Math.random() * 12 + 8}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            z-index: 0;
        `;
        hero.appendChild(particle);
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles
    createFloatingParticles();
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for fade-in animations
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

    // Observe all content sections
    const sections = document.querySelectorAll('.content-section, .abstract-section, .teaser-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Add hover effects to author links
    const authorLinks = document.querySelectorAll('.author');
    authorLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Removed parallax effect for normal scrolling behavior
});

// Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-advance carousel every 10 seconds
setInterval(() => {
    changeSlide(1);
}, 10000);

// Benchmark carousel functionality
let currentBenchmarkSlideIndex = 0;
const benchmarkSlides = document.querySelectorAll('.benchmark-slide');
const benchmarkIndicators = document.querySelectorAll('.benchmark-indicators .indicator');

function showBenchmarkSlide(index) {
    // Hide all benchmark slides
    benchmarkSlides.forEach(slide => slide.classList.remove('active'));
    benchmarkIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current benchmark slide
    if (benchmarkSlides[index]) {
        benchmarkSlides[index].classList.add('active');
        benchmarkIndicators[index].classList.add('active');
    }
}

function changeBenchmarkSlide(direction) {
    currentBenchmarkSlideIndex += direction;
    
    if (currentBenchmarkSlideIndex >= benchmarkSlides.length) {
        currentBenchmarkSlideIndex = 0;
    } else if (currentBenchmarkSlideIndex < 0) {
        currentBenchmarkSlideIndex = benchmarkSlides.length - 1;
    }
    
    showBenchmarkSlide(currentBenchmarkSlideIndex);
}

function currentBenchmarkSlide(index) {
    currentBenchmarkSlideIndex = index - 1;
    showBenchmarkSlide(currentBenchmarkSlideIndex);
}

// Auto-advance benchmark carousel every 12 seconds
setInterval(() => {
    changeBenchmarkSlide(1);
}, 12000);

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
