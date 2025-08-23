document.addEventListener("DOMContentLoaded", function () {

    /*==================== toggle icon navbar ====================*/
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        navbar.classList.toggle('active');
    };

    /*==================== scroll section active link ====================*/
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });

        /*=================== sticky navbar ====================*/
        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);
    };

    /*==================== ✅ About Section Read More / Read Less ====================*/
    const readBtn = document.getElementById("readBtn");
    const dots = document.getElementById("dots");
    const moreText = document.getElementById("more");

    if (readBtn && dots && moreText) {
        moreText.style.display = "none";

        readBtn.addEventListener("click", function () {
            if (moreText.style.display === "none") {
                moreText.style.display = "inline";
                dots.style.display = "none";
                readBtn.textContent = "Read Less";
            } else {
                moreText.style.display = "none";
                dots.style.display = "inline";
                readBtn.textContent = "Read More";
            }
        });
    }

    /*==================== ✅ Skills Section Read More / Read Less ====================*/
    const readButtons = document.querySelectorAll(".skills .readBtn");

    readButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const parent = btn.parentElement;
            const dots = parent.querySelector(".dots");
            const moreText = parent.querySelector(".more");

            if (moreText.style.display === "none") {
                moreText.style.display = "inline";
                dots.style.display = "none";
                btn.textContent = "Read Less";
            } else {
                moreText.style.display = "none";
                dots.style.display = "inline";
                btn.textContent = "Read More";
            }
        });
    });

    /*==================== remove toggle icon and navbar on scroll ====================*/
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuIcon.classList.remove('fa-xmark');
            navbar.classList.remove('active');
        });
    });

    /*==================== scroll reveal ====================*/
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
    });
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

    /*==================== typed js ====================*/
    const typed = new Typed('.multiple-text', {
        strings: ['Frontend Developer', 'Web Designer', 'Engineer'],
        typeSpeed: 70,
        backSpeed: 70,
        backDelay: 1000,
        loop: true,
    });

    /*==================== Contact Form (Formspree) ====================*/
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    formMessage.style.display = "block";
                    formMessage.style.color = "limegreen";
                    formMessage.textContent = "✅ Message Sent Successfully!";
                    form.reset();
                } 
                else {
                    formMessage.style.display = "block";
                    formMessage.style.color = "red";
                    formMessage.textContent = "❌ Failed to send. Try again.";
                }
            }).catch(() => {
                formMessage.style.display = "block";
                formMessage.style.color = "red";
                formMessage.textContent = "❌ Network error. Try again.";
            });
        });
    }
});
