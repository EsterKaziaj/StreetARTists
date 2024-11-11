// visitor_home.js

// Sliders Functionality for continuous looping

const firstRow = document.querySelector('.first-row');
const secondRow = document.querySelector('.second-row');

let scrollAmountFirstRow = 0;
let scrollAmountSecondRow = 0;

// Function to animate the first row of images (right to left)
function animateFirstRow() {
    scrollAmountFirstRow -= 0.5; // Slow speed to the left
    if (Math.abs(scrollAmountFirstRow) >= firstRow.scrollWidth / 2) {
        scrollAmountFirstRow = 0; // Reset position to create seamless loop
    }
    firstRow.style.transform = `translateX(${scrollAmountFirstRow}px)`;
    requestAnimationFrame(animateFirstRow);
}

// Function to animate the second row of images (left to right)
function animateSecondRow() {
    scrollAmountSecondRow += 0.5; // Slow speed to the right
    if (scrollAmountSecondRow >= secondRow.scrollWidth / 2) {
        scrollAmountSecondRow = 0; // Reset position to create seamless loop
    }
    secondRow.style.transform = `translateX(${scrollAmountSecondRow}px)`;
    requestAnimationFrame(animateSecondRow);
}

// Start animations for both rows
animateFirstRow();
animateSecondRow();

// Redirect to visitor_listing.html on any image click
document.querySelectorAll('.slider-row img').forEach(img => {
    img.addEventListener('click', () => {
        window.location.href = 'visitor_listing.html';
    });
});

// Carousel Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.mySlides');

function showSlides(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
}

function plusSlides(n) {
    showSlides(slideIndex + n);
}

// Initialize first slide as active
showSlides(slideIndex);