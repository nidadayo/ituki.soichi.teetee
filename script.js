// Supabase

console.log("JS START");

const SUPABASE_URL =
  "https://qzwlybbjojeynhoghmyz.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_aLU0ouME6VY_C-Yvc5SRYQ_GfSFbvmd";

let supabaseClient = null;

try {

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  console.log("SUPABASE OK");

} catch (error) {

  console.error(
    "SUPABASE ERROR:",
    error
  );

}


// Hamburger

const hamburger =
  document.getElementById("hamburger");

const nav =
  document.getElementById("nav");

if (hamburger && nav) {

  hamburger.addEventListener(
    "click",
    () => {

      hamburger.classList.toggle(
        "active"
      );

      nav.classList.toggle(
        "active"
      );

    }
  );

}


// Visitor Counter

async function updateVisitorCount() {

  const counter =
    document.getElementById(
      "visitorCount"
    );

  if (!counter) {
    return;
  }

  if (!supabaseClient) {
    return;
  }

  try {

    const {
      data,
      error
    } = await supabaseClient
      .from("visitors")
      .select("count")
      .eq("id", 1)
      .single();

    if (error) {

      console.error(
        "Visitor SELECT ERROR:",
        error
      );

      return;
    }

    const newCount =
      data.count + 1;

    const {
      error: updateError
    } = await supabaseClient
      .from("visitors")
      .update({
        count: newCount
      })
      .eq("id", 1);

    if (updateError) {

      console.error(
        "Visitor UPDATE ERROR:",
        updateError
      );

      return;
    }

    counter.textContent =
      newCount.toLocaleString();

  } catch (error) {

    console.error(
      "Visitor ERROR:",
      error
    );

  }

}

updateVisitorCount();


// Visitor ID

function getVisitorId() {

  let visitorId =
    localStorage.getItem(
      "visitor_id"
    );

  if (!visitorId) {

    visitorId =
      crypto.randomUUID();

    localStorage.setItem(
      "visitor_id",
      visitorId
    );

  }

  return visitorId;

}


// Cases

async function loadCases() {

  const caseList =
    document.getElementById(
      "caseList"
    );

  if (!caseList) {
    return;
  }

  if (!supabaseClient) {
    return;
  }

  try {

    const {
      data,
      error
    } = await supabaseClient
      .from("cases")
      .select(
        "id, title, content, created_at"
      )
      .order("id", {
        ascending: true
      });

    if (error) {

      console.error(
        "Cases SELECT ERROR:",
        error
      );

      return;
    }

    caseList.innerHTML = "";

    for (const [index, item] of data.entries()) {

      const article =
        document.createElement(
          "article"
        );

      article.className =
        "case-card";

      article.innerHTML = `
        <span class="case-number">
          CASE ${String(index + 1).padStart(2, "0")}
        </span>

        <h2 class="case-title">
          ${item.title}
        </h2>

        <p class="case-content">
          ${item.content}
        </p>

        <button
          class="case-like"
          data-case-id="${item.id}"
          type="button"
        >
          ❤️
          <span class="like-count">
            0
          </span>
        </button>
      `;

      caseList.appendChild(
        article
      );

      const button =
        article.querySelector(
          ".case-like"
        );

      await updateLikeCount(
        item.id,
        button
      );

      await checkLiked(
        item.id,
        button
      );

    }

  } catch (error) {

    console.error(
      "Cases ERROR:",
      error
    );

  }

}


// Check Like

async function checkLiked(
  caseId,
  button
) {

  const visitorId =
    getVisitorId();

  const {
    data,
    error
  } = await supabaseClient
    .from("likes")
    .select("id")
    .eq("case_id", caseId)
    .eq("visitor_id", visitorId)
    .maybeSingle();

  if (error) {

    console.error(
      "Like CHECK ERROR:",
      error
    );

    return;
  }

  if (data) {

    button.classList.add(
      "liked"
    );

  }

}


// Add / Remove Like

async function addLike(
  caseId,
  button
) {

  const visitorId =
    getVisitorId();

  try {

    const {
      data: existingLike,
      error: checkError
    } = await supabaseClient
      .from("likes")
      .select("id")
      .eq("case_id", caseId)
      .eq("visitor_id", visitorId)
      .maybeSingle();

    if (checkError) {

      console.error(
        "Like CHECK ERROR:",
        checkError
      );

      return;
    }


    // Remove Like

    if (existingLike) {

      const {
        error
      } = await supabaseClient
        .from("likes")
        .delete()
        .eq(
          "id",
          existingLike.id
        );

      if (error) {

        console.error(
          "Like DELETE ERROR:",
          error
        );

        return;
      }

      button.classList.remove(
        "liked"
      );

    }


    // Add Like

    else {

      const {
        error
      } = await supabaseClient
        .from("likes")
        .insert({
          case_id: caseId,
          visitor_id: visitorId
        });

      if (error) {

        console.error(
          "Like INSERT ERROR:",
          error
        );

        return;
      }

      button.classList.add(
        "liked"
      );

    }

    await updateLikeCount(
      caseId,
      button
    );

  } catch (error) {

    console.error(
      "Like ERROR:",
      error
    );

  }

}


// Like Count

async function updateLikeCount(
  caseId,
  button
) {

  const {
    count,
    error
  } = await supabaseClient
    .from("likes")
    .select("*", {
      count: "exact",
      head: true
    })
    .eq(
      "case_id",
      caseId
    );

  if (error) {

    console.error(
      "Like COUNT ERROR:",
      error
    );

    return;
  }

  const countElement =
    button.querySelector(
      ".like-count"
    );

  if (countElement) {

    countElement.textContent =
      count ?? 0;

  }

}


// Like Buttons

document.addEventListener(
  "click",
  (event) => {

    const button =
      event.target.closest(
        ".case-like"
      );

    if (!button) {
      return;
    }

    const caseId =
      Number(
        button.dataset.caseId
      );

    addLike(
      caseId,
      button
    );

  }
);


// Load Cases

loadCases();
