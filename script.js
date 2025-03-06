// Funzione per muovere il carosello
function moveCarousel(direction, containerSelector) {
  const carousel = document.querySelector(containerSelector + " .projects-container");
  const projectGroups = carousel.querySelectorAll(".project-group");
  let currentIndex = parseInt(carousel.dataset.currentIndex) || 0;

  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = projectGroups.length - 1;
  } else if (currentIndex >= projectGroups.length) {
    currentIndex = 0;
  }

  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;
  carousel.dataset.currentIndex = currentIndex;
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("Website loaded successfully!");

  // Toggle del menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Header "shrink" on scroll
  const navAnchors = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }

    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; 
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navAnchors.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Carosello Desktop
  const desktopLeft = document.querySelector("#projects-desktop .left-arrow");
  const desktopRight = document.querySelector("#projects-desktop .right-arrow");
  if (desktopLeft && desktopRight) {
    desktopLeft.addEventListener("click", () => moveCarousel(-1, "#projects-desktop"));
    desktopRight.addEventListener("click", () => moveCarousel(1, "#projects-desktop"));
  }

  // Carosello Mobile
  const mobileLeft = document.querySelector("#projects-mobile .left-arrow");
  const mobileRight = document.querySelector("#projects-mobile .right-arrow");
  if (mobileLeft && mobileRight) {
    mobileLeft.addEventListener("click", () => moveCarousel(-1, "#projects-mobile"));
    mobileRight.addEventListener("click", () => moveCarousel(1, "#projects-mobile"));
  }

  // Animazioni on scroll
  const animatedSections = document.querySelectorAll(".animate-on-scroll");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  animatedSections.forEach(section => observer.observe(section));
});
