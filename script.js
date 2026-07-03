const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector(".site-nav");

navToggle?.querySelector(".nav-toggle__line")?.classList.replace("nav-toggle__line", "nav-toggle__bars");

if (siteNav && !siteNav.querySelector(".site-nav__links")) {
  const mobileHead = document.createElement("div");
  mobileHead.className = "site-nav__mobile-head";
  mobileHead.innerHTML = "<span>Layero navigáció</span><strong>Válassz irányt</strong>";

  const linkWrap = document.createElement("div");
  linkWrap.className = "site-nav__links";
  [...siteNav.querySelectorAll(":scope > a")].forEach((link) => linkWrap.appendChild(link));

  const mobileCta = document.createElement("div");
  mobileCta.className = "site-nav__mobile-cta";
  mobileCta.setAttribute("aria-label", "Gyors műveletek");
  mobileCta.innerHTML = '<a class="btn btn--shop" href="https://shop.layero.ro" target="_blank" rel="noopener noreferrer">Shop</a><a class="site-nav__contact" href="mailto:hello@layero.ro">hello@layero.ro</a>';

  siteNav.append(mobileHead, linkWrap, mobileCta);
}

let navClosers = [...document.querySelectorAll("[data-nav-close]")];

if (navToggle && !navClosers.length) {
  const navBackdrop = document.createElement("div");
  navBackdrop.className = "site-nav-backdrop";
  navBackdrop.dataset.navClose = "";
  navBackdrop.setAttribute("aria-hidden", "true");
  document.body.insertBefore(navBackdrop, document.querySelector("main"));
  navClosers = [navBackdrop];
}

const navLinks = document.querySelectorAll(".site-nav a");
const navToggleLabel = navToggle?.querySelector(".sr-only");
const newsletterModal = document.querySelector("[data-newsletter-modal]");
const newsletterPanel = newsletterModal?.querySelector(".newsletter-modal__panel");
const newsletterOpeners = document.querySelectorAll("[data-newsletter-open]");
const newsletterClosers = document.querySelectorAll("[data-newsletter-close]");
const newsletterForm = document.querySelector("[data-newsletter-form]");
const newsletterSuccess = document.querySelector("[data-newsletter-success]");
const newsletterStatus = document.querySelector("[data-newsletter-status]");
const newsletterEmail = document.querySelector("#newsletter-email");
const newsletterCopyButton = document.querySelector("[data-copy-code]");
const newsletterCopyStatus = document.querySelector("[data-copy-status]");
const newsletterCouponCode = "LAYERO10";
const newsletterSubscribedKey = "layero-newsletter-subscribed";
const newsletterDismissedKey = "layero-newsletter-dismissed";
const newsletterAutoShownKey = "layero-newsletter-auto-shown";
let newsletterLastActiveElement = null;

document.documentElement.classList.add("js-enabled");

const heroFlowTrack = document.querySelector("[data-hero-flow-track]");

if (heroFlowTrack && !heroFlowTrack.dataset.loopReady) {
  const heroFlowOriginalItems = [...heroFlowTrack.children];

  function syncHeroFlowDistance() {
    const firstItem = heroFlowOriginalItems[0];
    const firstClone = heroFlowTrack.querySelector("[data-hero-flow-clone='true']");

    if (!firstItem || !firstClone) {
      return;
    }

    const distance = firstClone.offsetTop - firstItem.offsetTop;
    heroFlowTrack.style.setProperty("--hero-flow-loop-distance", `${distance * -1}px`);
  }

  heroFlowOriginalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.dataset.heroFlowClone = "true";
    heroFlowTrack.appendChild(clone);
  });

  heroFlowTrack.dataset.loopReady = "true";
  syncHeroFlowDistance();
  window.addEventListener("resize", syncHeroFlowDistance);
  window.addEventListener("load", syncHeroFlowDistance, { once: true });
  heroFlowTrack.classList.add("is-loop-ready");
}

function setNavOpen(isOpen) {
  document.body.classList.toggle("nav-open", isOpen);
  navToggle?.setAttribute("aria-expanded", String(isOpen));
  if (navToggleLabel) {
    navToggleLabel.textContent = isOpen ? "Menü bezárása" : "Menü megnyitása";
  }
}

navToggle?.addEventListener("click", () => {
  setNavOpen(!document.body.classList.contains("nav-open"));
});

navClosers.forEach((closer) => {
  closer.addEventListener("click", () => setNavOpen(false));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1060 && document.body.classList.contains("nav-open")) {
    setNavOpen(false);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Tab" && isNewsletterOpen()) {
    trapNewsletterFocus(event);
    return;
  }

  if (event.key === "Escape") {
    if (isNewsletterOpen()) {
      closeNewsletter();
      return;
    }

    setNavOpen(false);
  }
});

function getStored(storage, key) {
  try {
    return storage.getItem(key);
  } catch (error) {
    return null;
  }
}

function setStored(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch (error) {
    // Storage can fail in restricted browser modes; the popup still works.
  }
}

function isNewsletterOpen() {
  return Boolean(newsletterModal && !newsletterModal.hidden);
}

function hasNewsletterSubscription() {
  return Boolean(getStored(window.localStorage, newsletterSubscribedKey));
}

function setNewsletterView() {
  if (!newsletterForm || !newsletterSuccess) {
    return;
  }

  const isSubscribed = hasNewsletterSubscription();
  newsletterForm.hidden = isSubscribed;
  newsletterSuccess.hidden = !isSubscribed;

  if (newsletterStatus) {
    newsletterStatus.textContent = "";
  }

  if (newsletterCopyStatus) {
    newsletterCopyStatus.textContent = "";
  }
}

function openNewsletter({ auto = false } = {}) {
  if (!newsletterModal) {
    return;
  }

  newsletterLastActiveElement = document.activeElement;
  setNavOpen(false);
  setNewsletterView();
  newsletterModal.hidden = false;
  document.body.classList.add("newsletter-open");

  if (auto) {
    setStored(window.sessionStorage, newsletterAutoShownKey, "1");
  }

  window.setTimeout(() => {
    const focusTarget = hasNewsletterSubscription()
      ? newsletterCopyButton
      : newsletterEmail;

    (focusTarget || newsletterPanel)?.focus();
  }, 40);
}

function closeNewsletter() {
  if (!newsletterModal || newsletterModal.hidden) {
    return;
  }

  newsletterModal.hidden = true;
  document.body.classList.remove("newsletter-open");
  setStored(window.sessionStorage, newsletterDismissedKey, "1");

  if (
    newsletterLastActiveElement &&
    typeof newsletterLastActiveElement.focus === "function"
  ) {
    newsletterLastActiveElement.focus();
  }
}

function getNewsletterFocusableElements() {
  if (!newsletterModal) {
    return [];
  }

  return [
    ...newsletterModal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ),
  ].filter((element) => {
    const isInsideHiddenParent = element.closest("[hidden]");
    return !isInsideHiddenParent && element.offsetParent !== null;
  });
}

function trapNewsletterFocus(event) {
  const focusableElements = getNewsletterFocusableElements();

  if (!focusableElements.length) {
    event.preventDefault();
    newsletterPanel?.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

function shouldAutoOpenNewsletter() {
  return (
    newsletterModal &&
    !hasNewsletterSubscription() &&
    !getStored(window.sessionStorage, newsletterDismissedKey) &&
    !getStored(window.sessionStorage, newsletterAutoShownKey)
  );
}

function scheduleNewsletterPopup() {
  if (!shouldAutoOpenNewsletter()) {
    return;
  }

  const tryAutoOpen = () => {
    if (shouldAutoOpenNewsletter() && !document.body.classList.contains("nav-open")) {
      openNewsletter({ auto: true });
      return true;
    }
    return false;
  };

  const handleNewsletterScroll = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

    if (scrollProgress > 0.5 && tryAutoOpen()) {
      window.removeEventListener("scroll", handleNewsletterScroll);
      document.removeEventListener("mouseout", handleExitIntent);
    }
  };

  let moveCount = 0;
  const markMoved = () => {
    moveCount += 1;
    if (moveCount > 2) {
      window.removeEventListener("mousemove", markMoved);
    }
  };

  const handleExitIntent = (event) => {
    const leavingTopOfPage =
      moveCount > 2 && event.clientY <= 0 && !event.relatedTarget && !event.toElement;

    if (leavingTopOfPage && tryAutoOpen()) {
      window.removeEventListener("scroll", handleNewsletterScroll);
      document.removeEventListener("mouseout", handleExitIntent);
      window.removeEventListener("mousemove", markMoved);
    }
  };

  window.addEventListener("scroll", handleNewsletterScroll, { passive: true });
  window.addEventListener("mousemove", markMoved, { passive: true });

  window.setTimeout(() => {
    document.addEventListener("mouseout", handleExitIntent);
  }, 2500);
}

function fallbackCopyCoupon() {
  const textarea = document.createElement("textarea");
  textarea.value = newsletterCouponCode;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    return true;
  } catch (error) {
    return false;
  } finally {
    textarea.remove();
  }
}

newsletterOpeners.forEach((opener) => {
  opener.addEventListener("click", () => openNewsletter());
});

newsletterClosers.forEach((closer) => {
  closer.addEventListener("click", () => closeNewsletter());
});

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!newsletterForm.checkValidity()) {
    if (newsletterStatus) {
      newsletterStatus.textContent =
        "K\u00e9rj\u00fck add meg az email c\u00edmed, \u00e9s fogadd el a h\u00edrlev\u00e9l felt\u00e9teleit.";
    }

    newsletterForm.reportValidity();
    return;
  }

  const formData = new FormData(newsletterForm);
  const subscription = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    coupon: newsletterCouponCode,
    subscribedAt: new Date().toISOString(),
  };

  setStored(window.localStorage, newsletterSubscribedKey, JSON.stringify(subscription));
  setStored(window.sessionStorage, newsletterDismissedKey, "1");

  newsletterForm.reset();
  setNewsletterView();
  newsletterCopyButton?.focus();
});

newsletterCopyButton?.addEventListener("click", async () => {
  let copied = false;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(newsletterCouponCode);
      copied = true;
    } catch (error) {
      copied = fallbackCopyCoupon();
    }
  } else {
    copied = fallbackCopyCoupon();
  }

  if (newsletterCopyStatus) {
    newsletterCopyStatus.textContent = copied
      ? "Kuponk\u00f3d kim\u00e1solva."
      : "A kuponk\u00f3d: " + newsletterCouponCode;
  }
});

scheduleNewsletterPopup();

const knowledgeFilterButtons = [...document.querySelectorAll("[data-knowledge-filter]")];
const knowledgeCards = [...document.querySelectorAll("[data-knowledge-card]")];
const knowledgeGrid = document.querySelector("[data-knowledge-grid]");
const knowledgeFilterStatus = document.querySelector("[data-knowledge-filter-status]");

if (knowledgeFilterButtons.length && knowledgeCards.length) {
  const knowledgeCategories = new Set(
    knowledgeFilterButtons
      .map((button) => button.dataset.knowledgeFilter)
      .filter((category) => category && category !== "all")
  );

  const getKnowledgeCategories = (card) =>
    String(card.dataset.knowledgeCategories || "")
      .split(/\s+/)
      .filter(Boolean);

  const getFilterFromHash = () => {
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));

    if (hash === "osszes-bejegyzes") {
      return "all";
    }

    return knowledgeCategories.has(hash) ? hash : null;
  };

  const updateKnowledgeHash = (filter) => {
    const nextHash = filter === "all" ? "osszes-bejegyzes" : filter;
    const nextUrl = `${window.location.pathname}${window.location.search}#${nextHash}`;

    if (window.location.hash !== `#${nextHash}`) {
      window.history.replaceState(null, "", nextUrl);
    }
  };

  const setKnowledgeFilter = (filter, { updateHash = true } = {}) => {
    const activeFilter = filter === "all" || knowledgeCategories.has(filter) ? filter : "all";
    let visibleCount = 0;

    knowledgeFilterButtons.forEach((button) => {
      const isActive = button.dataset.knowledgeFilter === activeFilter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    knowledgeCards.forEach((card) => {
      const isVisible =
        activeFilter === "all" || getKnowledgeCategories(card).includes(activeFilter);

      card.hidden = !isVisible;
      card.classList.toggle("is-filtered-out", !isVisible);

      if (isVisible) {
        visibleCount += 1;
        card.classList.add("is-visible");
      }
    });

    knowledgeGrid?.setAttribute("data-active-filter", activeFilter);

    if (knowledgeFilterStatus) {
      knowledgeFilterStatus.textContent = `${visibleCount} bejegyz\u00e9s l\u00e1that\u00f3.`;
    }

    if (updateHash) {
      updateKnowledgeHash(activeFilter);
    }
  };

  knowledgeFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setKnowledgeFilter(button.dataset.knowledgeFilter || "all");
    });
  });

  window.addEventListener("hashchange", () => {
    const hashFilter = getFilterFromHash();

    if (hashFilter) {
      setKnowledgeFilter(hashFilter, { updateHash: false });
    }
  });

  setKnowledgeFilter(getFilterFromHash() || "all", { updateHash: false });
}

const categoryFilterButtons = [...document.querySelectorAll(".categories__filter")];
const categoryCards = [...document.querySelectorAll(".category-card")];
const categoryEmptyState = document.querySelector("[data-categories-empty]");

if (categoryFilterButtons.length && categoryCards.length) {
  const setCategoryFilter = (filter) => {
    let visibleCount = 0;

    categoryFilterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    categoryCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !isVisible);

      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (categoryEmptyState) {
      categoryEmptyState.hidden = visibleCount > 0;
    }
  };

  categoryFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setCategoryFilter(button.dataset.filter || "all");
    });
  });
}

const productWorldSections = [...document.querySelectorAll("[data-product-world]")];
const productGalleryExtensions = ["webp", "jpg", "jpeg", "png"];
const productGallerySlots = Array.from({ length: 12 }, (_, index) => index + 1);

function probeProductGalleryImage(src) {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => resolve(src);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

async function findProductGalleryImage(folder, slot) {
  const slotName = String(slot).padStart(2, "0");

  for (const extension of productGalleryExtensions) {
    const src = `${folder}/${slotName}.${extension}`;
    const found = await probeProductGalleryImage(src);

    if (found) {
      return found;
    }
  }

  return null;
}

function setProductGalleryImage(gallery, src, index) {
  const mainImage = gallery.querySelector("[data-gallery-main]");
  const thumbs = [...gallery.querySelectorAll("[data-gallery-thumb]")];
  const panel = gallery.closest("[data-product-panel]");
  const label = gallery.dataset.galleryLabel || "Kategória";

  if (mainImage) {
    mainImage.src = src;
    mainImage.alt = `${label} galéria kép ${index + 1}`;
  }

  if (panel && src) {
    panel.style.setProperty("--product-panel-image", `url("${src.replace(/"/g, '\\"')}")`);
  }

  thumbs.forEach((thumb, thumbIndex) => {
    const isActive = thumbIndex === index;
    thumb.classList.toggle("is-active", isActive);
    thumb.setAttribute("aria-pressed", String(isActive));
  });
}

function getProductGalleryFallbacks(gallery) {
  const fallbackList = gallery.dataset.galleryFallbacks || gallery.dataset.galleryFallback || "";
  return [...new Set(fallbackList.split(",").map((src) => src.trim()).filter(Boolean))];
}

function renderProductGallery(gallery, imageSources) {
  const thumbsWrap = gallery.querySelector("[data-gallery-thumbs]");
  const fallbackSources = getProductGalleryFallbacks(gallery);
  const label = gallery.dataset.galleryLabel || "Kategória";
  const sources = imageSources.length ? imageSources : fallbackSources;

  if (!thumbsWrap || !sources.length) {
    return;
  }

  thumbsWrap.innerHTML = "";

  sources.forEach((src, index) => {
    const thumb = document.createElement("button");
    thumb.className = "product-world__thumb";
    thumb.type = "button";
    thumb.dataset.galleryThumb = "";
    thumb.dataset.gallerySrc = src;
    thumb.setAttribute("aria-label", `${label} kép ${index + 1}`);
    thumb.setAttribute("aria-pressed", String(index === 0));

    const image = document.createElement("img");
    image.src = src;
    image.alt = "";

    thumb.appendChild(image);
    thumb.addEventListener("click", () => setProductGalleryImage(gallery, src, index));
    thumbsWrap.appendChild(thumb);
  });

  setProductGalleryImage(gallery, sources[0], 0);
}

async function hydrateProductGallery(gallery) {
  const folder = String(gallery.dataset.galleryFolder || "").replace(/\/$/, "");

  if (!folder) {
    return;
  }

  const foundSources = (
    await Promise.all(productGallerySlots.map((slot) => findProductGalleryImage(folder, slot)))
  ).filter(Boolean);

  renderProductGallery(gallery, foundSources);
}

productWorldSections.forEach((section) => {
  const productTabs = [...section.querySelectorAll("[data-product-tab]")];
  const productPanels = [...section.querySelectorAll("[data-product-panel]")];
  const productPrevButton = section.querySelector("[data-product-prev]");
  const productNextButton = section.querySelector("[data-product-next]");
  const productCount = section.querySelector("[data-product-count]");
  const productGalleries = [...section.querySelectorAll("[data-product-gallery]")];

  if (!productTabs.length || !productPanels.length) {
    return;
  }

  const getActiveProductIndex = () => {
    const activeIndex = productTabs.findIndex((tab) => tab.classList.contains("is-active"));
    return activeIndex >= 0 ? activeIndex : 0;
  };

  const setActiveProduct = (productId, { focusTab = false, animate = true } = {}) => {
    const nextIndex = Math.max(
      0,
      productTabs.findIndex((tab) => tab.dataset.productTab === productId)
    );
    const nextProductId = productTabs[nextIndex].dataset.productTab;

    productTabs.forEach((tab, index) => {
      const isActive = index === nextIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    productPanels.forEach((panel) => {
      const isActive = panel.dataset.productPanel === nextProductId;
      panel.hidden = !isActive;
      panel.classList.remove("is-entering");

      if (isActive && animate) {
        window.requestAnimationFrame(() => panel.classList.add("is-entering"));
      }
    });

    section.dataset.activeProduct = nextProductId;

    if (productCount) {
      productCount.textContent = `${nextIndex + 1} / ${productTabs.length}`;
    }

    if (focusTab) {
      productTabs[nextIndex].focus({ preventScroll: true });
      productTabs[nextIndex].scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };

  productTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setActiveProduct(tab.dataset.productTab);
    });

    tab.addEventListener("keydown", (event) => {
      const lastIndex = productTabs.length - 1;
      let nextIndex = null;

      if (event.key === "ArrowRight") {
        nextIndex = index === lastIndex ? 0 : index + 1;
      } else if (event.key === "ArrowLeft") {
        nextIndex = index === 0 ? lastIndex : index - 1;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = lastIndex;
      }

      if (nextIndex === null) {
        return;
      }

      event.preventDefault();
      setActiveProduct(productTabs[nextIndex].dataset.productTab, { focusTab: true });
    });
  });

  productPrevButton?.addEventListener("click", () => {
    const activeIndex = getActiveProductIndex();
    const previousIndex = activeIndex === 0 ? productTabs.length - 1 : activeIndex - 1;
    setActiveProduct(productTabs[previousIndex].dataset.productTab, { focusTab: true });
  });

  productNextButton?.addEventListener("click", () => {
    const activeIndex = getActiveProductIndex();
    const nextIndex = activeIndex === productTabs.length - 1 ? 0 : activeIndex + 1;
    setActiveProduct(productTabs[nextIndex].dataset.productTab, { focusTab: true });
  });

  setActiveProduct(productTabs[0].dataset.productTab, { animate: false });
  productGalleries.forEach((gallery) => {
    hydrateProductGallery(gallery);
  });
});

const categoryWorldPage = document.querySelector(".category-world");

if (categoryWorldPage) {
  const categoryRevealItems = [...categoryWorldPage.querySelectorAll(".reveal")];
  const categoryJumpLinks = [...categoryWorldPage.querySelectorAll(".category-jump a[href^='#']")];
  const categorySections = [...categoryWorldPage.querySelectorAll(".category-row[id]")];
  const categoryGalleries = [...categoryWorldPage.querySelectorAll("[data-category-gallery]")];

  if ("IntersectionObserver" in window) {
    const categoryRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          categoryRevealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    categoryRevealItems.forEach((item) => categoryRevealObserver.observe(item));

    const categoryLinksById = Object.fromEntries(
      categoryJumpLinks.map((link) => [link.getAttribute("href").slice(1), link])
    );

    const categorySpy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        categoryJumpLinks.forEach((link) => link.classList.remove("is-active"));
        const activeLink = categoryLinksById[entry.target.id];

        if (activeLink) {
          activeLink.classList.add("is-active");
          // Only scroll the nav row horizontally (for mobile pill overflow)
          // Never call scrollIntoView on a sticky element — it causes the page to jump vertically
          const jumpRow = activeLink.closest(".category-jump__row");
          if (jumpRow && jumpRow.scrollWidth > jumpRow.clientWidth) {
            const linkCenter = activeLink.offsetLeft + activeLink.offsetWidth / 2;
            jumpRow.scrollTo({ left: linkCenter - jumpRow.clientWidth / 2, behavior: "smooth" });
          }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    categorySections.forEach((section) => categorySpy.observe(section));
  } else {
    categoryRevealItems.forEach((item) => item.classList.add("in"));
  }

  const getCategoryGalleryFallbacks = (gallery) => {
    const fallbackList = gallery.dataset.categoryFallbacks || "";
    return [...new Set(fallbackList.split(",").map((src) => src.trim()).filter(Boolean))];
  };

  const setCategoryGalleryImage = (gallery, src, index) => {
    const mainImage = gallery.querySelector("[data-category-gallery-main]");
    const thumbs = [...gallery.querySelectorAll("[data-category-gallery-thumb]")];
    const label = gallery.dataset.categoryLabel || "Kategória";

    if (mainImage && src) {
      mainImage.src = src;
      mainImage.alt = `${label} kép ${index + 1}`;
    }

    thumbs.forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === index;
      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-pressed", String(isActive));
    });
  };

  const renderCategoryGallery = (gallery, sources) => {
    const thumbsWrap = gallery.querySelector("[data-category-gallery-thumbs]");
    const label = gallery.dataset.categoryLabel || "Kategória";

    if (!thumbsWrap || !sources.length) {
      return;
    }

    thumbsWrap.innerHTML = "";

    sources.forEach((src, index) => {
      const thumb = document.createElement("button");
      thumb.className = "category-media__thumb";
      thumb.type = "button";
      thumb.dataset.categoryGalleryThumb = "";
      thumb.dataset.categorySrc = src;
      thumb.setAttribute("aria-label", `${label} kép ${index + 1}`);
      thumb.setAttribute("aria-pressed", String(index === 0));

      const image = document.createElement("img");
      image.src = src;
      image.alt = "";

      thumb.appendChild(image);
      thumb.addEventListener("click", () => setCategoryGalleryImage(gallery, src, index));
      thumbsWrap.appendChild(thumb);
    });

    setCategoryGalleryImage(gallery, sources[0], 0);
  };

  const hydrateCategoryGallery = async (gallery) => {
    const folder = String(gallery.dataset.categoryFolder || "").replace(/\/$/, "");
    const fallbackSources = getCategoryGalleryFallbacks(gallery);

    if (!folder) {
      renderCategoryGallery(gallery, fallbackSources);
      return;
    }

    const foundSources = (
      await Promise.all(productGallerySlots.map((slot) => findProductGalleryImage(folder, slot)))
    ).filter(Boolean);

    renderCategoryGallery(gallery, foundSources.length ? foundSources : fallbackSources);
  };

  categoryGalleries.forEach((gallery) => {
    hydrateCategoryGallery(gallery);
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealSelector = [
  ".statement .eyebrow",
  ".statement h2",
  ".statement__body",
  ".statement__visual",
  ".services .section-title",
  ".service-card",
  ".how-command__origin",
  ".how-command__badge",
  ".how-command__map",
  ".how-command__header h2",
  ".how-command__header > p",
  ".how-command__step",
  ".how-command__divider",
  ".how-command__benefit",
  ".gallery .eyebrow",
  ".gallery-card",
  ".gallery__note",
  ".monthly-creation__panel",
  ".monthly-creation__more",
  ".process .eyebrow",
  ".process__panel",
  ".process-step",
  ".final-cta__panel",
  ".final-cta__panel > *",
  ".subpage-hero__copy > *",
  ".subpage-hero__media",
  ".subpage-heading",
  ".mini-title",
  ".mini-copy",
  ".page-card",
  ".feature-band",
  ".feature-band__item",
  ".split-section > *",
  ".process-node",
  ".faq-list details",
  ".wide-cta",
  ".article-category",
  ".knowledge-feature > *",
  ".knowledge-chip",
  ".knowledge-card",
  ".knowledge-duo > *",
  ".knowledge-newsletter > *",
  ".contact-panel",
  ".site-footer .footer__brand",
  ".site-footer .footer__links",
  ".site-footer .footer__contact",
  ".site-footer .footer__bottom",
  /* index szekciók */
  ".categories__header",
  ".category-card",
  ".categories__cta",
  ".hero-trust",
  ".photo-process__header",
  ".photo-process__cta",
  ".photo-process__benefits",
  ".customer-reviews__header",
  ".customer-review-card",
  ".community__header",
  ".community__signup",
  ".community__benefit",
  ".community__teaser",
  ".community__cta",
].join(", ");

const revealGroups = [
  ...document.querySelectorAll(".statement, .services, .how-command, .gallery, .process, .final-cta, .subpage-main, .site-footer, .categories, .photo-process, .customer-reviews, .community, .hero"),
];

const revealItems = revealGroups.flatMap((group) =>
  [...group.querySelectorAll(revealSelector)].map((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);

    if (
      item.matches(".service-card, .how-command__step, .how-command__benefit, .gallery-card, .process__panel, .final-cta__panel")
      || item.matches(".page-card, .feature-band, .wide-cta, .contact-panel")
      || item.matches(".category-card, .customer-review-card, .community__benefit")
    ) {
      item.classList.add("reveal-card");
    }

    return item;
  })
);

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px 12% 0px",
      threshold: 0.04,
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const revealVisibleItems = () => {
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
        item.classList.add("is-visible");
      }
    });
  };

  window.addEventListener("load", () => window.requestAnimationFrame(revealVisibleItems));
  window.addEventListener("hashchange", () => window.requestAnimationFrame(revealVisibleItems));
  window.requestAnimationFrame(revealVisibleItems);
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const statNumbers = [...document.querySelectorAll("[data-count-to]")];

if (statNumbers.length) {
  const formatStatNumber = (value) => Math.round(value).toLocaleString("hu-HU");

  const renderStatNumber = (el, value) => {
    const unit = el.dataset.countUnit;
    el.innerHTML = `${formatStatNumber(value)}<span class="stats__plus">+</span>${unit ? ` ${unit}` : ""}`;
  };

  const animateStatNumber = (el) => {
    const target = Number(el.dataset.countTo) || 0;

    if (prefersReducedMotion) {
      renderStatNumber(el, target);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      renderStatNumber(el, target * eased);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStatNumber(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    statNumbers.forEach((el) => statObserver.observe(el));
  } else {
    statNumbers.forEach((el) => renderStatNumber(el, Number(el.dataset.countTo) || 0));
  }
}

const communityForm = document.querySelector("[data-community-form]");
const communitySuccess = document.querySelector("[data-community-success]");
const communityFocusButton = document.querySelector("[data-community-focus]");
const communityTeaserViewport = document.querySelector("[data-community-slider-window]");
const communityTeaserTrack = document.querySelector("[data-community-slider]");
const communityTeaserNext = document.querySelector(".community__teaser-next");

communityForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!communityForm.checkValidity()) {
    communityForm.reportValidity();
    return;
  }

  communityForm.hidden = true;

  if (communitySuccess) {
    communitySuccess.hidden = false;
  }
});

communityFocusButton?.addEventListener("click", () => {
  const emailInput = communityForm?.querySelector("input[type='email']");
  document.querySelector("#community")?.scrollIntoView({ behavior: "smooth", block: "center" });
  emailInput?.focus({ preventScroll: true });
});

const setupCommunityTeaserSlider = () => {
  if (!communityTeaserViewport || !communityTeaserTrack) {
    return;
  }

  const firstSet = communityTeaserTrack.querySelector(".community__teaser-set");
  const firstImage = communityTeaserTrack.querySelector("img");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let paused = false;
  let frameId = 0;

  const getGap = () => {
    const styles = window.getComputedStyle(communityTeaserTrack);
    const columnGap = Number.parseFloat(styles.columnGap);
    const gap = Number.parseFloat(styles.gap);

    if (Number.isFinite(columnGap)) {
      return columnGap;
    }

    return Number.isFinite(gap) ? gap : 0;
  };

  const getLoopWidth = () => (firstSet ? firstSet.scrollWidth + getGap() : communityTeaserTrack.scrollWidth / 2);

  const normalizeScroll = () => {
    const loopWidth = getLoopWidth();

    if (loopWidth > 0 && communityTeaserViewport.scrollLeft >= loopWidth) {
      communityTeaserViewport.scrollLeft -= loopWidth;
    }
  };

  const tick = () => {
    if (!paused) {
      communityTeaserViewport.scrollLeft += 0.45;
      normalizeScroll();
    }

    frameId = window.requestAnimationFrame(tick);
  };

  communityTeaserNext?.addEventListener("click", () => {
    const cardWidth = firstImage?.getBoundingClientRect().width || communityTeaserViewport.clientWidth * 0.7;
    communityTeaserViewport.scrollBy({
      left: cardWidth + getGap(),
      behavior: "smooth",
    });

    window.setTimeout(normalizeScroll, 520);
  });

  communityTeaserViewport.addEventListener("mouseenter", () => {
    paused = true;
  });

  communityTeaserViewport.addEventListener("mouseleave", () => {
    paused = false;
  });

  communityTeaserViewport.addEventListener("focusin", () => {
    paused = true;
  });

  communityTeaserViewport.addEventListener("focusout", () => {
    paused = false;
  });

  communityTeaserViewport.addEventListener("scroll", normalizeScroll, { passive: true });

  if (!reducedMotion) {
    frameId = window.requestAnimationFrame(tick);
  }

  window.addEventListener("pagehide", () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }
  });
};

setupCommunityTeaserSlider();

// ── Scroll-reaktív fejléc: kompakt állapot ───────────────────────────
const setupHeaderScrollState = () => {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    // hiszterézis: máshol vált be és ki, így a küszöb körül nem ugrál
    const compact = document.body.classList.contains("hdr-scrolled");
    document.body.classList.toggle("hdr-scrolled", compact ? y > 10 : y > 90);
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  update();
};

setupHeaderScrollState();
