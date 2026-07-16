const layeroDebugStorageKey = "layero-debug-mode";
const layeroDebugCookieName = "layero_debug";
const layeroDebugParamNames = ["debug", "debugg", "layero-debug", "layeroDebug"];

function normalizeLayeroDebugCommand(value) {
  if (typeof value !== "string") {
    return null;
  }

  const command = value.trim().toLowerCase();
  if (["1", "true", "on", "yes", "be"].includes(command)) {
    return "on";
  }

  if (["0", "false", "off", "no", "ki"].includes(command)) {
    return "off";
  }

  return null;
}

function isLayeroLocalDebugHost() {
  const protocol = window.location.protocol;
  const hostname = (window.location.hostname || "").toLowerCase();

  if (protocol === "file:") {
    return true;
  }

  if (!hostname) {
    return false;
  }

  if (hostname === "localhost" || hostname === "::1" || hostname === "[::1]") {
    return true;
  }

  if (/^127\./.test(hostname) || /^10\./.test(hostname) || /^192\.168\./.test(hostname)) {
    return true;
  }

  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)) {
    return true;
  }

  if (hostname.endsWith(".local") || hostname.endsWith(".lan") || hostname.endsWith(".home.arpa")) {
    return true;
  }

  return !hostname.includes(".") && !hostname.includes(":");
}

function readLayeroDebugCommand() {
  const sources = [
    window.location.search ? window.location.search.slice(1) : "",
    window.location.hash ? window.location.hash.slice(1) : ""
  ];

  for (const source of sources) {
    if (!source) {
      continue;
    }

    try {
      const params = new URLSearchParams(source);
      for (const name of layeroDebugParamNames) {
        const command = normalizeLayeroDebugCommand(params.get(name));
        if (command) {
          return command;
        }
      }
    } catch (error) {
      // URLSearchParams can reject malformed hashes; the fallback below still handles simple commands.
    }

    const normalizedSource = source.trim().toLowerCase();
    if (normalizedSource === "debug-on" || normalizedSource === "debugg-on") {
      return "on";
    }

    if (normalizedSource === "debug-off" || normalizedSource === "debugg-off") {
      return "off";
    }
  }

  return null;
}

function readLayeroStoredDebugPreference() {
  try {
    return window.localStorage.getItem(layeroDebugStorageKey);
  } catch (error) {
    return null;
  }
}

function readLayeroStoredDebugOffMode() {
  return readLayeroStoredDebugPreference() === "off";
}

function readLayeroDebugOffCookie() {
  try {
    return document.cookie
      .split(";")
      .some((entry) => entry.trim() === `${layeroDebugCookieName}=off`);
  } catch (error) {
    return false;
  }
}

function persistLayeroDebugMode(enabled) {
  try {
    if (enabled) {
      window.localStorage.setItem(layeroDebugStorageKey, "on");
    } else {
      window.localStorage.setItem(layeroDebugStorageKey, "off");
    }
  } catch (error) {
    // Storage can be blocked in private contexts; the cookie fallback may still work.
  }

  try {
    document.cookie = `${layeroDebugCookieName}=${enabled ? "on" : "off"}; path=/; max-age=2592000; SameSite=Lax`;
  } catch (error) {
    // Cookies are a convenience fallback only.
  }
}

function resolveLayeroDebugMode() {
  const localDebugHost = isLayeroLocalDebugHost();
  const command = readLayeroDebugCommand();
  window.__LAYERO_DEBUG_AVAILABLE__ = localDebugHost;

  if (command === "on") {
    if (!localDebugHost) {
      persistLayeroDebugMode(false);
      window.__LAYERO_DEBUG_MODE__ = false;
      return false;
    }

    persistLayeroDebugMode(true);
    window.__LAYERO_DEBUG_MODE__ = true;
    return true;
  }

  if (command === "off") {
    persistLayeroDebugMode(false);
    window.__LAYERO_DEBUG_MODE__ = false;
    return false;
  }

  const debugWasExplicitlyDisabled = readLayeroStoredDebugOffMode() || readLayeroDebugOffCookie();
  const enabled = localDebugHost && !debugWasExplicitlyDisabled;
  window.__LAYERO_DEBUG_MODE__ = enabled;
  return enabled;
}

let layeroDebugModeEnabled = resolveLayeroDebugMode();

function isLayeroDebugModeEnabled() {
  return layeroDebugModeEnabled === true;
}

function setLayeroDebugMode(enabled) {
  const localDebugHost = isLayeroLocalDebugHost();
  window.__LAYERO_DEBUG_AVAILABLE__ = localDebugHost;

  if (enabled && !localDebugHost) {
    console.warn("Layero debug mode is only available on localhost or local network addresses.");
    return false;
  }

  persistLayeroDebugMode(Boolean(enabled));
  layeroDebugModeEnabled = Boolean(enabled && localDebugHost);
  window.__LAYERO_DEBUG_MODE__ = layeroDebugModeEnabled;
  return true;
}

function stripLayeroDebugCommandFromUrl() {
  try {
    const url = new URL(window.location.href);
    layeroDebugParamNames.forEach((name) => url.searchParams.delete(name));

    const hash = url.hash ? url.hash.slice(1).toLowerCase() : "";
    if (hash === "debug=on" || hash === "debug=off" || hash === "debugg=on" || hash === "debugg=off" || hash === "debug-on" || hash === "debug-off" || hash === "debugg-on" || hash === "debugg-off") {
      url.hash = "";
    }

    return url.toString();
  } catch (error) {
    return window.location.href.split("#")[0].split("?")[0];
  }
}

function reloadLayeroDebugPage() {
  window.location.replace(stripLayeroDebugCommandFromUrl());
}

window.layeroDebug = {
  on() {
    if (setLayeroDebugMode(true)) {
      console.info("Layero debug mode: on. Reloading without content protection.");
      reloadLayeroDebugPage();
    }
  },
  off() {
    setLayeroDebugMode(false);
    console.info("Layero debug mode: off. Reloading with the normal protection.");
    reloadLayeroDebugPage();
  },
  status() {
    const status = {
      available: isLayeroLocalDebugHost(),
      enabled: isLayeroDebugModeEnabled(),
      host: window.location.hostname || "file"
    };
    console.info(`Layero debug mode: ${status.enabled ? "on" : "off"}.`);
    return status;
  }
};
window.debugg = window.layeroDebug;

if (isLayeroDebugModeEnabled()) {
  document.documentElement.classList.add("layero-debug-mode");
  document.documentElement.classList.remove("content-protection");
}

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

if (siteNav) {
  const headerTop = document.querySelector(".header-top");
  const headerMotto = headerTop?.querySelector(".header-top__motto");
  const headerContact = headerTop?.querySelector(".header-top__contact");
  const headerCta = document.querySelector(".header-cta");
  const shopHref = headerCta?.getAttribute("href") || "https://shop.layero.ro";

  const mobileHead = siteNav.querySelector(".site-nav__mobile-head") || document.createElement("div");
  mobileHead.className = "site-nav__mobile-head";
  mobileHead.innerHTML = "<span>Layero navig&aacute;ci&oacute;</span><strong>V&aacute;lassz ir&aacute;nyt</strong>";

  const linkWrap = siteNav.querySelector(".site-nav__links") || document.createElement("div");
  linkWrap.className = "site-nav__links";
  [...siteNav.querySelectorAll(":scope > a")].forEach((link) => linkWrap.appendChild(link));

  const mobileInfo = siteNav.querySelector(".site-nav__mobile-info") || document.createElement("div");
  mobileInfo.className = "site-nav__mobile-info";
  mobileInfo.setAttribute("aria-label", "Gyors elerhetosegek");

  const mobileInfoItems = [];
  if (headerMotto) {
    const mottoClone = headerMotto.cloneNode(true);
    mottoClone.className = "site-nav__mobile-motto";
    mobileInfoItems.push(mottoClone);
  }

  if (headerContact) {
    const contactClone = headerContact.cloneNode(true);
    contactClone.className = "site-nav__mobile-contact";
    contactClone.querySelectorAll("svg").forEach((icon) => {
      icon.classList.add("site-nav__mobile-icon");
    });
    mobileInfoItems.push(contactClone);
  }

  if (mobileInfoItems.length) {
    mobileInfo.replaceChildren(...mobileInfoItems);
  } else {
    mobileInfo.remove();
  }

  const mobileCta = siteNav.querySelector(".site-nav__mobile-cta") || document.createElement("div");
  mobileCta.className = "site-nav__mobile-cta";
  mobileCta.setAttribute("aria-label", "Gyors muveletek");
  mobileCta.innerHTML = `<a class="btn btn--shop" href="${shopHref}" target="_blank" rel="noopener noreferrer">Online shop</a>`;

  if (mobileInfoItems.length) {
    siteNav.append(mobileHead, linkWrap, mobileInfo, mobileCta);
  } else {
    siteNav.append(mobileHead, linkWrap, mobileCta);
  }
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
const newsletterPromoEnabled = window.LAYERO_FEATURES?.newsletterPromo10 === true;
const newsletterCouponCode = "LAYERO10";
const newsletterSubscribedKey = "layero-newsletter-subscribed";
const newsletterDismissedKey = "layero-newsletter-dismissed";
const newsletterAutoShownKey = "layero-newsletter-auto-shown";
const newsletterSessionStartedAtKey = "layero-newsletter-session-started-at";
const newsletterAutoOpenDelay = 60_000;
let newsletterLastActiveElement = null;

document.querySelectorAll("[data-newsletter-promo]").forEach((element) => {
  element.hidden = !newsletterPromoEnabled;
});

document.querySelectorAll("[data-newsletter-standard]").forEach((element) => {
  element.hidden = newsletterPromoEnabled;
});

document.documentElement.classList.add("js-enabled");

function closestElement(target, selector) {
  if (target instanceof Element) {
    return target.closest(selector);
  }

  return target?.parentElement?.closest(selector) || null;
}

function isEditableTarget(target) {
  return Boolean(closestElement(target, "input, textarea, select, [contenteditable='true'], [contenteditable='']"));
}

function preventProtectedAction(event) {
  if (isEditableTarget(event.target)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
}

function protectMediaElements(root = document) {
  root.querySelectorAll?.("img, picture, video, canvas, svg").forEach((element) => {
    element.setAttribute("draggable", "false");
    element.setAttribute("aria-dropeffect", "none");
  });

  root.querySelectorAll?.("a[download]").forEach((link) => {
    link.removeAttribute("download");
  });
}

function enableContentProtection() {
  if (isLayeroDebugModeEnabled()) {
    document.documentElement.classList.remove("content-protection");
    console.info("Layero debug mode is on: content protection is disabled on this local address.");
    return;
  }

  document.documentElement.classList.add("content-protection");
  protectMediaElements();

  const protectedEvents = ["contextmenu", "copy", "cut", "selectstart"];
  protectedEvents.forEach((eventName) => {
    document.addEventListener(eventName, preventProtectedAction, { capture: true });
  });

  document.addEventListener(
    "dragstart",
    (event) => {
      if (closestElement(event.target, "img, picture, video, canvas, svg") || !isEditableTarget(event.target)) {
        preventProtectedAction(event);
      }
    },
    { capture: true }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      const key = event.key.toLowerCase();
      const hasModifier = event.ctrlKey || event.metaKey;
      const blockedModifiedKeys = ["a", "c", "p", "s", "u", "x"];

      if (hasModifier && !event.shiftKey && blockedModifiedKeys.includes(key)) {
        preventProtectedAction(event);
      }
    },
    { capture: true }
  );

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          protectMediaElements(node);
        }
      });
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}

enableContentProtection();

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
      ? (newsletterPromoEnabled ? newsletterCopyButton : newsletterSuccess)
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

  const now = Date.now();
  const storedStartedAt = Number(getStored(window.sessionStorage, newsletterSessionStartedAtKey));
  const sessionStartedAt = Number.isFinite(storedStartedAt) && storedStartedAt > 0 && storedStartedAt <= now
    ? storedStartedAt
    : now;

  if (sessionStartedAt === now) {
    setStored(window.sessionStorage, newsletterSessionStartedAtKey, String(now));
  }

  const tryAutoOpen = () => {
    if (!shouldAutoOpenNewsletter() || isNewsletterOpen()) {
      return;
    }

    if (document.body.classList.contains("nav-open")) {
      window.setTimeout(tryAutoOpen, 1000);
      return;
    }

    openNewsletter({ auto: true });
  };

  const remainingDelay = Math.max(0, newsletterAutoOpenDelay - (now - sessionStartedAt));
  window.setTimeout(tryAutoOpen, remainingDelay);
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
    ...(newsletterPromoEnabled ? { coupon: newsletterCouponCode } : {}),
    subscribedAt: new Date().toISOString(),
  };

  setStored(window.localStorage, newsletterSubscribedKey, JSON.stringify(subscription));
  setStored(window.sessionStorage, newsletterDismissedKey, "1");

  newsletterForm.reset();
  setNewsletterView();
  (newsletterPromoEnabled ? newsletterCopyButton : newsletterSuccess)?.focus();
});

newsletterCopyButton?.addEventListener("click", async () => {
  if (!newsletterPromoEnabled) {
    return;
  }

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
const communityTeaserPrev = document.querySelector(".community__teaser-prev");
const communityTeaserNext = document.querySelector(".community__teaser-next");
const communityTeaserFullSources = [
  "assets/kozosseg/layero-asset-0008.jpg",
  "assets/kozosseg/layero-asset-0018.jpg",
  "assets/kozosseg/layero-asset-0019.jpg",
  "assets/kozosseg/layero-asset-0020.jpg",
  "assets/kozosseg/layero-asset-0073.jpg",
  "assets/kozosseg/layero-asset-0076.jpg",
  "assets/kozosseg/layero-asset-0078.jpg",
  "assets/kozosseg/layero-asset-0083.jpg",
  "assets/kozosseg/layero-asset-0086-760.webp",
  "assets/kozosseg/layero-asset-0087-760.webp",
  "assets/kozosseg/layero-asset-0089.jpg",
  "assets/kozosseg/layero-asset-0092-760.webp",
  "assets/kozosseg/layero-asset-0093-760.webp",
  "assets/kozosseg/layero-asset-0094-760.webp",
  "assets/kozosseg/layero-asset-0097-760.webp",
  "assets/kozosseg/layero-asset-0103.jpg",
  "assets/kozosseg/layero-asset-0105.jpg",
  "assets/kozosseg/layero-asset-0106-760.webp",
  "assets/kozosseg/layero-asset-0114-760.webp",
  "assets/kozosseg/layero-asset-0117.jpg",
  "assets/kozosseg/layero-asset-0141.jpg",
  "assets/kozosseg/layero-asset-0184.jpg",
  "assets/kozosseg/layero-asset-0186.jpg",
  "assets/kozosseg/layero-asset-0277.jpg",
];

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
  const firstSetImages = firstSet ? [...firstSet.querySelectorAll("img")] : [];
  const allImages = [...communityTeaserTrack.querySelectorAll("img")];
  const slides = firstSetImages.map((image, index) => ({
    preview: image.getAttribute("src") || image.currentSrc || image.src,
    full: communityTeaserFullSources[index] || image.getAttribute("src") || image.currentSrc || image.src,
    alt: image.alt || `Layero közösségi inspiráció ${index + 1}`,
  }));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let paused = false;
  let frameId = 0;
  let lightboxIndex = 0;
  let lightbox = null;
  let lightboxImage = null;
  let lightboxCounter = null;
  let restoreBodyOverflow = "";
  let pointerDown = false;
  let pointerStartX = 0;
  let pointerStartOffset = 0;
  let pointerMoved = false;
  let pointerCaptured = false;
  let suppressImageClick = false;
  let sliderOffset = 0;
  let transitionTimer = 0;

  const getGap = () => {
    const styles = window.getComputedStyle(communityTeaserTrack);
    const columnGap = Number.parseFloat(styles.columnGap);
    const gap = Number.parseFloat(styles.gap);

    if (Number.isFinite(columnGap)) {
      return columnGap;
    }

    return Number.isFinite(gap) ? gap : 0;
  };

  const getLoopWidth = () => {
    if (firstSet) {
      return firstSet.getBoundingClientRect().width + getGap();
    }

    return communityTeaserTrack.getBoundingClientRect().width / 2;
  };

  const normalizeOffset = () => {
    const loopWidth = getLoopWidth();

    if (loopWidth <= 0) {
      return;
    }

    while (sliderOffset >= loopWidth) {
      sliderOffset -= loopWidth;
    }

    while (sliderOffset < 0) {
      sliderOffset += loopWidth;
    }
  };

  const applySliderTransform = (smooth = false) => {
    if (smooth) {
      window.clearTimeout(transitionTimer);
      communityTeaserTrack.style.transition = "transform 420ms ease";
    } else {
      communityTeaserTrack.style.transition = "none";
    }

    communityTeaserTrack.style.transform = `translate3d(${-sliderOffset}px, 0, 0)`;

    if (smooth) {
      transitionTimer = window.setTimeout(() => {
        normalizeOffset();
        communityTeaserTrack.style.transition = "none";
        communityTeaserTrack.style.transform = `translate3d(${-sliderOffset}px, 0, 0)`;
      }, 440);
    }
  };

  const renderSlider = (smooth = false) => {
    normalizeOffset();
    applySliderTransform(smooth);
  };

  const getStep = () => {
    const cardWidth = firstImage?.getBoundingClientRect().width || communityTeaserViewport.clientWidth * 0.7;
    return cardWidth + getGap();
  };

  const moveBy = (direction) => {
    const loopWidth = getLoopWidth();
    const step = getStep();

    if (loopWidth <= 0 || step <= 0) {
      return;
    }

    if (direction < 0 && sliderOffset <= step) {
      sliderOffset += loopWidth;
      applySliderTransform(false);
    }

    sliderOffset += direction * step;
    applySliderTransform(true);
  };

  const ensureLightbox = () => {
    if (lightbox || !slides.length) {
      return;
    }

    lightbox = document.createElement("div");
    lightbox.className = "community-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Közösségi galéria");
    lightbox.innerHTML = `
      <button class="community-lightbox__button community-lightbox__close" type="button" aria-label="Bezárás">
        <svg class="icon" aria-hidden="true"><use href="#icon-x"></use></svg>
      </button>
      <button class="community-lightbox__button community-lightbox__prev" type="button" aria-label="Előző kép">
        <svg class="icon" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
      </button>
      <div class="community-lightbox__frame">
        <img class="community-lightbox__img" alt="">
      </div>
      <button class="community-lightbox__button community-lightbox__next" type="button" aria-label="Következő kép">
        <svg class="icon" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
      </button>
      <div class="community-lightbox__counter" aria-live="polite"></div>
    `;
    document.body.appendChild(lightbox);
    lightboxImage = lightbox.querySelector(".community-lightbox__img");
    lightboxCounter = lightbox.querySelector(".community-lightbox__counter");

    lightbox.querySelector(".community-lightbox__close")?.addEventListener("click", closeLightbox);
    lightbox.querySelector(".community-lightbox__prev")?.addEventListener("click", (event) => {
      event.stopPropagation();
      showLightbox(lightboxIndex - 1);
    });
    lightbox.querySelector(".community-lightbox__next")?.addEventListener("click", (event) => {
      event.stopPropagation();
      showLightbox(lightboxIndex + 1);
    });
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  };

  const showLightbox = (index) => {
    if (!slides.length || !lightboxImage) {
      return;
    }

    lightboxIndex = ((index % slides.length) + slides.length) % slides.length;
    const slide = slides[lightboxIndex];
    lightboxImage.src = slide.full;
    lightboxImage.alt = slide.alt;

    if (lightboxCounter) {
      lightboxCounter.textContent = `${lightboxIndex + 1} / ${slides.length}`;
    }
  };

  const openLightbox = (index) => {
    ensureLightbox();

    if (!lightbox) {
      return;
    }

    paused = true;
    restoreBodyOverflow = document.body.style.overflow;
    showLightbox(index);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  function closeLightbox() {
    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("is-open");
    document.body.style.overflow = restoreBodyOverflow;
    paused = false;
  }

  const tick = () => {
    if (!paused) {
      sliderOffset += 0.45;
      renderSlider(false);
    }

    frameId = window.requestAnimationFrame(tick);
  };

  allImages.forEach((image, index) => {
    const slideIndex = slides.length ? index % slides.length : 0;
    image.dataset.communitySlideIndex = String(slideIndex);
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `${slides[slideIndex]?.alt || "Közösségi kép"} megnyitása`);

    if (image.closest("[aria-hidden='true']")) {
      image.tabIndex = -1;
    } else {
      image.tabIndex = 0;
    }

    image.addEventListener("click", (event) => {
      if (suppressImageClick) {
        event.preventDefault();
        return;
      }

      openLightbox(slideIndex);
    });

    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(slideIndex);
      }
    });
  });

  communityTeaserPrev?.addEventListener("click", () => {
    moveBy(-1);
  });

  communityTeaserNext?.addEventListener("click", () => {
    moveBy(1);
  });

  communityTeaserViewport.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || !slides.length) {
      return;
    }

    pointerDown = true;
    pointerMoved = false;
    pointerStartX = event.clientX;
    pointerStartOffset = sliderOffset;
    paused = true;
  });

  communityTeaserViewport.addEventListener("pointermove", (event) => {
    if (!pointerDown) {
      return;
    }

    const loopWidth = getLoopWidth();
    const deltaX = event.clientX - pointerStartX;
    let nextOffset = pointerStartOffset - deltaX;

    if (!pointerMoved && Math.abs(deltaX) <= 4) {
      return;
    }

    if (!pointerMoved) {
      pointerMoved = true;
      suppressImageClick = true;
      communityTeaserViewport.classList.add("is-dragging");

      if (typeof communityTeaserViewport.setPointerCapture === "function") {
        try {
          communityTeaserViewport.setPointerCapture(event.pointerId);
          pointerCaptured = true;
        } catch (error) {
          pointerCaptured = false;
        }
      }
    }

    if (loopWidth > 0) {
      if (nextOffset < 0) {
        pointerStartOffset += loopWidth;
        nextOffset += loopWidth;
      } else if (nextOffset >= loopWidth) {
        pointerStartOffset -= loopWidth;
        nextOffset -= loopWidth;
      }
    }

    sliderOffset = nextOffset;
    applySliderTransform(false);
  });

  const endPointerDrag = (event) => {
    if (!pointerDown) {
      return;
    }

    pointerDown = false;
    paused = false;
    communityTeaserViewport.classList.remove("is-dragging");

    if (pointerCaptured && typeof communityTeaserViewport.releasePointerCapture === "function") {
      try {
        communityTeaserViewport.releasePointerCapture(event.pointerId);
      } catch (error) {
        // The pointer can be released by the browser before this handler runs.
      }
    }

    pointerCaptured = false;
    renderSlider(false);

    if (pointerMoved) {
      window.setTimeout(() => {
        suppressImageClick = false;
      }, 40);
    } else {
      suppressImageClick = false;
    }
  };

  communityTeaserViewport.addEventListener("pointerup", endPointerDrag);
  communityTeaserViewport.addEventListener("pointercancel", endPointerDrag);
  communityTeaserViewport.addEventListener("lostpointercapture", () => {
    if (pointerDown) {
      pointerDown = false;
      pointerCaptured = false;
      paused = false;
      communityTeaserViewport.classList.remove("is-dragging");
      renderSlider(false);
    }
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

  renderSlider(false);

  document.addEventListener("keydown", (event) => {
    if (!lightbox?.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      showLightbox(lightboxIndex - 1);
    } else if (event.key === "ArrowRight") {
      showLightbox(lightboxIndex + 1);
    }
  });

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
