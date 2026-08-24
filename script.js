// Supabase

const SUPABASE_URL = "https://qzwlybbjojeynhoghmyz.supabase.co";
const SUPABASE_KEY = "sb_publishable_aLU0ouME6VY_C-Yvc5SRYQ_GfSFbvmd";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// Supabase Test

async function testSupabase() {
  const { error } = await supabase
    .from("cases")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Supabase connection error:", error);
    return;
  }

  console.log("Supabase connection successful!");
}

testSupabase();


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
