$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

});


/* ===== SCROLL REVEAL ===== */

ScrollReveal().reveal('.heading', {
    delay: 200,
    distance: '50px',
    origin: 'top',
    duration: 1000
});

ScrollReveal().reveal('.quote', {
    delay: 300,
    distance: '30px',
    origin: 'bottom',
    duration: 1000
});

/* LEFT TIMELINE ITEMS */

ScrollReveal().reveal('.experience .left', {
    origin: 'left',
    distance: '120px',
    duration: 1200,
    interval: 250,
    opacity: 0,
    reset: false
});

/* RIGHT TIMELINE ITEMS */

ScrollReveal().reveal('.experience .right', {
    origin: 'right',
    distance: '120px',
    duration: 1200,
    interval: 250,
    opacity: 0,
    reset: false
});


/* ===== TAWK CHAT ===== */

var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();

(function () {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];

    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    s0.parentNode.insertBefore(s1, s0);
})();


/* ===== DISABLE DEV TOOLS ===== */

document.onkeydown = function (e) {

    if (e.keyCode == 123) {
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }

    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }

    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
};


/* ===== TAB TITLE CHANGE ===== */

document.addEventListener('visibilitychange', function () {

    if (document.visibilityState === "visible") {
        document.title = "Experience | Portfolio Mohd Shabaz";
        $("#favicon").attr("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/favhand.png");
    }

});