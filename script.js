// Supabase Test

console.log("JS START");

console.log("window.supabase =", window.supabase);

const SUPABASE_URL = "https://qzwlybbjojeynhoghmyz.supabase.co";

const SUPABASE_KEY = "sb_publishable_aLU0ouME6VY_C-Yvc5SRYQ_GfSFbvmd";

let supabaseClient = null;

try {

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  console.log("SUPABASE OK");

} catch (error) {

  console.error("SUPABASE ERROR");
  console.error(error);

}


// Hamburger

console.log("HAMBURGER START");

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

console.log("hamburger =", hamburger);
console.log("nav =", nav);

if (hamburger && nav) {

  hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");
    nav.classList.toggle("active");

  });

  console.log("HAMBURGER OK");

}
