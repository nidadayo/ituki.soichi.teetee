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

// Visitor Counter

async function updateVisitorCount() {

  const counter = document.getElementById("visitorCount");

  if (!counter) {
    return;
  }

  console.log("Visitor counter START");

  try {

    const { data, error } = await supabaseClient
      .from("visitors")
      .select("count")
      .eq("id", 1)
      .single();

    if (error) {

      console.error("Visitor SELECT ERROR:", error);

      return;
    }

    console.log("Current count:", data.count);

    const newCount = data.count + 1;

    const { error: updateError } = await supabaseClient
      .from("visitors")
      .update({
        count: newCount
      })
      .eq("id", 1);

    if (updateError) {

      console.error("Visitor UPDATE ERROR:", updateError);

      return;
    }

    counter.textContent = newCount.toLocaleString();

    console.log("Visitor count updated:", newCount);

  } catch (error) {

    console.error("Visitor counter ERROR:", error);

  }

}

updateVisitorCount();
