// Supabase

const SUPABASE_URL = "https://qzwlybbjojeynhoghmyz.supabase.co";

const SUPABASE_KEY = "sb_publishable_aLU0ouME6VY_C-Yvc5SRYQ_GfSFbvmd";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Supabase connected");


// Hamburger

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger && nav) {

  hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");
    nav.classList.toggle("active");

  });

}
