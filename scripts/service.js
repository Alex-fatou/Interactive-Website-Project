document.addEventListener('DOMContentLoaded', function () {
    const services = document.querySelectorAll('.service');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');υ
                if (entry.target.classList.contains('service:nth-child(1)') || entry.target.classList.contains('service:nth-child(3)')) {
                    entry.target.style.animation = 'slideInLeft 1s ease-out'; 
                } else {
                    entry.target.style.animation = 'slideInRight 1s ease-out'; 
                }
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.5 });

    services.forEach(service => {
        observer.observe(service);
    });
});