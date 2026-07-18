/*==========================================
script.js
==========================================*/

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");

        if (navbar.classList.contains("active")) {
            menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });

    /*==========================================
    Close Menu on Link Click
    ==========================================*/

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/*==========================================
Sticky Header Shadow
==========================================*/

const header = document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 15px 35px rgba(0,0,0,.08)";
        } else {
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";
        }
    });
}

/*==========================================
Scroll To Top Button
==========================================*/

const scrollBtn = document.createElement("button");

scrollBtn.innerHTML = "↑";

scrollBtn.className = "scroll-top";

document.body.appendChild(scrollBtn);

scrollBtn.style.cssText = `
position:fixed;
right:25px;
bottom:25px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#2F7D32;
color:#fff;
font-size:22px;
cursor:pointer;
display:none;
z-index:999;
box-shadow:0 10px 25px rgba(0,0,0,.15);
transition:.3s;
`;

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

scrollBtn.style.display="block";

}else{

scrollBtn.style.display="none";

}

});

scrollBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

});

/*==========================================
Reveal Animation
==========================================*/

const reveals=document.querySelectorAll("section");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([

{

opacity:0,
transform:"translateY(50px)"

},

{

opacity:1,
transform:"translateY(0)"

}

],{

duration:700,
fill:"forwards"

});

}

});

},{threshold:.15});

reveals.forEach(section=>{

observer.observe(section);

});

/*==========================================
Active Navigation
==========================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

if(pageYOffset>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/*==========================================
Image Lazy Loading
==========================================*/

const images=document.querySelectorAll("img");

const imgObserver=new IntersectionObserver((entries,observer)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

img.src=img.dataset.src || img.src;

observer.unobserve(img);

}

});

});

images.forEach(img=>{

imgObserver.observe(img);

});

/*==========================================
Counter Animation
==========================================*/

const counters=document.querySelectorAll(".hero-stats h3");

const speed=200;

counters.forEach(counter=>{

const animate=()=>{

const value=+counter.innerText.replace(/\D/g,'');

const data=+counter.getAttribute("data-target")||value;

const time=data/speed;

if(value<data){

counter.innerText=Math.ceil(value+time)+"+";

requestAnimationFrame(animate);

}

};

});

/*==========================================
End
==========================================*/
/* ==========================================================================
   METHOD CHILD DEVELOPMENT CENTER — SCRIPT
   1. Sticky header shadow on scroll
   2. Mobile navigation toggle
   3. Smooth-scroll for in-page anchors
   4. Scroll reveal (IntersectionObserver)
   5. Animated statistic counters
   6. Button ripple micro-interaction
   7. Back-to-top button
   8. Newsletter form (demo submit handling)
   9. Footer year
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setFooterYear();
    initHeaderScroll();
    initMobileNav();
    initSmoothAnchors();
    initScrollReveal();
    initCounters();
    initButtonRipples();
    initBackToTop();
    initNewsletterForm();
  }

  /* ---------------------------------------------------------------- */
  /* Footer year                                                       */
  /* ---------------------------------------------------------------- */
  function setFooterYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------- */
  /* Header shadow on scroll                                           */
  /* ---------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    var toggleClass = function () {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };

    toggleClass();
    window.addEventListener("scroll", toggleClass, { passive: true });
  }

  /* ---------------------------------------------------------------- */
  /* Mobile navigation                                                  */
  /* ---------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (event) {
      var isClickInside = nav.contains(event.target) || toggle.contains(event.target);
      if (!isClickInside && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* Smooth scroll for in-page anchors (native CSS handles most, this  */
  /* ensures graceful behaviour + accounts for sticky header offset)   */
  /* ---------------------------------------------------------------- */
  function initSmoothAnchors() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener("click", function (event) {
        var targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        var target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        var headerOffset = document.getElementById("siteHeader").offsetHeight;
        var elementPosition = target.getBoundingClientRect().top + window.scrollY;
        var offsetPosition = elementPosition - headerOffset + 1;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Scroll reveal animations                                           */
  /* ---------------------------------------------------------------- */
  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    var revealItem = function (el) {
      var delay = el.getAttribute("data-reveal-delay");
      if (delay) {
        el.style.transitionDelay = delay + "ms";
      }
      el.classList.add("is-visible");
    };

    if (!("IntersectionObserver" in window)) {
      items.forEach(revealItem);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealItem(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });

    window.setTimeout(function () {
      items.forEach(function (el) {
        if (!el.classList.contains("is-visible")) {
          revealItem(el);
        }
      });
    }, 250);
  }

  /* ---------------------------------------------------------------- */
  /* Animated statistic counters                                        */
  /* ---------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    var animate = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1800;
      var startTime = null;

      var step = function (timestamp) {
        if (startTime === null) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
        var current = Math.floor(eased * target);
        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      };

      window.requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------- */
  /* Button ripple micro-interaction                                    */
  /* ---------------------------------------------------------------- */
  function initButtonRipples() {
    var buttons = document.querySelectorAll(".btn");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        var rect = btn.getBoundingClientRect();
        var ripple = document.createElement("span");
        var size = Math.max(rect.width, rect.height);

        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (event.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (event.clientY - rect.top - size / 2) + "px";

        btn.appendChild(ripple);

        window.setTimeout(function () {
          ripple.remove();
        }, 700);
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Back to top button                                                 */
  /* ---------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;

    var toggleVisibility = function () {
      if (window.scrollY > 640) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
      }
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Newsletter form (front-end only demo handling)                     */
  /* ---------------------------------------------------------------- */
  function initNewsletterForm() {
    var form = document.getElementById("newsletterForm");
    var note = document.getElementById("newsletterNote");
    if (!form || !note) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = document.getElementById("newsletterEmail");
      var email = input ? input.value.trim() : "";
      var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        note.textContent = "Please enter a valid email address.";
        note.style.color = "var(--accent-red)";
        return;
      }

      note.textContent = "Thanks for subscribing! Watch your inbox for updates.";
      note.style.color = "var(--primary-green-light)";
      form.reset();
    });
  }

})();