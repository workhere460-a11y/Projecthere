// Footer year
document.querySelectorAll(".year, #year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

// Article elements
const grid = document.getElementById("articleGrid");

if (grid && typeof articles !== "undefined") {

  const search = document.getElementById("searchInput");
  const category = document.getElementById("categoryFilter");
  const count = document.getElementById("articleCount");
  const empty = document.getElementById("emptyState");

  function render() {

    const term = search ? search.value.trim().toLowerCase() : "";
    const selected = category ? category.value : "all";

    const results = articles.filter(a => {
      const text = `${a.title || ""} ${a.category || ""} ${a.excerpt || ""} ${a.intro || ""}`.toLowerCase();

      return (
        (selected === "all" || a.category === selected) &&
        text.includes(term)
      );
    });

    // Article count
    if (count) {
      count.textContent = `${results.length} ${results.length === 1 ? "article" : "articles"}`;
    }

    // Empty search message
    if (empty) {
      empty.hidden = results.length > 0;
    }

    // Render articles
    grid.innerHTML = results.map(a => `
      <article class="article-card">
        <div class="card-art art-${a.art || "default"}" aria-hidden="true">
          ${a.icon || ""}
        </div>

        <div class="card-content">
          <span class="category">${a.category || ""}</span>
          <h3>${a.title || ""}</h3>
          <p>${a.excerpt || ""}</p>

          <div class="card-bottom">
            <a class="read-more" href="article.html?id=${encodeURIComponent(a.id)}">
              Read more <span>→</span>
            </a>
            <span class="read-time">${a.time || ""}</span>
          </div>
        </div>
      </article>
    `).join("");
  }

  // Search listener
  if (search) {
    search.addEventListener("input", render);
  }

  // Category listener
  if (category) {
    category.addEventListener("change", render);
  }

  // Initial render
  render();
}
