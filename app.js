/* ============================================================
   DATA
   ============================================================ */

const HERO_ROTATE_MS = 7000; // 7 seconds

const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    category: "Vegetables",
    farm: "Green Valley Seller",
    price: 5.2,
    unit: "kg",
    rating: 4.6,
    image: "tomatoes.jpg",
  },
  {
    id: 2,
    name: "Fresh Cucumbers",
    category: "Vegetables",
    farm: "Al Noor Seller",
    price: 3.9,
    unit: "kg",
    rating: 4.1,
    image: "cucumbers.jpg",
  },
  {
    id: 3,
    name: "Sweet Oranges",
    category: "Fruits",
    farm: "Sunrise Seller",
    price: 4.5,
    unit: "kg",
    rating: 4.8,
    image: "oranges.jpg",
  },
  {
    id: 4,
    name: "Farm Eggs",
    category: "Dairy",
    farm: "Meadowbrook Seller",
    price: 2.3,
    unit: "dozen",
    rating: 4.3,
    image: "eggs.jpg",
  },
  {
    id: 5,
    name: "Potatoes (Washed)",
    category: "Vegetables",
    farm: "Highland Roots Seller",
    price: 2.1,
    unit: "kg",
    rating: 3.9,
    image: "potatoes.jpg",
  },
  {
    id: 6,
    name: "Strawberries",
    category: "Fruits",
    farm: "Red Leaf Seller",
    price: 7.2,
    unit: "box",
    rating: 4.9,
    image: "strawberries.jpg",
  },
  {
    id: 7,
    name: "Irrigation Hose Kit",
    category: "Tools",
    farm: "AgriTools Seller",
    price: 25.0,
    unit: "set",
    rating: 4.4,
    image: "Irrigation_Hose_Kit.jpg",
  },
  {
    id: 8,
    name: "Hand Tools Bundle",
    category: "Tools",
    farm: "FieldPro Seller",
    price: 18.5,
    unit: "bundle",
    rating: 4.2,
    image: "tools.jpg",
  },
];

const profiles = [
  {
    id: 1,
    name: "Green Valley Seller",
    role: "Seller",
    location: "Barka",
    rating: 4.7,
    description: "Family-owned farm seller focused on seasonal vegetables.",
    tags: ["Vegetables", "Organic"],
  },
  {
    id: 2,
    name: "Al Noor Supermarket",
    role: "Customer",
    location: "Muscat",
    rating: 4.4,
    description: "Buys fresh produce daily from Judhur sellers.",
    tags: ["Retail", "Wholesale"],
  },
  {
    id: 3,
    name: "Sunrise Seller",
    role: "Seller",
    location: "Nizwa",
    rating: 4.8,
    description: "Specialised in citrus and stone fruits.",
    tags: ["Fruits"],
  },
  {
    id: 4,
    name: "Gulf Fresh Trading",
    role: "Customer",
    location: "Sohar",
    rating: 4.2,
    description: "Trading company sourcing vegetables and tools.",
    tags: ["Export", "B2B"],
  },
];

const contacts = [
  { id: "c1", name: "Green Valley Seller" },
  { id: "c2", name: "Al Noor Supermarket" },
  { id: "c3", name: "Sunrise Seller" },
];

let activeContactId = null;
let lastHeroIds = [];

/* ============================================================
   UTILITIES
   ============================================================ */

function createStars(rating) {
  const full = "★".repeat(Math.floor(rating));
  const empty = "☆".repeat(5 - Math.floor(rating));
  return `${full}${empty} (${rating.toFixed(1)})`;
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRandomHeroProducts(count) {
  let candidates = products.filter((p) => !lastHeroIds.includes(p.id));
  if (candidates.length < count) {
    candidates = [...products];
  }
  const picks = shuffle(candidates).slice(0, count);
  lastHeroIds = picks.map((p) => p.id);
  return picks;
}

/* ============================================================
   HERO – TODAY'S FRESH PICKS
   ============================================================ */

function renderHeroProducts() {
  const container = document.getElementById("heroProducts");
  if (!container) return;

  container.classList.add("is-fading");

  setTimeout(() => {
    container.innerHTML = "";
    const picks = getRandomHeroProducts(3);

    picks.forEach((p) => {
      const div = document.createElement("div");
      div.className = "hero-product";
      div.innerHTML = `
        <img src="images/${p.image}" alt="${p.name}" class="hero-product-image" />
        <div class="hero-product-text">
          <div class="hero-product-name">${p.name}</div>
          <div class="hero-product-meta">
            <span>${p.farm}</span>
            <span>Seller</span>
            <span>${p.category}</span>
          </div>
        </div>
        <div class="hero-product-price-block">
          <div class="hero-product-price">OMR ${p.price.toFixed(2)}</div>
          <div class="hero-product-unit">/ ${p.unit}</div>
        </div>
      `;
      container.appendChild(div);
    });

    container.classList.remove("is-fading");
  }, 200);
}

/* ============================================================
   PRODUCTS
   ============================================================ */

function renderProducts() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const ratingFilter = document.getElementById("ratingFilter");
  const grid = document.getElementById("productsGrid");

  if (!grid || !searchInput || !categoryFilter || !ratingFilter) return;

  const search = searchInput.value.toLowerCase();
  const cat = categoryFilter.value;
  const minRating = parseFloat(ratingFilter.value);

  grid.innerHTML = "";

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search);
    const matchesCat = cat === "all" || p.category === cat;
    const matchesRating = p.rating >= minRating;
    return matchesSearch && matchesCat && matchesRating;
  });

  if (!filtered.length) {
    grid.innerHTML =
      '<p style="font-size:0.9rem;color:#6b7280;">No products match your filters yet.</p>';
    return;
  }

  filtered.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="images/${p.image}" alt="${p.name}" class="card-image" />
      </div>
      <div class="card-title">${p.name}</div>
      <div class="card-meta">${p.category} · ${p.farm}</div>
      <div class="card-footer">
        <div class="price">OMR ${p.price.toFixed(2)} / ${p.unit}</div>
        <div class="rating">${createStars(p.rating)}</div>
      </div>
      <button class="btn btn-outline" style="margin-top:0.45rem;"
        onclick="startChatWith('${p.farm}')">
        Message seller
      </button>
    `;
    grid.appendChild(card);
  });
}

function resetFilters() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const ratingFilter = document.getElementById("ratingFilter");

  if (!searchInput || !categoryFilter || !ratingFilter) return;

  searchInput.value = "";
  categoryFilter.value = "all";
  ratingFilter.value = "0";
  renderProducts();
}

/* ============================================================
   PROFILES
   ============================================================ */

function renderProfiles() {
  const grid = document.getElementById("profilesGrid");
  if (!grid) return;
  grid.innerHTML = "";

  profiles.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card card-soft";
    card.innerHTML = `
      <div class="profile-header">
        <div class="avatar">${p.name.charAt(0)}</div>
        <div>
          <div class="profile-name">${p.name}</div>
          <div class="profile-role">${p.role} · ${p.location}</div>
          <div class="rating" style="margin-top:0.2rem;">
            ${createStars(p.rating)}
          </div>
        </div>
      </div>
      <p class="card-meta">${p.description}</p>
      <div style="margin-top:0.4rem;">
        ${p.tags.map((t) => `<span class="chip">${t}</span>`).join(" ")}
      </div>
      <button class="btn btn-outline" style="margin-top:0.6rem;"
        onclick="startChatWith('${p.name}')">
        Message ${p.role.toLowerCase()}
      </button>
    `;
    grid.appendChild(card);
  });
}

/* ============================================================
   CHAT
   ============================================================ */

function renderContacts() {
  const list = document.getElementById("chatContacts");
  if (!list) return;
  list.innerHTML = "";

  contacts.forEach((c) => {
    const div = document.createElement("div");
    div.className =
      "chat-contact" + (c.id === activeContactId ? " active" : "");
    div.innerHTML = `
      <span>${c.name}</span>
      <span style="font-size:0.75rem;color:#6b7280;">Online</span>
    `;
    div.onclick = () => selectContact(c.id);
    list.appendChild(div);
  });
}

function selectContact(id) {
  activeContactId = id;
  const contact = contacts.find((c) => c.id === id);
  const chatWith = document.getElementById("chatWith");
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const box = document.getElementById("chatMessages");

  if (!chatWith || !chatInput || !chatSendBtn || !box) return;

  chatWith.textContent = contact.name;
  chatInput.disabled = false;
  chatSendBtn.disabled = false;
  box.innerHTML = `
    <div class="bubble them">
      Hi! This is a demo chat from <strong>${contact.name}</strong>.
    </div>
  `;
  renderContacts();
}

function startChatWith(name) {
  let contact = contacts.find((c) => c.name === name);
  if (!contact) {
    contact = { id: "c" + (contacts.length + 1), name };
    contacts.push(contact);
  }
  selectContact(contact.id);
  scrollToSection("chat");
}

function sendChat() {
  const chatInput = document.getElementById("chatInput");
  const box = document.getElementById("chatMessages");

  if (!chatInput || !box || !activeContactId) return;

  const text = chatInput.value.trim();
  if (!text) return;

  const myBubble = document.createElement("div");
  myBubble.className = "bubble me";
  myBubble.textContent = text;
  box.appendChild(myBubble);

  const reply = document.createElement("div");
  reply.className = "bubble them";
  reply.textContent = "Thanks! We received your message (demo only).";
  setTimeout(() => {
    box.appendChild(reply);
    box.scrollTop = box.scrollHeight;
  }, 400);

  box.scrollTop = box.scrollHeight;
  chatInput.value = "";
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */

function applyTheme(theme) {
  const body = document.body;
  const btn = document.getElementById("themeToggle");
  if (!body) return;

  if (theme === "dark") {
    body.classList.add("theme-dark");
    if (btn) btn.textContent = "☀️";
  } else {
    body.classList.remove("theme-dark");
    if (btn) btn.textContent = "🌙";
  }
  localStorage.setItem("Judhur-theme", theme);
}

function initTheme() {
  const stored = localStorage.getItem("Judhur-theme");
  const preferred = stored === "dark" ? "dark" : "light";
  applyTheme(preferred);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("theme-dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }
}

/* ============================================================
   ROLE TOGGLE (SIGNUP PAGE)
   ============================================================ */

function initRoleToggle() {
  const roleButtons = document.querySelectorAll(".role-option");
  if (!roleButtons.length) return;

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      roleButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const ratingFilter = document.getElementById("ratingFilter");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatInput = document.getElementById("chatInput");

  if (searchInput && categoryFilter && ratingFilter) {
    searchInput.addEventListener("input", renderProducts);
    categoryFilter.addEventListener("change", renderProducts);
    ratingFilter.addEventListener("change", renderProducts);
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener("click", sendChat);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendChat();
    });
  }

  // Home page parts (safe even if elements don't exist)
  renderHeroProducts();
  renderProducts();
  renderProfiles();
  renderContacts();
  initTheme();
  initRoleToggle();

  if (document.getElementById("heroProducts")) {
    setInterval(renderHeroProducts, HERO_ROTATE_MS);
  }
});
