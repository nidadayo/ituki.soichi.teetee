// Hamburger

document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  if (hamburger && nav) {

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

  }

});


// Visitor Counter

async function updateVisitorCount() {

  const counter = document.getElementById("visitorCount");

  if (!counter) {
    return;
  }

  try {

    // 現在のカウントを取得

    const { data, error } = await supabase
      .from("visitors")
      .select("count")
      .eq("id", 1)
      .single();

    if (error) {

      console.error(
        "Visitor count fetch error:",
        error
      );

      return;

    }


    // +1

    const newCount = data.count + 1;


    // データベースを更新

    const { error: updateError } = await supabase
      .from("visitors")
      .update({
        count: newCount
      })
      .eq("id", 1);


    if (updateError) {

      console.error(
        "Visitor count update error:",
        updateError
      );

      return;

    }


    // 画面に表示

    counter.textContent = newCount.toLocaleString();

  } catch (error) {

    console.error(
      "Visitor counter error:",
      error
    );

  }

}


// Visitor Counter Start

updateVisitorCount();
