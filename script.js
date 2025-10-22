// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageId + '-page');
    if (selectedPage) {
        selectedPage.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Update selector
    document.getElementById('pageSelector').value = pageId;
    
    // Close mobile navbar if open
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
    }
}

// Page selector change handler
document.getElementById('pageSelector').addEventListener('change', function() {
    showPage(this.value);
});

// Scroll to stats section
function scrollToStats() {
    showPage('home');
    setTimeout(() => {
        const statsSection = document.getElementById('stats-section');
        if (statsSection) {
            statsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Login Form Handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;
    
    // Simple validation
    if (email && password) {
        closeModal('loginModal');
        
        // Show notification
        showNotification('Login successful! Welcome back.', 'success');
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
            if (role === 'donor') {
                showPage('donor');
            } else if (role === 'ngo') {
                showPage('ngo');
            } else if (role === 'admin') {
                showPage('admin');
            }
        }, 1000);
    }
}

// Register Form Handler
function handleRegister(event) {
    event.preventDefault();
    
    const role = document.getElementById('registerRole').value;
    
    closeModal('registerModal');
    
    // Show notification
    showNotification('Registration successful! Please login to continue.', 'success');
    
    // Open login modal after 2 seconds
    setTimeout(() => {
        openModal('loginModal');
        document.getElementById('loginRole').value = role;
    }, 2000);
}

// Donation Form Handler
function handleDonation(event) {
    event.preventDefault();
    
    closeModal('donationModal');
    
    showNotification('Donation created successfully! Nearby NGOs have been notified.', 'success');
    
    // Refresh donor dashboard
    setTimeout(() => {
        showPage('donor');
    }, 1500);
}

// Contact Form Handler
function handleContact(event) {
    event.preventDefault();
    
    showNotification('Thank you for contacting us! We will get back to you soon.', 'success');
    
    event.target.reset();
}

// Accept Donation (NGO)
function acceptDonation(donationId) {
    showNotification('Donation accepted successfully! The donor has been notified.', 'success');
    
    // In a real app, this would update the backend
    setTimeout(() => {
        location.reload();
    }, 2000);
}

// Verify NGO (Admin)
function verifyNGO(ngoId) {
    if (confirm('Are you sure you want to verify this NGO?')) {
        showNotification('NGO verified successfully! They can now accept donations.', 'success');
        
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}

// Reject NGO (Admin)
function rejectNGO(ngoId) {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
        showNotification('NGO registration rejected. They have been notified.', 'info');
        
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'var(--secondary-green)' : type === 'error' ? '#dc3545' : 'var(--primary-yellow)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate numbers on stats cards (when visible)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            // Animate stat numbers
            if (entry.target.classList.contains('stat-number')) {
                const finalValue = parseInt(entry.target.textContent.replace(/,/g, ''));
                animateValue(entry.target, 0, finalValue, 2000);
            }
        }
    });
}, observerOptions);

// Observe all stat numbers
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\D/g, ''));
}

// Memory storage for demo purposes (NO localStorage/sessionStorage)
const appState = {
    isLoggedIn: false,
    userRole: null,
    userData: null
};

function saveToMemory(key, value) {
    appState[key] = value;
}

function getFromMemory(key) {
    return appState[key] || null;
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Show home page by default
    showPage('home');
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Check if user is logged in (demo)
    const isLoggedIn = getFromMemory('isLoggedIn');
    if (isLoggedIn) {
        const userRole = getFromMemory('userRole');
        if (userRole) {
            // Auto-login user
            showPage(userRole);
        }
    }
    
    console.log('%cReServe Website Loaded Successfully!', 'color: #4a6741; font-size: 16px; font-weight: bold;');
    console.log('%cThis is a demo website. All data is simulated.', 'color: #d4af37; font-size: 12px;');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    // Handle navigation if needed
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Export functions for inline onclick handlers
window.showPage = showPage;
window.scrollToStats = scrollToStats;
window.openModal = openModal;
window.closeModal = closeModal;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleDonation = handleDonation;
window.handleContact = handleContact;
window.acceptDonation = acceptDonation;
window.verifyNGO = verifyNGO;
window.rejectNGO = rejectNGO;
