// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations with fade in and out
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Accommodation enquiry page helpers
const roomTypeSelect = document.querySelector('#roomType');
const selectedRoomLabels = document.querySelectorAll('[data-selected-room]');
const checkInDateInput = document.querySelector('#checkInDate');
const checkOutDateInput = document.querySelector('#checkOutDate');
const roomFromQuery = new URLSearchParams(window.location.search).get('room');

if (roomTypeSelect && roomFromQuery) {
    roomTypeSelect.value = roomFromQuery;
}

if (selectedRoomLabels.length) {
    const currentRoom = roomTypeSelect && roomTypeSelect.value ? roomTypeSelect.value : 'Choose your preferred room';
    selectedRoomLabels.forEach(label => {
        label.textContent = currentRoom;
    });
}

if (roomTypeSelect && selectedRoomLabels.length) {
    roomTypeSelect.addEventListener('change', function () {
        const nextRoom = this.value || 'Choose your preferred room';
        selectedRoomLabels.forEach(label => {
            label.textContent = nextRoom;
        });
    });
}

if (checkInDateInput && checkOutDateInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInDateInput.min = today;
    checkOutDateInput.min = today;

    checkInDateInput.addEventListener('change', function () {
        checkOutDateInput.min = this.value || today;
        if (checkOutDateInput.value && checkOutDateInput.value < this.value) {
            checkOutDateInput.value = this.value;
        }
    });
}

// Form submission handling
document.querySelectorAll('form[data-demo-form], .contact form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const feedback = this.querySelector('.form-feedback');
        const successMessage = this.dataset.successMessage || 'Thank you for your message! We will get back to you soon.';
        const preservedRoom = roomTypeSelect ? roomTypeSelect.value : '';

        if (feedback) {
            feedback.textContent = successMessage;
        } else {
            alert(successMessage);
        }

        this.reset();

        if (roomTypeSelect && preservedRoom) {
            roomTypeSelect.value = preservedRoom;
        }

        if (selectedRoomLabels.length) {
            const nextRoom = roomTypeSelect && roomTypeSelect.value ? roomTypeSelect.value : 'Choose your preferred room';
            selectedRoomLabels.forEach(label => {
                label.textContent = nextRoom;
            });
        }
    });
});

// Dynamic year in footer
const footerText = document.querySelector('footer p');

if (footerText) {
    footerText.innerHTML = `&copy; ${new Date().getFullYear()} Victoria Falls Transporters. All rights reserved.`;
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    }
});
