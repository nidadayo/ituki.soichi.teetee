
// Hamburger

document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  if (!hamburger || !nav) {
    console.error("Hamburger or navigation not found.");
    return;
  }

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });


  // Navigation

  const navLinks = nav.querySelectorAll("a");

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

});
