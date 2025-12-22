// Emerald Compass - Interactive 27 Principles Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Emerald Compass - 27 Principles website loaded');
    
    // Initialize pagination
    initializePagination();
    
    // Add hover effects to principle cards
    initializeCardEffects();
    
    // Initialize particle animation
    initializeParticles();
    
    // Add click event to download button
    initializeDownloadButton();
    
    // Add scroll animation
    initializeScrollAnimation();
});

// Pagination functionality
let currentPage = 1;
const totalPages = 5;

function initializePagination() {
    // Show first page by default
    changePage(1);
    
    // Update page buttons state
    updatePaginationButtons();
}

function changePage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    // Hide all pages
    document.querySelectorAll('.principles-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageNumber;
        
        // Update page info
        document.getElementById('current-page').textContent = pageNumber;
        
        // Scroll to principles section
        scrollToPrinciples();
        
        // Update button states
        updatePaginationButtons();
        
        // Add animation effect
        animatePageTransition();
    }
}

function updatePaginationButtons() {
    const buttons = document.querySelectorAll('.page-btn');
    buttons.forEach(button => {
        const pageNum = parseInt(button.textContent);
        button.classList.toggle('active', pageNum === currentPage);
    });
}

function scrollToPrinciples() {
    const principlesSection = document.querySelector('.principles-container');
    if (principlesSection) {
        principlesSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

function animatePageTransition() {
    const activePage = document.querySelector('.principles-page.active');
    if (activePage) {
        activePage.style.animation = 'none';
        setTimeout(() => {
            activePage.style.animation = 'fadeInUp 0.5s ease-out';
        }, 10);
    }
}

// Card hover effects
function initializeCardEffects() {
    const cards = document.querySelectorAll('.principle-card');
    
    cards.forEach(card => {
        // Add click event
        card.addEventListener('click', function() {
            const principleNumber = this.querySelector('.principle-number').textContent;
            const principleName = this.querySelector('.principle-name').textContent;
            showPrincipleDetail(principleNumber, principleName);
        });
        
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const principleNumber = this.querySelector('.principle-number').textContent;
                const principleName = this.querySelector('.principle-name').textContent;
                showPrincipleDetail(principleNumber, principleName);
            }
        });
    });
}

function showPrincipleDetail(number, name) {
    console.log(`Principle ${number}: ${name}`);
    
    // Create modal or show detail (can be expanded)
    const detail = `
        <div class="principle-detail">
            <h3>Principle ${number}: ${name}</h3>
            <p>Detailed explanation would appear here...</p>
        </div>
    `;
    
    // For now, just show an alert
    alert(`Principle ${number}: ${name}\n\nDetailed view will be implemented in the next version.`);
}

// Particle animation
function initializeParticles() {
    const particles = document.querySelectorAll('.emerald-particle');
    
    particles.forEach((particle, index) => {
        // Randomize animation delay
        const randomDelay = Math.random() * 5;
        particle.style.animationDelay = `${randomDelay}s`;
        
        // Randomize size
        const randomSize = 2 + Math.random() * 3;
        particle.style.width = `${randomSize}px`;
        particle.style.height = `${randomSize}px`;
    });
}

// Download button functionality
function initializeDownloadButton() {
    const downloadBtn = document.querySelector('.cta-button[href="#"]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            simulateDownload();
        });
    }
}

function simulateDownload() {
    // Create a loading effect
    const originalText = this.textContent;
    this.textContent = 'Preparing Download...';
    this.style.animation = 'none';
    
    setTimeout(() => {
        this.textContent = 'Download Complete!';
        this.style.background = '#2E8B57';
        this.style.color = 'white';
        
        // Show download message
        showNotification('Guide downloaded successfully! Check your downloads folder.');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
            this.style.color = '';
            this.style.animation = 'pulse 2s ease-in-out infinite';
        }, 3000);
    }.bind(this), 2000);
}

// Scroll animation
function initializeScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all principle cards and features
    document.querySelectorAll('.principle-card, .feature').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2E8B57;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1000;
        animation: fadeInDown 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOutUp 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Left/Right arrows for pagination
    if (e.key === 'ArrowLeft') {
        changePage(currentPage - 1);
    } else if (e.key === 'ArrowRight') {
        changePage(currentPage + 1);
    }
});

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .principle-card.animated {
        animation: fadeInUp 0.6s ease-out;
    }
    
    .feature.animated {
        animation: fadeInUp 0.8s ease-out;
    }
    
    .notification {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
`;
document.head.appendChild(style);
