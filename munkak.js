const GRID = document.getElementById("munkak-grid");
const FILTERS = document.getElementById("munkak-filters");

const CATEGORY_ICONS = {
  all: "assets/images/category-icons/badge-ajandek.png",
  lampak: "assets/images/category-icons/badge-alkoto.png",
  nevtablak: "assets/images/category-icons/icon-hazavato.png",
  kulcstartok: "assets/images/category-icons/badge-ajandek.png",
  figurak: "assets/images/category-icons/icon-gyujtoi.png",
  dekoraciok: "assets/images/category-icons/icon-dekoracio.png",
  emlektargyak: "assets/images/category-icons/badge-emlek.png",
  "ceges-targyak": "assets/images/category-icons/badge-ceges.png",
  prototipusok: "assets/images/category-icons/badge-alkoto.png"
};

let allWorks = [];

async function init() {
  if (!GRID || !FILTERS) return;

  let data;
  try {
    const res = await fetch("munkak-data.json");
    if (!res.ok) throw new Error(res.status);
    data = await res.json();
  } catch (err) {
    console.warn("munkak-data.json nem elérhető:", err);
    return;
  }

  allWorks = data.munkak || [];
  appendChips(data.kategoriak || []);
  renderFeatured(allWorks);

  FILTERS.addEventListener("click", (event) => {
    const chip = event.target.closest(".munkak-chip");
    if (!chip) return;

    FILTERS.querySelectorAll(".munkak-chip").forEach((item) => item.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;
    const works = filter === "*" ? allWorks.filter((item) => item.kiemelt) : allWorks.filter((item) => item.kategoria === filter);
    render(works.slice(0, 6));
  });
}

function appendChips(kategoriak) {
  kategoriak.forEach((category) => {
    const button = document.createElement("button");
    button.className = "munkak-chip";
    button.type = "button";
    button.dataset.filter = category.id;
    button.innerHTML = `${iconHTML(category.id, "munkak-chip__icon")}<span>${category.nev}</span>`;
    FILTERS.appendChild(button);
  });
}

function renderFeatured(items) {
  render(items.filter((item) => item.kiemelt).slice(0, 6));
}

function render(items) {
  GRID.innerHTML = items.length
    ? items.map(cardHTML).join("")
    : '<p class="munkak-empty">Ebben a kategóriában hamarosan jelennek meg munkák.</p>';

  GRID.querySelectorAll(".munkak-card").forEach((el, index) => {
    el.style.animationDelay = `${index * 45}ms`;
    el.classList.add("munkak-card--animate");
  });
}

function cardHTML(item) {
  return `
<article class="munkak-card">
  <a class="munkak-card__img-link" href="${item.link}">
    <img src="${item.kep}" alt="${item.cim}" loading="lazy">
  </a>
  <div class="munkak-card__body">
    <span class="munkak-card__tag">${iconHTML(item.kategoria, "munkak-tag-icon")}<span>${item.kategoria_cimke}</span></span>
    <h3>${item.cim}</h3>
    <p>${item.leiras || ""}</p>
    <a class="munkak-card__link" href="${item.link}">Részletek <span aria-hidden="true">→</span></a>
  </div>
</article>`;
}

function iconHTML(categoryId, className) {
  const src = CATEGORY_ICONS[categoryId] || CATEGORY_ICONS.all;
  return `<span class="${className}" aria-hidden="true"><img src="${src}" alt="" loading="lazy"></span>`;
}

init();
