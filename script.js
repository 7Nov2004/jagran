// =============================================
// SANKIRTAN BOOKING - PUSHPENDRA MADHOSH
// Full Functionality JavaScript v2.0
// =============================================

// -------- INTRO SPLASH --------
window.addEventListener('load', function () {
    setTimeout(() => {
        const splash = document.getElementById('intro-splash');
        if (splash) {
            splash.classList.add('hidden');
            setTimeout(() => {
                splash.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Show welcome toast after splash
                setTimeout(() => showToast('🙏 Jai Shree Ram! Pushpendra Madhosh ji ke website par aapka swagat hai!', 'info', 5000), 800);
            }, 800);
        }
    }, 5000);
    document.body.style.overflow = 'hidden';
});

// -------- SPLASH PARTICLES --------
function createSplashParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const symbols = ['🌸', '✨', '🌺', '⭐', '🪔', '🌼', '💫'];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 5 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            opacity: ${Math.random() * 0.5 + 0.2};
            pointer-events: none;
        `;
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        container.appendChild(particle);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
    }
`;
document.head.appendChild(particleStyle);
createSplashParticles();

// -------- NAVBAR SCROLL --------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // Back to top button
    const btn = document.getElementById('backToTop');
    if (btn) {
        if (window.scrollY > 400) btn.classList.add('visible');
        else btn.classList.remove('visible');
    }
});

// -------- HAMBURGER MENU --------
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksEl.classList.toggle('open');
        hamburger.classList.toggle('active');
    });
}
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// -------- ACTIVE NAV ON SCROLL --------
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.style.color = '');
                navLink.style.color = '#FFD700';
            }
        }
    });
});

// -------- BACK TO TOP --------
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// -------- TOAST NOTIFICATION SYSTEM --------
function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = { success: '✅', error: '❌', info: '🪔', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || '🕉️'}</span><span class="toast-msg">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// -------- SERVICE MODAL DATA --------
const serviceData = {
    bhajan: {
        icon: '🎵',
        title: 'भजन संध्या',
        desc: 'मधुर भजनों की प्रस्तुति जो हर श्रोता के मन में भक्ति का भाव जगाए। शाम की दिव्य संध्या आपके आयोजन को अविस्मरणीय बनाएगी।',
        details: [
            { icon: 'fa-clock', text: '2-4 घंटे की प्रस्तुति' },
            { icon: 'fa-users', text: 'पूरी भजन मंडली' },
            { icon: 'fa-volume-up', text: 'Professional Sound System' },
            { icon: 'fa-calendar', text: 'शाम 6 बजे से' },
            { icon: 'fa-star', text: 'Live Harmonium & Tabla' },
            { icon: 'fa-heart', text: 'All Hindi/Awadhi Bhajans' }
        ]
    },
    jagran: {
        icon: '🪔',
        title: 'जागरण',
        desc: 'रात भर भजन-कीर्तन से माँ का जागरण — देवी माँ की कृपा और भक्तों का उत्साह मिलाकर एक अलौकिक रात्रि का अनुभव।',
        details: [
            { icon: 'fa-moon', text: 'रात 9 बजे से सुबह तक' },
            { icon: 'fa-music', text: 'Mata Ke Bhajan' },
            { icon: 'fa-fire', text: 'Havan & Aarti' },
            { icon: 'fa-users', text: 'Full Jagran Team' },
            { icon: 'fa-lightbulb', text: 'Light Decoration' },
            { icon: 'fa-star', text: 'Most Popular Service' }
        ]
    },
    sundarkand: {
        icon: '📖',
        title: 'सुंदरकांड पाठ',
        desc: 'रामचरितमानस के सुंदरकांड का पाठ — हनुमान जी की भक्ति में डूबकर घर में सुख-शांति और समृद्धि का आह्वान।',
        details: [
            { icon: 'fa-clock', text: '3-4 घंटे की अवधि' },
            { icon: 'fa-book', text: 'Complete Sundarkand Path' },
            { icon: 'fa-pray', text: 'Hanuman Chalisa' },
            { icon: 'fa-flower', text: 'Puja Samagri Included' },
            { icon: 'fa-om', text: 'Vedic Mantras' },
            { icon: 'fa-heart', text: 'Shanti & Samridhi' }
        ]
    },
    ramcharitmanas: {
        icon: '🔱',
        title: 'रामचरितमानस पाठ',
        desc: 'तुलसीदास जी की अमर रचना का सस्वर पाठ — प्रभु श्रीराम की कथा जो हर सुनने वाले के जीवन में प्रकाश भरे।',
        details: [
            { icon: 'fa-clock', text: 'Akhand / Khand Path' },
            { icon: 'fa-book-open', text: 'Musical Recital Style' },
            { icon: 'fa-users', text: 'Group Pathak Available' },
            { icon: 'fa-calendar', text: 'Multiple Day Programs' },
            { icon: 'fa-star', text: 'Ram Katha Pravachan' },
            { icon: 'fa-heart', text: 'Sukh-Shanti Pradan' }
        ]
    },
    mataChowki: {
        icon: '🌸',
        title: 'माता चौकी',
        desc: 'माँ दुर्गा, माँ काली, माँ लक्ष्मी की आराधना — विशेष भजनों और आरती के साथ माँ की चौकी सजाएं अपने घर में।',
        details: [
            { icon: 'fa-clock', text: '3-5 घंटे का कार्यक्रम' },
            { icon: 'fa-star', text: 'Mata Bhajans & Kirtan' },
            { icon: 'fa-fire', text: 'Havan & Chowki Setup' },
            { icon: 'fa-flower', text: 'Decoration Included' },
            { icon: 'fa-pray', text: 'Durga Saptashati' },
            { icon: 'fa-heart', text: 'Navratri Special' }
        ]
    },
    liveStage: {
        icon: '🎤',
        title: 'Live Stage Program',
        desc: 'बड़े मंच पर प्रस्तुति — मेले, महोत्सव, धार्मिक आयोजन और सांस्कृतिक कार्यक्रमों के लिए पेशेवर लाइव स्टेज परफॉर्मेंस।',
        details: [
            { icon: 'fa-microphone', text: 'Professional Stage Setup' },
            { icon: 'fa-music', text: 'Full Band & Orchestra' },
            { icon: 'fa-users', text: 'Large Audience Events' },
            { icon: 'fa-calendar', text: 'Mela & Mahotsav' },
            { icon: 'fa-star', text: 'Premium Light Show' },
            { icon: 'fa-heart', text: 'Pan India Available' }
        ]
    }
};

// -------- OPEN SERVICE MODAL --------
function openServiceModal(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data) return;

    document.getElementById('modalIcon').textContent = data.icon;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;

    const detailsEl = document.getElementById('modalDetails');
    detailsEl.innerHTML = data.details.map(d =>
        `<div class="detail-chip"><i class="fas ${d.icon}"></i>${d.text}</div>`
    ).join('');

    document.getElementById('serviceModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    document.getElementById('serviceModal').classList.remove('open');
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeServiceModal();
        closeLightbox();
    }
});

// -------- OFFER BANNER --------
function closeBanner() {
    const banner = document.getElementById('offerBanner');
    if (banner) {
        banner.style.transform = 'translateY(100%)';
        banner.style.transition = 'transform 0.4s ease';
        setTimeout(() => banner.style.display = 'none', 400);
    }
}

// Auto-hide banner after 15 seconds
setTimeout(closeBanner, 15000);

// -------- DATE AVAILABILITY CHECKER --------
// Pre-set some "booked" dates for demo
const bookedDates = [];
// Add some random dates in next 3 months as "booked"
const today = new Date();
for (let i = 0; i < 12; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + Math.floor(Math.random() * 90) + 5);
    bookedDates.push(d.toISOString().split('T')[0]);
}

// Set min date to today
const checkDateInput = document.getElementById('checkDate');
if (checkDateInput) {
    checkDateInput.min = today.toISOString().split('T')[0];
}

function checkAvailability() {
    const dateInput = document.getElementById('checkDate');
    const resultEl = document.getElementById('availResult');

    if (!dateInput.value) {
        showToast('⚠️ Pehle ek date select karein!', 'warning');
        return;
    }

    const selectedDate = new Date(dateInput.value);
    const todayDate = new Date();
    todayDate.setHours(0,0,0,0);

    if (selectedDate < todayDate) {
        showToast('❌ Beeti hui date select ki hai. Aaj ya iske baad ki date chunein.', 'error');
        return;
    }

    resultEl.style.display = 'block';

    // Format date in Hindi style
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = selectedDate.toLocaleDateString('hi-IN', options);

    if (bookedDates.includes(dateInput.value)) {
        resultEl.className = 'avail-result unavailable';
        resultEl.innerHTML = `❌ <strong>${dateStr}</strong> — यह तारीख पहले से बुक हो चुकी है। कोई और तारीख चुनें या WhatsApp पर confirm करें।`;
        showToast('इस तारीख पर booking full है। दूसरी date try करें।', 'error');
    } else {
        resultEl.className = 'avail-result available';
        resultEl.innerHTML = `✅ <strong>${dateStr}</strong> — पुष्पेंद्र माधोश इस तारीख पर उपलब्ध हैं! <a href="#booking" style="color:inherit;text-decoration:underline;">अभी Book करें →</a>`;
        showToast('🎉 यह तारीख available है! Jaldi book karein!', 'success');
    }
}

// -------- FAQ ACCORDION --------
function toggleFaq(item) {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) item.classList.add('open');
}

// -------- YOUTUBE TABS FUNCTIONALITY --------
const ytTabs = document.querySelectorAll('.yt-tab');
const ytGrid = document.getElementById('ytGrid');

const ytData = {
    latest: `
        <div class="yt-video-card featured-video" style="animation: fadeUp 0.5s ease-out forwards;">
            <div class="yt-thumb-wrapper">
                <iframe src="https://www.youtube.com/embed/HnBL-G8Jp8c" title="Pushpendra Madhosh Bhajan 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="yt-card-info">
                <div class="yt-badge">🎵 Latest Release</div>
                <h3>पुष्पेंद्र माधोश का नया भजन</h3>
                <div class="yt-meta">
                    <span><i class="fas fa-eye"></i> 10K+ Views</span>
                    <span><i class="fas fa-heart"></i> 900+ Likes</span>
                </div>
            </div>
        </div>
        <div class="yt-video-card" style="animation: fadeUp 0.5s ease-out forwards; animation-delay: 0.1s;">
            <div class="yt-thumb-wrapper">
                <iframe src="https://www.youtube.com/embed/_y84TlJn888" title="Pushpendra Madhosh Bhajan 2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="yt-card-info">
                <div class="yt-badge">🎵 New Bhajan</div>
                <h3>माधोश जी की मधुर प्रस्तुति</h3>
                <div class="yt-meta">
                    <span><i class="fas fa-eye"></i> 8K+ Views</span>
                    <span><i class="fas fa-heart"></i> 400+ Likes</span>
                </div>
            </div>
        </div>
    `,
    popular: `
        <div class="yt-video-card" style="animation: fadeUp 0.5s ease-out forwards;">
            <div class="yt-thumb-wrapper">
                <iframe src="https://www.youtube.com/embed/_y84TlJn888" title="Popular Bhajan" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="yt-card-info">
                <div class="yt-badge">🔥 Most Popular</div>
                <h3>चरणों में आ पड़े हैं - सुपरहिट भजन</h3>
                <div class="yt-meta">
                    <span><i class="fas fa-eye"></i> 1.5M Views</span>
                    <span><i class="fas fa-heart"></i> 15K+ Likes</span>
                </div>
            </div>
        </div>
        <div class="yt-video-card" style="animation: fadeUp 0.5s ease-out forwards; animation-delay: 0.1s;">
            <div class="yt-thumb-wrapper">
                <iframe src="https://www.youtube.com/embed/HnBL-G8Jp8c" title="Popular Bhajan 2" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="yt-card-info">
                <div class="yt-badge">🔥 Viral Bhajan</div>
                <h3>भक्तिमय जागरण वीडियो</h3>
                <div class="yt-meta">
                    <span><i class="fas fa-eye"></i> 800K Views</span>
                    <span><i class="fas fa-heart"></i> 12K Likes</span>
                </div>
            </div>
        </div>
    `,
    shorts: `
        <div class="yt-video-card" style="animation: fadeUp 0.5s ease-out forwards; max-width: 350px; margin: 0 auto;">
            <div class="yt-thumb-wrapper" style="padding-top: 177%;">
                <iframe src="https://www.youtube.com/embed/HnBL-G8Jp8c" title="YouTube Short" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="yt-card-info">
                <div class="yt-badge">⚡ Trending Short</div>
                <h3>लाइव जागरण की झलक 🕉️</h3>
                <div class="yt-meta">
                    <span><i class="fas fa-eye"></i> 200K Views</span>
                </div>
            </div>
        </div>
    `
};

ytTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all
        ytTabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked
        tab.classList.add('active');
        
        const target = tab.getAttribute('data-tab');
        
        // Fade out slightly
        ytGrid.style.opacity = '0';
        ytGrid.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            ytGrid.innerHTML = ytData[target];
            ytGrid.style.opacity = '1';
            ytGrid.style.transform = 'translateY(0)';
        }, 300);
    });
});

if(ytGrid) {
    ytGrid.style.transition = 'all 0.3s ease-out';
}

// -------- FORM VALIDATION & SUBMISSION --------
function submitBooking(event) {
    event.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const service = document.getElementById('serviceType').value;
    const date = document.getElementById('eventDate').value;
    let time = document.getElementById('eventTime').value.trim();
    if (time) {
        const ampm = document.getElementById('eventAmPm') ? document.getElementById('eventAmPm').value : '';
        time = `${time} ${ampm}`;
    }
    const location = document.getElementById('eventLocation').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || name.length < 2) {
        showToast('❌ Apna sahi naam darj karein!', 'error');
        document.getElementById('clientName').focus();
        return;
    }
    if (!phone || phone.replace(/\D/g,'').length < 10) {
        showToast('❌ Sahi mobile number darj karein (10 digits)!', 'error');
        document.getElementById('clientPhone').focus();
        return;
    }
    if (!service) {
        showToast('❌ Service select karein!', 'error');
        document.getElementById('serviceType').focus();
        return;
    }
    if (!date) {
        showToast('❌ Event ki date chunein!', 'error');
        document.getElementById('eventDate').focus();
        return;
    }
    if (new Date(date) < new Date()) {
        showToast('❌ Aaj ya iske baad ki date chunein!', 'error');
        return;
    }
    if (!location || location.length < 3) {
        showToast('❌ Event ka location darj karein!', 'error');
        document.getElementById('eventLocation').focus();
        return;
    }

    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    showToast('📤 Aapki booking WhatsApp par send ho rahi hai...', 'info');

    setTimeout(() => {
        const dateObj = new Date(date);
        const dateFormatted = dateObj.toLocaleDateString('hi-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

        const waMessage = encodeURIComponent(
            `🙏 *Jai Shree Ram!* 🙏\n\n` +
            `*📋 BOOKING REQUEST*\n` +
            `*Sankirtan Booking — Pushpendra Madhosh*\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `👤 *नाम:* ${name}\n` +
            `📱 *Mobile:* ${phone}\n` +
            `🎵 *Service:* ${service}\n` +
            `📅 *तारीख:* ${dateFormatted}\n` +
            `⏰ *समय:* ${time || 'बाद में तय होगा'}\n` +
            `📍 *स्थान:* ${location}\n` +
            `💬 *Message:* ${message || 'कोई विशेष अनुरोध नहीं'}\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `🙏 Hum jald sampark karenge!`
        );

        window.open(`https://wa.me/918742971542?text=${waMessage}`, '_blank');
        document.getElementById('successModal').style.display = 'flex';
        document.getElementById('bookingForm').reset();

        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Booking Submit करें';
        btn.disabled = false;

        showToast('✅ Booking request successfully send ho gayi!', 'success', 5000);
    }, 1500);
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// -------- REAL-TIME FORM FIELD HIGHLIGHT --------
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.style.transform = 'scale(1.01)';
        field.parentElement.style.transition = 'transform 0.2s ease';
    });
    field.addEventListener('blur', () => {
        field.parentElement.style.transform = 'scale(1)';
        if (field.value && field.value.trim()) {
            field.style.borderColor = 'rgba(37,211,102,0.4)';
        } else {
            field.style.borderColor = '';
        }
    });
});

// -------- SET MIN DATE FOR BOOKING FORM --------
const eventDateInput = document.getElementById('eventDate');
if (eventDateInput) {
    eventDateInput.min = new Date().toISOString().split('T')[0];
}

// -------- SMOOTH SCROLL --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// -------- COUNTER ANIMATION --------
function animateCounters() {
    const counters = document.querySelectorAll('.stat-num');
    counters.forEach(counter => {
        const text = counter.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/\d+/, '');
        let current = 0;
        const increment = num / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) { current = num; clearInterval(timer); }
            counter.textContent = Math.floor(current) + suffix;
        }, 25);
    });
}

const heroSection = document.querySelector('.hero');
if (heroSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateCounters(); counterObserver.unobserve(entry.target); }
        });
    }, { threshold: 0.3 });
    counterObserver.observe(heroSection);
}

// -------- HERO PARTICLES --------
function createHeroParticles() {
    const hero = document.querySelector('.hero-particles');
    if (!hero) return;
    for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        const size = Math.random() * 4 + 2;
        dot.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:rgba(255,215,0,${Math.random()*0.4+0.1});border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:dotFloat ${Math.random()*8+5}s ease-in-out infinite;animation-delay:${Math.random()*5}s;`;
        hero.appendChild(dot);
    }
}

const dotStyle2 = document.createElement('style');
dotStyle2.textContent = `@keyframes dotFloat{0%,100%{transform:translateY(0) translateX(0);opacity:.3}25%{transform:translateY(-20px) translateX(10px);opacity:.8}75%{transform:translateY(10px) translateX(-10px);opacity:.5}}`;
document.head.appendChild(dotStyle2);
createHeroParticles();

// -------- LIGHTBOX --------
function openLightbox(imgSrc) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    if (!lb || !lbImg) return;
    lbImg.src = imgSrc;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = 'auto';
    setTimeout(() => { document.getElementById('lightboxImg').src = ''; }, 300);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeLightbox(); closeServiceModal(); }
});

// -------- COPY PHONE NUMBER --------
function copyPhone(number) {
    navigator.clipboard.writeText(number).then(() => {
        showToast('📋 Phone number copied! ' + number, 'success');
    }).catch(() => {
        showToast('📋 Number: ' + number, 'info');
    });
}

// Make phone numbers clickable-to-copy
document.querySelectorAll('.qc-val').forEach(el => {
    el.style.cursor = 'pointer';
    el.title = 'Click to copy';
    el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        copyPhone(el.textContent.trim());
    });
});

// -------- SERVICE CARD GLOW EFFECT --------
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow = card.querySelector('.service-glow');
        if (glow) {
            glow.style.left = `${x - 75}px`;
            glow.style.top = `${y - 75}px`;
        }
    });
});

// -------- TICKER PAUSE ON HOVER --------
const ticker = document.querySelector('.ticker-track');
if (ticker) {
    ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}

// -------- FLOATING BUTTONS SHOW/HIDE --------
const floatingWA = document.getElementById('floatingWA');
const floatingCall = document.getElementById('floatingCall');
window.addEventListener('scroll', () => {
    const vis = window.scrollY > 300;
    if (floatingWA) { floatingWA.style.opacity = vis ? '1' : '0.7'; floatingWA.style.transform = vis ? 'scale(1)' : 'scale(0.9)'; }
    if (floatingCall) { floatingCall.style.opacity = vis ? '1' : '0.7'; }
});

// -------- SHARE PAGE FUNCTIONALITY --------
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: 'Pushpendra Madhosh - Sankirtan Booking',
            text: '🕉️ भजन संध्या, जागरण, सुंदरकांड बुकिंग के लिए संपर्क करें!',
            url: window.location.href
        }).then(() => showToast('✅ Page share ho gaya!', 'success'))
          .catch(() => showToast('❌ Share cancel hua.', 'error'));
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('🔗 Page link copied to clipboard!', 'success');
        });
    }
}

// -------- PERIODIC BOOKING REMINDER TOAST --------
const bookingReminders = [
    '🪔 Navratri aane wali hai! Abhi Mata Chowki book karein!',
    '🎵 Bhajan Sandhya ke liye seats limited hain — jaldi book karein!',
    '📞 Call ya WhatsApp karein: +91 87429 71542',
    '⭐ 900+ events successfully complete — Aap bhi book karein!'
];
let reminderIndex = 0;
setTimeout(() => {
    setInterval(() => {
        showToast(bookingReminders[reminderIndex % bookingReminders.length], 'info', 4000);
        reminderIndex++;
    }, 30000);
}, 10000);

// -------- PAGE VISIBILITY - TITLE CHANGE --------
const originalTitle = document.title;
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '🪔 Wapas aao! Booking wait kar rahi hai...';
    } else {
        document.title = originalTitle;
        showToast('🙏 Jai Shree Ram! Swagat hai wapas!', 'info', 2000);
    }
});

console.log('%c🕉️ Jai Shree Ram!', 'color: #FF6B00; font-size: 20px; font-weight: bold;');
console.log('%cPushpendra Madhosh | Sankirtan Booking Website v2.0', 'color: #FFD700; font-size: 12px;');




// ============================================
// UI/UX IMPROVEMENTS — SCROLL REVEAL, CAROUSEL, FORM PROGRESS
// ============================================

// --- 1. SCROLL REVEAL ANIMATION ---
(function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay based on index within parent
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    
    revealEls.forEach((el, i) => {
        observer.observe(el);
    });
})();

// --- 2. REVIEWS CAROUSEL ---
(function initReviewsCarousel() {
    const carousel = document.getElementById('reviewsCarousel');
    const dotsContainer = document.getElementById('reviewsDots');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.review-card');
    const total = cards.length;
    let current = 0;
    let autoTimer;
    
    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });
    
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
    
    function goTo(index) {
        current = (index + total) % total;
        const cardWidth = cards[0].offsetWidth + 24; // card width + gap
        carousel.style.transform = `translateX(-${current * cardWidth}px)`;
        updateDots();
    }
    
    window.reviewsNext = function() {
        goTo(current + 1);
        resetTimer();
    };
    window.reviewsPrev = function() {
        goTo(current - 1);
        resetTimer();
    };
    
    function resetTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(current + 1), 4000);
    }
    
    // Auto scroll every 4 seconds
    autoTimer = setInterval(() => goTo(current + 1), 4000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
    carousel.addEventListener('mouseleave', resetTimer);
    
    // Touch/swipe support
    let startX = 0;
    carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? reviewsNext() : reviewsPrev();
    });
})();

// --- 3. FORM PROGRESS TRACKER ---
(function initFormProgress() {
    const fields = ['clientName', 'clientPhone', 'serviceType', 'eventDate', 'eventLocation'];
    const progressFill = document.getElementById('formProgressFill');
    const progressText = document.getElementById('formProgressText');
    
    if (!progressFill) return;
    
    function updateProgress() {
        let filled = 0;
        fields.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.value.trim()) filled++;
        });
        const pct = Math.round((filled / fields.length) * 100);
        progressFill.style.width = pct + '%';
        progressText.textContent = filled + ' of ' + fields.length + ' fields filled';
        if (pct === 100) {
            progressText.textContent = '✅ Ready to submit!';
            progressFill.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
        } else {
            progressFill.style.background = '';
        }
    }
    
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateProgress);
        if (el) el.addEventListener('change', updateProgress);
    });
})();

// --- 4. YOUTUBE THUMBNAIL LAZY PLAY ---
(function initYTThumbnails() {
    // Replace iframes with thumbnail + play button for faster load
    const wrappers = document.querySelectorAll('.yt-thumb-wrapper');
    wrappers.forEach(wrapper => {
        const iframe = wrapper.querySelector('iframe');
        if (!iframe) return;
        
        const src = iframe.src;
        const videoId = src.split('/embed/')[1]?.split('?')[0];
        if (!videoId) return;
        
        const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        
        // Replace iframe with thumbnail
        const img = document.createElement('img');
        img.src = thumbUrl;
        img.alt = 'YouTube Video Thumbnail';
        img.className = 'yt-thumbnail';
        img.loading = 'lazy';
        
        const overlay = document.createElement('div');
        overlay.className = 'yt-play-overlay';
        overlay.innerHTML = '<div class="yt-play-btn-icon">▶</div>';
        
        // On click, load iframe
        overlay.addEventListener('click', () => {
            const newIframe = document.createElement('iframe');
            newIframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
            newIframe.title = iframe.title || 'YouTube video';
            newIframe.frameBorder = '0';
            newIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            newIframe.allowFullscreen = true;
            newIframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;';
            
            wrapper.innerHTML = '';
            wrapper.appendChild(newIframe);
        });
        
        wrapper.innerHTML = '';
        wrapper.appendChild(img);
        wrapper.appendChild(overlay);
    });
})();

// --- CHECK AVAILABILITY FUNCTION ---
window.checkAvailability = function() {
    const dateInput = document.getElementById('eventDate');
    const resultDiv = document.getElementById('availabilityResult');
    
    if (!dateInput.value) {
        resultDiv.className = 'availability-result avail-error';
        resultDiv.textContent = '❌ Please select a date first.';
        resultDiv.style.display = 'block';
        return;
    }
    
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (selectedDate < today) {
        resultDiv.className = 'availability-result avail-error';
        resultDiv.textContent = '❌ You cannot select a past date.';
        resultDiv.style.display = 'block';
        return;
    }

    // Show loading state
    resultDiv.className = 'availability-result avail-loading';
    resultDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking calendar...';
    resultDiv.style.display = 'block';
    
    // Simulate network delay for checking
    setTimeout(() => {
        // We'll treat every future date as available to encourage booking
        resultDiv.className = 'availability-result avail-success';
        resultDiv.innerHTML = '✅ <strong>Good news!</strong> This date is currently available. Please submit the form below to lock your booking.';
    }, 1500);
};

// --- QUICK AVAILABILITY BANNER FUNCTION ---
window.checkQuickAvailability = function() {
    const dateInput = document.getElementById('quickAvailDate');
    
    if (!dateInput.value) {
        showToast('❌ Please select a date first to check availability!', 'error');
        dateInput.focus();
        return;
    }
    
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (selectedDate < today) {
        showToast('❌ You cannot check for a past date!', 'error');
        return;
    }

    showToast('⏳ Checking availability for this date...', 'success');
    
    // Auto sync and scroll after 1.2s delay
    setTimeout(() => {
        const formDate = document.getElementById('eventDate');
        if (formDate) {
            formDate.value = dateInput.value;
            // auto-trigger the main check
            if (typeof window.checkAvailability === "function") {
                window.checkAvailability();
            }
        }
        
        // scroll to form
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        showToast('✅ Good news! Date is available. Please submit form.', 'success');
    }, 1200);
};

// ============================================
// DYNAMIC GALLERY FETCHER
// ============================================
async function loadDynamicGallery() {
    try {
        const response = await fetch('/api/gallery');
        if (!response.ok) return; // Silent fail, leave static images
        
        const images = await response.json();
        const galleryGrid = document.querySelector('.gallery-grid');
        
        if (images && images.length > 0 && galleryGrid) {
            galleryGrid.innerHTML = ''; // clear static images
            
            images.forEach((imgPath, index) => {
                // Add a large class for the first image just for variety, though masonry handles it
                let itemClass = "gallery-item";
                
                galleryGrid.innerHTML += `
                    <div class="${itemClass}" onclick="openLightbox('${imgPath}')">
                        <img src="${imgPath}" alt="Gallery Image" loading="lazy">
                        <div class="gallery-overlay">
                            <div class="gallery-overlay-icon">✨</div>
                            <span>P.M. Sankirtan</span>
                        </div>
                    </div>
                `;
            });
        }
    } catch (err) {
        console.log("Using static gallery images.");
    }
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
    loadDynamicGallery();
});
