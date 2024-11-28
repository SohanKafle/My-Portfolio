// Toggle the navbar menu
function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('show');
    console.log('Navbar is now', navbar.classList.contains('show') ? 'visible' : 'hidden');
  } else {
    console.error('Navbar not found');
  }
}

// Debounce function for optimizing scroll events
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Smooth scroll using native API
$(".header ul li a").click(function (e) {
  e.preventDefault();
  const target = $(this).attr("href");
  const section = document.querySelector(target);

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if ($('.navbar').hasClass('show')) {
    toggleMenu();
  }

  // Active link highlighting
  $(".header ul li a").removeClass("active");
  $(this).addClass("active");
});

// Update active section based on scroll position
function updateActiveSection() {
  const scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function () {
    const target = $(this).attr("id");
    const offset = $(this).offset().top;
    const height = $(this).outerHeight();

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

// Typing effect on Name
const nameElement = document.getElementById('name');
const texts = [
  "Sohan Kafle",
  "a Student",
  "a Frontend Developer"
];

let textIndex = 0;
let charIndex = 0;
let currentText = '';

function type() {
  if (charIndex < currentText.length) {
    nameElement.innerHTML += currentText.charAt(charIndex);
    charIndex++;
    setTimeout(type, 150);
  } else {
    setTimeout(deleteText, 1000);
  }
}

function deleteText() {
  if (charIndex > 0) {
    nameElement.innerHTML = currentText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteText, 100);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    currentText = texts[textIndex];
    setTimeout(type, 500);
  }
}

// Document ready function
$(document).ready(function () {
  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
  });

  // Debounce the scroll event for performance
  $(window).scroll(debounce(updateActiveSection, 100));

  // Defer ScrollReveal initialization to after full load
  window.addEventListener('load', function () {
    const scrollRevealConfig = {
      distance: "50px",  // Reduced animation distance
      duration: 800,     // Faster reveal duration
      delay: 50,         // Shorter initial delay
      reset: false,      // Do not reset animations on scroll
      viewFactor: 0.2,   // Trigger animations when 20% of element is visible
    };

    const sr = ScrollReveal(scrollRevealConfig);

    // Apply ScrollReveal in batches, adjust interval for faster reveal
    sr.reveal(".header a, .profile-photo, .about-content, .education", { origin: "left", interval: 100 });
    sr.reveal(".profile-text, .about-skills, .internship", { origin: "right", interval: 100 });
    sr.reveal(".project-title, .contact-header, .listProject", { origin: "top", interval: 100 });
    sr.reveal(".projects, .contact-in, .skill", { origin: "bottom", interval: 100 });
  });

  // Navbar toggle button listener
  const toggleButton = document.querySelector('.navbar-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleMenu);
  }
});

// Set the current year dynamically
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// Typing effect initialization
window.onload = function () {
  currentText = texts[textIndex];
  type();
};
