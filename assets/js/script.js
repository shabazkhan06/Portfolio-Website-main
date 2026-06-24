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

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- Pabbly webhook form submission -->
    (function () {
        var WEBHOOK_URL = "https://connect.pabbly.com/webhook-listener/webhook/IjU3NjMwNTZkMDYzMDA0MzA1MjZmNTUzZCI_3D_pc/IjU3NjcwNTY5MDYzNTA0MzU1MjZkNTUzMjUxM2Ei_pc";

        var toast        = document.getElementById('success-toast');
        var closeBtn     = document.getElementById('s-toast-close');
        var submitBtn    = document.getElementById('contact-submit');
        var autoTimer    = null;

        /* ---- Show toast ---- */
        function showToast() {
            toast.style.display = 'flex';
            // Force reflow so CSS transition fires
            void toast.offsetHeight;
            toast.classList.add('s-toast--visible');
            toast.classList.remove('s-toast--hiding');

            // Restart SVG animations by re-cloning the SVG paths
            var circle = toast.querySelector('.s-toast__circle');
            var tick   = toast.querySelector('.s-toast__tick');
            var icon   = toast.querySelector('.s-toast__icon-wrap');
            [circle, tick, icon].forEach(function(el) {
                el.style.animation = 'none';
                void el.offsetHeight;
                el.style.animation = '';
            });

            // Focus the close button for accessibility
            setTimeout(function() { closeBtn.focus(); }, 420);

            // Auto-hide after 5 s (matches progress bar duration)
            clearTimeout(autoTimer);
            autoTimer = setTimeout(hideToast, 5400);

            // ESC key listener
            document.addEventListener('keydown', onKeyDown);
        }

        /* ---- Hide toast ---- */
        function hideToast() {
            clearTimeout(autoTimer);
            toast.classList.add('s-toast--hiding');
            toast.classList.remove('s-toast--visible');
            document.removeEventListener('keydown', onKeyDown);
            setTimeout(function() {
                toast.style.display = 'none';
                toast.classList.remove('s-toast--hiding');
            }, 340);
        }

        /* ---- ESC key ---- */
        function onKeyDown(e) {
            if (e.key === 'Escape') hideToast();
        }

        /* ---- Backdrop click ---- */
        toast.addEventListener('click', function(e) {
            if (e.target === toast) hideToast();
        });

        /* ---- Close button ---- */
        closeBtn.addEventListener('click', hideToast);

        /* ---- Form submit ---- */
        $("#contact-form").submit(function (event) {
            event.preventDefault();

            // Loading state on button
            submitBtn.classList.add('loading');
            submitBtn.setAttribute('aria-disabled', 'true');

            var formData = {
                name:    $('input[name="name"]').val(),
                email:   $('input[name="email"]').val(),
                phone:   $('input[name="phone"]').val(),
                message: $('textarea[name="message"]').val()
            };

            fetch(WEBHOOK_URL, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(formData)
            })
            .then(function (response) {
                submitBtn.classList.remove('loading');
                submitBtn.removeAttribute('aria-disabled');
                if (response.ok) {
                    document.getElementById("contact-form").reset();
                    showToast();
                } else {
                    showErrorShake();
                }
            })
            .catch(function (error) {
                console.error('Webhook error:', error);
                submitBtn.classList.remove('loading');
                submitBtn.removeAttribute('aria-disabled');
                showErrorShake();
            });
        });

        /* ---- Shake button on error ---- */
        function showErrorShake() {
            submitBtn.style.animation = 'none';
            void submitBtn.offsetHeight;
            submitBtn.style.animation = 'errShake 0.5s ease';
            submitBtn.addEventListener('animationend', function() {
                submitBtn.style.animation = '';
            }, { once: true });
        }
    })();
    // <!-- Pabbly webhook form submission -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Mohd Shabaz";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
if (document.querySelector(".typing-text")) {
    var typed = new Typed(".typing-text", {
        strings: ["frontend development", "backend development", "web designing", "android development", "web development"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });
}
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

if (document.getElementById("skillsContainer")) {
    fetchData().then(data => {
        showSkills(data);
    });
}

if (document.querySelector("#work .box-container")) {
    fetchData("projects").then(data => {
        showProjects(data);
    });
}

// <!-- tilt js effect starts -->
if (document.querySelectorAll(".tilt").length) {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
}
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
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
}

// ── WhatsApp Floating Chat Button ──
(function () {
    // Create button container
    var chatBtn = document.createElement('a');
    chatBtn.href = 'https://wa.me/918881123860?text=Hi%20Shabaz%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!';
    chatBtn.target = '_blank';
    chatBtn.rel = 'noopener noreferrer';
    chatBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    chatBtn.id = 'whatsapp-chat-btn';

    // Tooltip
    var tooltip = document.createElement('span');
    tooltip.id = 'whatsapp-tooltip';
    tooltip.textContent = 'Chat with Shabaz';

    // WhatsApp SVG icon
    chatBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    chatBtn.appendChild(tooltip);

    // Inject CSS
    var style = document.createElement('style');
    style.textContent = '\
    #whatsapp-chat-btn {\
        position: fixed;\
        bottom: 2.8rem;\
        left: 2.8rem;\
        z-index: 9999;\
        width: 58px;\
        height: 58px;\
        background: #25D366;\
        border-radius: 50%;\
        display: flex;\
        align-items: center;\
        justify-content: center;\
        box-shadow: 0 4px 20px rgba(37,211,102,0.5);\
        text-decoration: none;\
        animation: waPulse 2.2s ease-in-out infinite;\
        transition: transform 0.2s ease, box-shadow 0.2s ease;\
    }\
    #whatsapp-chat-btn:hover {\
        transform: scale(1.12);\
        box-shadow: 0 6px 28px rgba(37,211,102,0.7);\
        animation: none;\
    }\
    #whatsapp-chat-btn:hover #whatsapp-tooltip {\
        opacity: 1;\
        transform: translateX(0);\
    }\
    #whatsapp-tooltip {\
        position: absolute;\
        left: 70px;\
        top: 50%;\
        transform: translateX(-8px) translateY(-50%);\
        background: #111;\
        color: #fff;\
        font-size: 13px;\
        font-family: "Poppins", sans-serif;\
        font-weight: 500;\
        padding: 6px 14px;\
        border-radius: 8px;\
        white-space: nowrap;\
        opacity: 0;\
        pointer-events: none;\
        transition: opacity 0.2s ease, transform 0.2s ease;\
    }\
    #whatsapp-tooltip::before {\
        content: "";\
        position: absolute;\
        right: 100%;\
        top: 50%;\
        transform: translateY(-50%);\
        border: 6px solid transparent;\
        border-right-color: #111;\
    }\
    @keyframes waPulse {\
        0%,100% { box-shadow: 0 4px 20px rgba(37,211,102,0.5); }\
        50% { box-shadow: 0 4px 32px rgba(37,211,102,0.85), 0 0 0 10px rgba(37,211,102,0.1); }\
    }';

    document.head.appendChild(style);
    document.body.appendChild(chatBtn);
})();
// ── End WhatsApp Chat Button ──


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
