/**
 * GENZIFY Digital Marketing Agency - Core Script
 * Functionality: Floating Navbar, Hero Performance Tab Switcher, Animated Counters, Scroll Reveals & Form API Integration
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Floating Navbar Scroll & Active Section Highlighting
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-item-link');
    const sections = document.querySelectorAll('section[id]');

    const handleNavbarScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking
        let currentId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // ----------------------------------------------------------------------
    // 2. Mobile Drawer Navigation Toggle
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileToggle.classList.toggle('open', isOpen);
            mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.querySelectorAll('.mobile-menu-links a, .mobile-menu-footer a').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                mobileToggle.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. Interactive Hero Digital Performance Interface Tabs
    // ----------------------------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const metricLabel1 = document.getElementById('metric-label-1');
    const metricVal1 = document.getElementById('metric-val-1');
    const metricLabel2 = document.getElementById('metric-label-2');
    const metricVal2 = document.getElementById('metric-val-2');
    const graphTitle = document.getElementById('graph-title');
    const graphPercentage = document.getElementById('graph-percentage');
    const graphFillBar = document.getElementById('graph-fill-bar');
    const panelDesc = document.getElementById('panel-desc');

    const tabData = {
        marketing: {
            lbl1: 'Campaign Reach Growth', val1: '+340%',
            lbl2: 'Ad ROAS Benchmark', val2: '4.2x',
            gTitle: 'Digital Lead Velocity Index', gPct: '88%', gFill: '88%',
            desc: 'Data-driven digital marketing campaigns optimized for multi-platform customer acquisition, maximum conversion efficiency, and continuous audience expansion.'
        },
        seo: {
            lbl1: 'Organic Keyword Lift', val1: '+240%',
            lbl2: 'Domain Authority Rating', val2: '78/100',
            gTitle: 'Search Visibility Capture Index', gPct: '94%', gFill: '94%',
            desc: 'Technical SEO overhauls, semantic content structuring, and high-authority link acquisition driving top-rank search placements.'
        },
        webdev: {
            lbl1: 'Core Web Vitals Score', val1: '99/100',
            lbl2: 'Conversion Rate Lift', val2: '+92%',
            gTitle: 'Page Load Optimization Index', gPct: '98%', gFill: '98%',
            desc: 'Custom hand-coded web applications engineered for sub-second page loads, responsive cross-device layout precision, and maximum lead capture.'
        },
        design: {
            lbl1: 'Visual Engagement Lift', val1: '+180%',
            lbl2: 'Ad Impression Volume', val2: '1.2M+',
            gTitle: 'Brand Resonance & CTR Index', gPct: '91%', gFill: '91%',
            desc: 'High-impact poster designs, promotional campaign graphics, and brand assets crafted to capture attention and communicate authority.'
        }
    };

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const tabKey = btn.getAttribute('data-tab');
            const data = tabData[tabKey];

            if (data && metricLabel1) {
                // Smooth transition effect
                metricVal1.style.opacity = '0';
                metricVal2.style.opacity = '0';
                
                setTimeout(() => {
                    metricLabel1.textContent = data.lbl1;
                    metricVal1.textContent = data.val1;
                    metricLabel2.textContent = data.lbl2;
                    metricVal2.textContent = data.val2;
                    graphTitle.textContent = data.gTitle;
                    graphPercentage.textContent = data.gPct;
                    graphFillBar.style.width = data.gFill;
                    panelDesc.textContent = data.desc;

                    metricVal1.style.opacity = '1';
                    metricVal2.style.opacity = '1';
                }, 150);
            }
        });
    });

    // ----------------------------------------------------------------------
    // 4. Scroll Reveal Animations & Animated Statistics
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Animated Counters
    const statElements = document.querySelectorAll('.h-stat-num');
    let animatedStats = false;

    const animateStats = () => {
        statElements.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 1800;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.firstChild.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.firstChild.textContent = Math.ceil(current);
                }
            }, stepTime);
        });
    };

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animatedStats) {
                animatedStats = true;
                animateStats();
            }
        }, { threshold: 0.2 });
        statsObserver.observe(heroSection);
    }

    // ----------------------------------------------------------------------
    // 5. Contact Form Validation & API Submission
    // ----------------------------------------------------------------------
    const projectForm = document.getElementById('project-form');
    const formAlert = document.getElementById('form-alert');
    const submitBtn = document.getElementById('submit-btn');

    if (projectForm) {
        const checkSubmitState = () => {
            if (sessionStorage.getItem('formSubmitted') === 'true') {
                sessionStorage.removeItem('formSubmitted');
                projectForm.reset();
                showAlert('success', 'Thank you! Your project request has been submitted successfully. Our strategy team will be in touch within 24 hours!');
            }
        };

        window.addEventListener('focus', checkSubmitState);
        checkSubmitState();

        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            clearErrors();
            formAlert.style.display = 'none';

            const fullName = document.getElementById('fullName').value.trim();
            const businessName = document.getElementById('businessName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            if (!fullName) {
                showError('fullName', 'Full name is required.');
                isValid = false;
            }

            if (!email || !validateEmail(email)) {
                showError('email', 'Valid email address is required.');
                isValid = false;
            }

            if (!service) {
                showError('service', 'Please select a required service.');
                isValid = false;
            }

            if (!message) {
                showError('message', 'Message details are required.');
                isValid = false;
            }

            if (!isValid) return;

            // Generate WhatsApp message and redirect URL
            const msg = `New Project Enquiry\n\nFull Name: ${fullName}\nBusiness Name: ${businessName || 'N/A'}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nRequired Service: ${service}\nMessage / Project Goals: ${message}`;
            const whatsappUrl = `https://wa.me/7200353643?text=${encodeURIComponent(msg)}`;

            // Preserve submitted state
            sessionStorage.setItem('formSubmitted', 'true');

            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }

    function showError(fieldId, msg) {
        const field = document.getElementById(fieldId);
        if (field && field.parentElement) {
            field.parentElement.classList.add('error');
            const errSpan = document.getElementById(`err-${fieldId}`);
            if (errSpan) errSpan.textContent = msg;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showAlert(type, msg) {
        formAlert.textContent = msg;
        formAlert.className = `status-alert ${type}`;
        formAlert.style.display = 'block';
    }

    // Gmail Reusable Smart Click Handler
    function openGmailCompose(e) {
        if (e) e.preventDefault();
        const email = "hello.genzify@gmail.com";
        const desktopUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=" + email;
        const fallbackUrl = "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=" + email;
        const iosDeepLink = "googlegmail://co?to=" + email;
        const androidDeepLink = "intent://compose?to=" + email + "#Intent;scheme=mailto;package=com.google.android.gm;end";
        
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isAndroid = /Android/i.test(ua);
        const isIOS = /iPhone|iPad|iPod/i.test(ua);
        
        if (isAndroid) {
            let appOpened = false;
            const handleVisibilityChange = () => {
                appOpened = true;
            };
            window.addEventListener('blur', handleVisibilityChange, { once: true });
            window.addEventListener('visibilitychange', handleVisibilityChange, { once: true });
            
            window.location.href = androidDeepLink;
            
            setTimeout(() => {
                window.removeEventListener('blur', handleVisibilityChange);
                window.removeEventListener('visibilitychange', handleVisibilityChange);
                if (!appOpened) {
                    window.open(fallbackUrl, '_blank');
                }
            }, 1500);
        } else if (isIOS) {
            let appOpened = false;
            const handleVisibilityChange = () => {
                appOpened = true;
            };
            window.addEventListener('blur', handleVisibilityChange, { once: true });
            window.addEventListener('visibilitychange', handleVisibilityChange, { once: true });
            
            window.location.href = iosDeepLink;
            
            setTimeout(() => {
                window.removeEventListener('blur', handleVisibilityChange);
                window.removeEventListener('visibilitychange', handleVisibilityChange);
                if (!appOpened) {
                    window.open(fallbackUrl, '_blank');
                }
            }, 1500);
        } else {
            // Desktop / Laptop
            window.open(desktopUrl, '_blank');
        }
    }

    const gmailLinks = document.querySelectorAll('.gmail-link');
    gmailLinks.forEach(link => {
        link.addEventListener('click', openGmailCompose);
    });

    // Service Card Icon 360 Rotation Click Animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const iconWrapper = card.querySelector('.service-icon');
            if (iconWrapper) {
                iconWrapper.classList.remove('animate-rotate');
                void iconWrapper.offsetWidth; // Force reflow
                iconWrapper.classList.add('animate-rotate');
                
                iconWrapper.addEventListener('animationend', () => {
                    iconWrapper.classList.remove('animate-rotate');
                }, { once: true });
            }
        });
    });
});

// Helper for preselecting service from links
function preselectService(serviceName) {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }
}
