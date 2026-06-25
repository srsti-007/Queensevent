// Structured Database Featuring Premium Images and Explicit Location Tags
const database = [
    {
        id: 1,
        name: "Amethyst Symphony Night",
        category: "Concert",
        city: "Bangalore",
        date: "August 14, 2026",
        time: "19:30",
        venue: "Chowdiah Memorial Hall, Malleshwaram",
        price: "₹2,499",
        image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop",
        organizer: "Queens Corporate Management",
        desc: "Experience a breathtaking evening of classical Indian and Western orchestral arrangements reimagined with contemporary synth overtones, set in a beautifully illuminated premium auditorium."
    },
    {
        id: 2,
        name: "Next-Gen AI & Web Architecture Summit",
        category: "Seminar",
        city: "Chennai",
        date: "September 02, 2026",
        time: "09:00",
        venue: "Vibrant Tech Hub, IIT Madras Research Park",
        price: "Free Registration",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
        organizer: "FutureTech Dev Group",
        desc: "Dive deep into modern single-page application strategies, dynamic DOM architectures, artificial intelligence scaling constraints, and scalable design layouts."
    },
    {
        id: 3,
        name: "Creative Lavender Watercolor Workshop",
        category: "Workshop",
        city: "Pune",
        date: "August 28, 2026",
        time: "14:00",
        venue: "The Nandi Botanical Gallery, Koregaon Park",
        price: "₹1,200",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop",
        organizer: "Artistry Studios Guild",
        desc: "Unleash your creative potential. Learn custom composition styling, advanced bleed methods, color mixing, and smooth gradients using specialized natural floral-infused pigments."
    },
    {
        id: 4,
        name: "Indie Rock Echo Festival",
        category: "Concert",
        city: "Mumbai",
        date: "October 11, 2026",
        time: "18:00",
        venue: "Jio World Garden, BKC",
        price: "₹1,850",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
        organizer: "Soundwave Media Corp",
        desc: "A rhythmic weekend celebration featuring rising alternative indie rock bands across multiple custom open-air stages. Global artisan street food trucks and vinyl pop-up stalls available."
    },
    {
        id: 5,
        name: "Global Pastry & Culinary Fair",
        category: "Festival",
        city: "Delhi-NCR",
        date: "November 05, 2026",
        time: "11:00",
        venue: "DLF CyberHub, Gurugram",
        price: "₹450",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
        organizer: "Confectioners United",
        desc: "Sample masterworks from world-class luxury pastry chefs, attend intense live modeling workshops, and cast your votes in community bake-off events."
    },
    {
        id: 6,
        name: "Advanced Layouts & CSS Typography",
        category: "Workshop",
        city: "Bangalore",
        date: "August 19, 2026",
        time: "10:00",
        venue: "WebCraft Space, Indiranagar",
        price: "₹999",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop",
        organizer: "WebCraft Training Academy",
        desc: "Master responsive design systems, layout alignment frameworks, modern fluid typography constraints, viewport configurations, and clean user interface presentation architectures."
    }
];

let systemActiveId = null;
let activeCityFilter = 'all';

// DOM Element Selectors
const eventsGrid = document.getElementById('eventsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const browseBtn = document.getElementById('browseBtn');
const eventModal = document.getElementById('eventModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const bookingForm = document.getElementById('bookingForm');
const navItems = document.querySelectorAll('.nav-item');
const locationPills = document.querySelectorAll('.location-pill');

// Initialize App Event Listeners
function initializeApp() {
    populateEventGrid(database);

    // Search and Category Selector Listeners
    searchInput.addEventListener('keyup', processFilters);
    categoryFilter.addEventListener('change', processFilters);

    // Pill Location Interceptors
    locationPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            locationPills.forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            activeCityFilter = e.target.getAttribute('data-city');
            processFilters();
        });
    });

    // Hero Scroll Trigger
    browseBtn.addEventListener('click', () => {
        document.getElementById('eventsSection').scrollIntoView({ behavior: 'smooth' });
    });

    // Close Modal Bindings
    closeModalBtn.addEventListener('click', closeEventModal);
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) closeEventModal();
    });

    // Form Submissions
    bookingForm.addEventListener('submit', validateAndSubmitForm);

    initScrollAnimations();
    initNavigationEngine();
}

// Dynamic Grid Rendering Engine
function populateEventGrid(dataset) {
    eventsGrid.innerHTML = '';
    
    if (dataset.length === 0) {
        eventsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: var(--text-muted);" class="animated-element reveal">
                <p style="font-size: 1.2rem; font-weight: 600;">No upcoming experiences available.</p>
                <p style="font-size: 0.9rem;">Try modifying your city location, keyword search, or category selections.</p>
            </div>`;
        return;
    }

    dataset.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'event-card animated-element';
        card.style.transitionDelay = `${(index % 3) * 0.1}s`; 
        
        card.innerHTML = `
            <div class="event-img-container">
                <span class="card-location-tag">📍 ${item.city}</span>
                <img src="${item.image}" alt="${item.name}" class="event-banner-img" loading="lazy">
            </div>
            <div class="event-content">
                <span class="event-badge">${item.category}</span>
                <h3 class="event-title">${item.name}</h3>
                <p class="event-description">${item.desc}</p>
                <div class="event-meta-info">
                    <div class="meta-item">📅 ${item.date} at ${item.time}</div>
                    <div class="meta-item">🏢 ${item.venue}</div>
                </div>
                <div class="event-footer">
                    <span class="event-price">${item.price}</span>
                    <button class="btn view-details-btn" data-id="${item.id}">Details & Book</button>
                </div>
            </div>
        `;
        eventsGrid.appendChild(card);
    });

    setTimeout(() => {
        const cards = eventsGrid.querySelectorAll('.event-card');
        cards.forEach(card => card.classList.add('reveal'));
    }, 50);

    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const eventId = parseInt(e.target.getAttribute('data-id'));
            launchModal(eventId);
        });
    });
}

// Global Filter Composition Hub (Search + Category + City Pills)
function processFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const targetCategory = categoryFilter.value;

    const results = database.filter(item => {
        const matchesText = item.name.toLowerCase().includes(query) || 
                            item.venue.toLowerCase().includes(query) || 
                            item.city.toLowerCase().includes(query) ||
                            item.desc.toLowerCase().includes(query);
        const matchesType = (targetCategory === 'all' || item.category === targetCategory);
        const matchesCity = (activeCityFilter === 'all' || item.city === activeCityFilter);
        
        return matchesText && matchesType && matchesCity;
    });

    populateEventGrid(results);
}

// Modal Component Lifecycle management
function launchModal(id) {
    const record = database.find(item => item.id === id);
    if (!record) return;

    systemActiveId = id;
    document.getElementById('modalHeroImage').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('${record.image}')`;
    document.getElementById('modalTitle').innerText = record.name;
    document.getElementById('modalBadge').innerText = record.category;
    document.getElementById('modalDescription').innerText = record.desc;
    document.getElementById('modalDateTime').innerText = `${record.date} @ ${record.time}`;
    document.getElementById('modalCity').innerText = `📍 ${record.city}`;
    document.getElementById('modalVenue').innerText = record.venue;
    document.getElementById('modalOrganizer').innerText = record.organizer;
    document.getElementById('modalPrice').innerText = record.price;

    eventModal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeEventModal() {
    eventModal.classList.remove('active');
    document.body.style.overflow = ''; 
    bookingForm.reset();
    clearValidationErrors();
}

// Form Constraint Validation Engine
function validateAndSubmitForm(event) {
    event.preventDefault();
    clearValidationErrors();

    const nameInput = document.getElementById('fullName').value.trim();
    const emailInput = document.getElementById('emailAddress').value.trim();
    let passValidation = true;

    if (nameInput.length < 2) {
        document.getElementById('nameError').style.display = 'block';
        passValidation = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        document.getElementById('emailError').style.display = 'block';
        passValidation = false;
    }

    if (passValidation) {
        const chosenEvent = database.find(item => item.id === systemActiveId);
        const quant = document.getElementById('ticketQuantity').value;
        
        alert(`🎉 Registration Successful!\n\nThank you, ${nameInput}. We've confirmed ${quant} ticket(s) for "${chosenEvent.name}" in ${chosenEvent.city}.\nYour digital passes are on the way to ${emailInput}.`);
        closeEventModal();
    }
}

function clearValidationErrors() {
    document.getElementById('nameError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
}

// Scroll Intersection Observer Framework
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                scrollObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animated-element').forEach(element => {
        scrollObserver.observe(element);
    });
}

// Navigation Tracking Link Synchronizer Engine
function initNavigationEngine() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                if(item.id === 'navCategoriesBtn') {
                    categoryFilter.value = 'all';
                    activeCityFilter = 'all';
                    document.querySelectorAll('.location-pill').forEach(p => p.classList.remove('active'));
                    document.querySelector('[data-city="all"]').classList.add('active');
                    processFilters();
                    categoryFilter.focus();
                }

                const navOffset = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const navOffset = document.querySelector('.navbar').offsetHeight + 40;
        
        const sections = [
            document.getElementById('heroSection'),
            document.getElementById('eventsSection'),
            document.getElementById('footerSection')
        ];

        sections.forEach(section => {
            if (section) {
                const sectionTop = section.offsetTop - navOffset;
                if (window.pageYOffset >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === currentSectionId) {
                item.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);