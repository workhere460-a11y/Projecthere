const content = document.getElementById("articleContent");
const params = new URLSearchParams(window.location.search);
const article = articles.find(item => item.id === params.get("id"));
if (!article) {
  content.innerHTML = `<div class="not-found"><h1>Article not found</h1><p>The article may have moved or the link may be incorrect.</p><a class="primary-link" href="index.html#articles">Return to articles →</a></div>`;
} else {
  document.title = `${article.title} | Wellness Daily`;
  document.querySelector('meta[name="description"]').setAttribute("content", article.excerpt);
  content.innerHTML = `<div class="article-cover art-${article.art}">${article.icon}</div>
    <div class="article-heading"><span class="category">${article.category}</span><h1>${article.title}</h1><p class="article-meta">${article.time} · Wellness Daily</p></div>
    <div class="article-body"><p class="article-intro">${article.intro}</p>
    ${article.sections.map(([heading, paragraph]) => `<section><h2>${heading}</h2><p>${paragraph}</p></section>`).join("")}
    </div>`;
  const related = articles.filter(a => a.id !== article.id).slice(0, 3);
  document.getElementById("relatedGrid").innerHTML = related.map(a => `<a class="related-card" href="article.html?id=${encodeURIComponent(a.id)}"><span class="related-icon art-${a.art}">${a.icon}</span><span><small>${a.category}</small><strong>${a.title}</strong><em>Read article →</em></span></a>`).join("");
}