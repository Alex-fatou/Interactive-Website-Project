// Navbar
function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("active");
}

// Back to Top Button
let backToTopBtn = document.getElementById("backToTopBtn");


window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

function backToTop() {
    window.scrollTo({top: 0, behavior: "smooth"});
}
