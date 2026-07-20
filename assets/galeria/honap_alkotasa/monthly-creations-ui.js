(function () {
  var creations = Array.isArray(window.LAYERO_MONTHLY_CREATIONS)
    ? window.LAYERO_MONTHLY_CREATIONS
    : [];
  var grid = document.getElementById('gl-monthly-grid');
  var featured = document.getElementById('gl-featured');
  if (!creations.length || !grid || !featured) return;

  var language = document.documentElement.lang === 'ro' ? 'ro' : 'hu';
  var assetPrefix = language === 'ro' ? '../' : '';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var image = document.getElementById('gl-featured-image');
  var kicker = document.getElementById('gl-featured-kicker');
  var title = document.getElementById('gl-featured-title');
  var description = document.getElementById('gl-featured-desc');
  var facts = document.getElementById('gl-featured-facts');
  var cta = document.getElementById('gl-featured-cta');
  var selectedId = creations[0].id;

  function imagePath(item, variant) {
    return assetPrefix + 'assets/galeria/honap_alkotasa/' + item.folder + '/featured-' + variant + '.webp';
  }

  function dateLabel(item) {
    return language === 'ro'
      ? item.month[language] + ' ' + item.year
      : item.year + '. ' + item.month[language];
  }

  function createFact(value, label) {
    var fact = document.createElement('div');
    fact.className = 'gl-featured__fact';
    var strong = document.createElement('strong');
    var small = document.createElement('small');
    strong.textContent = value;
    small.textContent = label;
    fact.append(strong, small);
    return fact;
  }

  function updateActiveCards() {
    grid.querySelectorAll('.gl-month-card').forEach(function (card) {
      var active = card.dataset.monthId === selectedId;
      card.classList.toggle('is-on', active);
      card.setAttribute('aria-pressed', String(active));
    });
  }

  function showCreation(item, scrollToFeature) {
    if (!item) return;
    selectedId = item.id;
    image.src = imagePath(item, 'display');
    image.alt = item.alt[language];
    kicker.textContent = (language === 'ro' ? 'Creația lunii · ' : 'Kiemelt alkotás · ') + dateLabel(item);
    title.replaceChildren(document.createTextNode(item.title[language]), document.createElement('br'));
    var subtitle = document.createElement('em');
    subtitle.textContent = item.subtitle[language];
    title.appendChild(subtitle);
    description.textContent = item.description[language];
    facts.replaceChildren();
    item.facts[language].forEach(function (fact) {
      facts.appendChild(createFact(fact[0], fact[1]));
    });
    cta.querySelector('span').textContent = item.cta[language];
    updateActiveCards();

    if (scrollToFeature && window.innerWidth <= 680) {
      featured.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  creations.forEach(function (item) {
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'gl-month-card';
    card.dataset.monthId = item.id;
    card.dataset.year = String(item.year);
    card.setAttribute('aria-label', dateLabel(item) + ': ' + item.title[language]);

    var media = document.createElement('span');
    media.className = 'gl-month-card__media';
    var thumb = document.createElement('img');
    thumb.src = imagePath(item, 'thumb');
    thumb.alt = '';
    thumb.width = 480;
    thumb.height = 480;
    thumb.loading = 'lazy';
    thumb.decoding = 'async';
    media.appendChild(thumb);

    var meta = document.createElement('span');
    var date = document.createElement('small');
    date.className = 'gl-month-card__date';
    date.textContent = dateLabel(item);
    var name = document.createElement('strong');
    name.className = 'gl-month-card__name';
    name.textContent = item.title[language];
    meta.append(date, name);
    card.append(media, meta);
    card.addEventListener('click', function () { showCreation(item, true); });
    grid.appendChild(card);
  });

  document.querySelectorAll('.gl-monthly-year').forEach(function (button) {
    button.setAttribute('aria-pressed', String(button.classList.contains('is-on')));
    button.addEventListener('click', function () {
      var year = button.dataset.monthYear;
      document.querySelectorAll('.gl-monthly-year').forEach(function (other) {
        var active = other === button;
        other.classList.toggle('is-on', active);
        other.setAttribute('aria-pressed', String(active));
      });
      grid.querySelectorAll('.gl-month-card').forEach(function (card) {
        card.hidden = year !== 'all' && card.dataset.year !== year;
      });
    });
  });

  showCreation(creations[0], false);
})();
