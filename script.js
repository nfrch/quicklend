// QuickLend Website JavaScript

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
});

// Loan Calculator
function calculateLoan() {
    const principal = parseFloat(document.getElementById('loanAmount').value);
    const rate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const term = parseFloat(document.getElementById('loanTerm').value) * 12;

    if (principal && rate && term) {
        const monthly = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        const total = monthly * term;
        const interest = total - principal;

        document.getElementById('monthlyPayment').textContent = '$' + monthly.toFixed(2);
        document.getElementById('totalInterest').textContent = '$' + interest.toFixed(2);
        document.getElementById('totalAmount').textContent = '$' + total.toFixed(2);
    }
}

// Auto-calculate on input change
document.addEventListener('DOMContentLoaded', function() {
    const calculatorInputs = ['loanAmount', 'interestRate', 'loanTerm'];
    calculatorInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calculateLoan);
            input.addEventListener('change', calculateLoan);
        }
    });
    
    // Initial calculation
    calculateLoan();
});

// FAQ Toggle
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('.faq-icon');
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
                const icon = this.querySelector('.faq-icon');
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
        });
    });
});

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Loan Application Form
document.addEventListener('DOMContentLoaded', function() {
    const loanForm = document.getElementById('loanForm');
    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                loanType: document.getElementById('loanTypeSelect').value,
                requestedAmount: parseInt(document.getElementById('requestedAmount').value) || 0,
                income: parseInt(document.getElementById('income').value) || 0,
                employment: document.getElementById('employment').value,
                purpose: document.getElementById('purpose').value.trim(),
                terms: document.getElementById('terms').checked,
                timestamp: new Date().toISOString()
            };
            
            // Validation
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
                !formData.loanType || !formData.requestedAmount || !formData.income || 
                !formData.employment || !formData.terms) {
                showToast('Please fill in all required fields and accept the terms.', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }
            
            if (!validatePhone(formData.phone)) {
                showToast('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Submit form
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Create email content for loan application
            const subject = encodeURIComponent('New Loan Application from QuickLend Website');
            const emailBody = `
NEW LOAN APPLICATION
===================

Personal Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Loan Details:
Type: ${formData.loanType}
Requested Amount: $${formData.requestedAmount.toLocaleString()}
Annual Income: $${formData.income.toLocaleString()}
Employment Status: ${formData.employment}

Purpose: ${formData.purpose}

Application submitted: ${new Date(formData.timestamp).toLocaleString()}

Please contact this applicant within 24 hours.
            `.trim();
            
            const body = encodeURIComponent(emailBody);
            const mailtoLink = `mailto:quicklend.online@gmail.com?subject=${subject}&body=${body}`;
            
            // Try to open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showToast('Application submitted! Your email client should open to send the application to QuickLend.', 'success');
            this.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});

// Contact Form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('contactName').value.trim(),
                email: document.getElementById('contactEmail').value.trim(),
                subject: document.getElementById('contactSubject').value.trim(),
                message: document.getElementById('contactMessage').value.trim()
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showToast('Please fill in all fields.', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }
            
            // Submit form
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Create email content for contact message
            const subject = encodeURIComponent(`QuickLend Contact: ${formData.subject}`);
            const emailBody = `
CONTACT MESSAGE FROM QUICKLEND WEBSITE
=====================================

From: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Sent: ${new Date().toLocaleString()}
            `.trim();
            
            const body = encodeURIComponent(emailBody);
            const mailtoLink = `mailto:quicklend.online@gmail.com?subject=${subject}&body=${body}`;
            
            // Try to open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showToast('Message prepared! Your email client should open to send the message to QuickLend.', 'success');
            this.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }
});

// Currency input formatting (only for calculator)
document.addEventListener('DOMContentLoaded', function() {
    const calculatorInput = document.querySelector('#loanAmount');
    if (calculatorInput) {
        calculatorInput.addEventListener('blur', function(e) {
            const value = parseFloat(e.target.value.replace(/[^\d]/g, ''));
            if (!isNaN(value) && value > 0) {
                e.target.value = value.toLocaleString();
            }
        });
        
        calculatorInput.addEventListener('focus', function(e) {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
        });
    }
});

// Smooth scroll for all anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-sm');
        } else {
            navbar.classList.remove('bg-white/95', 'backdrop-blur-sm');
        }
        
        lastScrollTop = scrollTop;
    });
});

// Form input animations and validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Real-time validation
            if (this.type === 'email' && this.value) {
                if (validateEmail(this.value)) {
                    this.classList.remove('input-error');
                    this.classList.add('input-success');
                } else {
                    this.classList.remove('input-success');
                    this.classList.add('input-error');
                }
            }
            
            if (this.type === 'tel' && this.value) {
                if (validatePhone(this.value)) {
                    this.classList.remove('input-error');
                    this.classList.add('input-success');
                } else {
                    this.classList.remove('input-success');
                    this.classList.add('input-error');
                }
            }
        });
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Analytics and tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example implementation with Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track form submissions
document.addEventListener('DOMContentLoaded', function() {
    const loanForm = document.getElementById('loanForm');
    const contactForm = document.getElementById('contactForm');
    
    if (loanForm) {
        loanForm.addEventListener('submit', function() {
            trackEvent('loan_application_submitted', {
                loan_type: document.getElementById('loanTypeSelect').value,
                requested_amount: document.getElementById('requestedAmount').value
            });
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('contact_form_submitted', {
                subject: document.getElementById('contactSubject').value
            });
        });
    }
});

// Performance monitoring
document.addEventListener('DOMContentLoaded', function() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_load_time', { load_time: loadTime });
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Email functionality using mailto links

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('QuickLend website loaded successfully!');
    
    // Add fade-in animation to sections on scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => sectionObserver.observe(section));
});