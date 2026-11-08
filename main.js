document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle && mainNav) menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));

const grid = document.getElementById("articleGrid");
if (grid && typeof articles !== "undefined") {
  const search = document.getElementById("searchInput");
  const category = document.getElementById("categoryFilter");
  const count = document.getElementById("articleCount");
  const empty = document.getElementById("emptyState");
  function render() {
    const term = search.value.trim().toLowerCase();
    const selected = category.value;
    const results = articles.filter(a => (selected === "all" || a.category === selected) &&
      `${a.title} ${a.category} ${a.excerpt} ${a.intro}`.toLowerCase().includes(term));
    count.textContent = `${results.length} ${results.length === 1 ? "article" : "articles"}`;
    empty.hidden = results.length > 0;
    grid.innerHTML = results.map(a => `<article class="article-card">
      <div class="card-art art-${a.art}" aria-hidden="true">${a.icon}</div>
      <div class="card-content"><span class="category">${a.category}</span><h3>${a.title}</h3><p>${a.excerpt}</p>
      <div class="card-bottom"><a class="read-more" href="article.html?id=${encodeURIComponent(a.id)}">Read more <span>→</span></a><span class="read-time">${a.time}</span></div></div>
    </article>`).join("");
  }
  search.addEventListener("input", render);
  category.addEventListener("change", render);
  render();
}