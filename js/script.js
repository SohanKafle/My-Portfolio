$(document).ready(function () {

  //sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });


  //Initial content revealing js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-header, .listProject", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact-in, .skill", {
    origin: "bottom"
  });

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function () {
          msg.innerHTML = ""
        }, 5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })

});

function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

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

window.onload = function () {
  currentText = texts[textIndex]; // Initialize the first text
  type(); // Start typing effect
};


// Toggle the navbar menu
function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('show'); // Toggle the 'show' class
}

// Set the current year 
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;