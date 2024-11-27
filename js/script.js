// Toggle the navbar menu
function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('show'); // Toggle visibility class
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

  // Close the menu on item click for mobile view
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

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function () {
    const target = $(this).attr("id");
    const offset = $(this).offset().top;
    const height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
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
    setTimeout(type, 150); // Typing speed
  } else {
    setTimeout(deleteText, 1000); // Wait 1 second before deleting
  }
}

function deleteText() {
  if (charIndex > 0) {
    nameElement.innerHTML = currentText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteText, 100); // Deleting speed
  } else {
    textIndex = (textIndex + 1) % texts.length; // Move to the next text
    currentText = texts[textIndex]; // Get the next text
    setTimeout(type, 500); // Wait before starting to type again
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

  // Initial content revealing with ScrollReveal
  ScrollReveal({
    distance: "100px",
    duration: 1500,
    delay: 100,
    reset: false
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-header, .listProject", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact-in, .skill", {
    origin: "bottom"
  });

  // Set the current year dynamically
  const currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;

  // Typing effect initialization
  window.onload = function () {
    currentText = texts[textIndex]; // Initialize the first text
    type(); // Start typing effect
  };
});
