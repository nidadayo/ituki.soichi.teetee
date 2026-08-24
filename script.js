// Hamburger

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});


// Navigation

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("active");
  });
});


// ESC

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hamburger.classList.remove("active");
    nav.classList.remove("active");
  }
});
