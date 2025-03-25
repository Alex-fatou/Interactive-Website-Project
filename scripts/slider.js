const slides = document.getElementsByClassName("slider");
const bullets = document.querySelectorAll(".bullets-slide li");
let activeSlide = 0;
let interval;
let slideTime = 3000;

function setSlide(activeIndex) {
    if (activeIndex < 0) {
        activeSlide = slides.length - 1;
    } else if (activeIndex >= slides.length) {
        activeSlide = 0;
    } else {
        activeSlide = activeIndex;
    }

    // Εναλλαγή των slides με fade effect μόνο στις εικόνες
    for (let index = 0; index < slides.length; index++) {
        slides[index].classList.remove("display-block");
        slides[index].classList.add("display-none");
    }

    slides[activeSlide].classList.remove("display-none");
    slides[activeSlide].classList.add("display-block");

    updateBullets();
}

// Ενημέρωση bullets
function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.classList.toggle("activeBullet", index === activeSlide);
    });
}

// Buttons
function setPreviousSlide() {
    resetLoop();
    setSlide(activeSlide - 1);
}

function setNextSlide() {
    resetLoop();
    setSlide(activeSlide + 1);
}

// Όταν πατάς bullet, αλλάζει το slide και ξεκινάει ο χρόνος από την αρχή
bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
        resetLoop();
        setSlide(index);
    });
});

// Επανεκκίνηση του αυτόματου loop
function resetLoop() {
    clearInterval(interval);
    startLoop();
}

// Start - Stop Loop
function startLoop() {
    clearInterval(interval);
    interval = setInterval(() => {
        setSlide(activeSlide + 1);
    }, slideTime);
}

function stopLoop() {
    clearInterval(interval);
}

// Manual time update
function updateInterval() {
    const inputElement = document.getElementById("slideInterval");
    let inputVal = parseInt(inputElement.value);

    if (isNaN(inputVal) || inputVal < 3000) {
        alert("Please enter a valid number (minimum 2000ms).");
        inputElement.value = 3000;
        return;
    }

    slideTime = inputVal;
    resetLoop();
}

// Start slider automatically
window.onload = function () {
    setSlide(0);
    startLoop();
};