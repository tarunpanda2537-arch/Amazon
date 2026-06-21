const products = {
    ac: {
        name: "LG 1.5 Ton 5 Star DUAL Inverter AC",
        brand: "LG",
        img: "images/ac.jpg",
        price: 34990,
        oldPrice: 55000,
        discount: 36,
        desc: "DUAL Inverter Compressor with varied speed drive. 5 Star Energy Rating. HD Filter with Anti-Virus Protection. Wi-Fi enabled with ThinQ App.",
        ratings: "12,456"
    },
    fridge: {
        name: "Samsung 324L Twin Cooling Plus™ Refrigerator",
        brand: "Samsung",
        img: "images/fridge.jpg",
        price: 28990,
        oldPrice: 42000,
        discount: 31,
        desc: "Twin Cooling Plus™ maintains optimal humidity. All-Around Cooling keeps food fresh longer. Digital Inverter Compressor for efficiency.",
        ratings: "8,234"
    },
    microwaves: {
        name: "Samsung 28L Convection MicroWave Oven",
        brand: "Samsung",
        img: "images/microwaves.jpg",
        price: 11490,
        oldPrice: 18000,
        discount: 36,
        desc: "28L Capacity. Convection with Grill. Slim Fry Technology. 10+ auto cook menus. Child lock for safety.",
        ratings: "15,672"
    },
    "washing-machine": {
        name: "LG 6.5 Kg 5 Star Fully Automatic Front Load",
        brand: "LG",
        img: "images/washing-machine.jpg",
        price: 22990,
        oldPrice: 38000,
        discount: 39,
        desc: "AI DD Technology. 6 Motion Direct Drive. Steam Function for deep cleaning. Smart Diagnosis via SmartThinQ App.",
        ratings: "9,891"
    },
    cushion: {
        name: "Story@Home Geometric Cushion Covers Set of 5",
        brand: "Story@Home",
        img: "images/cushion.jpg",
        price: 449,
        oldPrice: 999,
        discount: 55,
        desc: "Premium quality fabric. Set of 5 cushion covers. Size 16x16 inches. Machine washable. Multiple colours available.",
        ratings: "23,400"
    },
    figurine: {
        name: "Astronaut Figurine Set of 3 – Home Décor",
        brand: "Decor Hub",
        img: "images/figurine.jpg",
        price: 699,
        oldPrice: 1299,
        discount: 46,
        desc: "Resin crafted space astronaut figurines. Gold & silver finish. Perfect for shelves, study tables & gifting.",
        ratings: "5,678"
    },
    storage: {
        name: "Foldable Fabric Storage Organizer Bins Set of 4",
        brand: "HomeStrap",
        img: "images/storage.jpg",
        price: 599,
        oldPrice: 1200,
        discount: 50,
        desc: "Durable non-woven fabric. Leather handles for easy carrying. Perfect for wardrobe, closet & shelves. Set of 4.",
        ratings: "31,245"
    },
    lighting: {
        name: "Crystal Wall Sconce LED Light Modern Decor",
        brand: "LuxiLamp",
        img: "images/lighting.jpg",
        price: 1299,
        oldPrice: 2499,
        discount: 48,
        desc: "Elegant crystal + metal design. Warm white 3000K LED included. Easy wall mount. Ideal for bedroom & living room.",
        ratings: "4,123"
    },
    boat: {
        name: "boAt Rockerz 255 Pro+ Bluetooth Neckband",
        brand: "boAt",
        img: "images/boat.jpg",
        price: 1299,
        oldPrice: 2999,
        discount: 57,
        desc: "40 Hours Playtime. ASAP Charge (10 mins = 10 hrs). IPX5 Water Resistant. Dual device connectivity. Magnetic earbuds.",
        ratings: "1,84,502"
    },
    boult: {
        name: "Boult Audio ProBass Curve Neckband Earphones",
        brand: "Boult Audio",
        img: "images/boult.jpg",
        price: 799,
        oldPrice: 1999,
        discount: 60,
        desc: "18 Hours Battery. Bluetooth 5.0. One Touch Voice Assistant. IPX5 Waterproof. Crystal clear calls.",
        ratings: "67,891"
    },
    noise: {
        name: "Noise Tune Active Wireless Earphones",
        brand: "Noise",
        img: "images/noise.jpg",
        price: 999,
        oldPrice: 2499,
        discount: 60,
        desc: "10 Hours Playtime. Bluetooth 5.0. HD Sound with Bass Boost. IPX5 Rating. Magnetic earbuds.",
        ratings: "43,210"
    },
    zebronics: {
        name: "Zebronics Zeb-Delight Plus Wireless Earphones",
        brand: "Zebronics",
        img: "images/zebronics.jpg",
        price: 599,
        oldPrice: 1499,
        discount: 60,
        desc: "Bluetooth 5.0. 18 Hours Battery. 10mm Drivers. Voice Assistant Support. IPX4 Water Resistant.",
        ratings: "28,765"
    }
};

let cart = [];
let currentProduct = null;
let currentQty = 1;

// ── Product Modal ──────────────────────────────────────────────

function openProduct(id) {
    const p = products[id];
    if (!p) return;

    currentProduct = { ...p, id };
    currentQty = 1;

    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalBrand').textContent = p.brand;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalPrice').textContent = '₹' + p.price.toLocaleString('en-IN');
    document.getElementById('modalOldPrice').textContent = '₹' + p.oldPrice.toLocaleString('en-IN');
    document.getElementById('modalDiscount').textContent = p.discount + '% off';
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalRatings').textContent = p.ratings + ' ratings';
    document.getElementById('modalQty').textContent = 1;

    const d = new Date();
    d.setDate(d.getDate() + 3);
    document.getElementById('deliveryDate').textContent = d.toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    document.getElementById('modalOverlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function changeQty(delta) {
    currentQty = Math.max(1, currentQty + delta);
    document.getElementById('modalQty').textContent = currentQty;
}

function closeModal(e) {
    if (e.target === document.getElementById('modalOverlay')) {
        closeProductModal();
    }
}

function closeProductModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.body.style.overflow = '';
}

function addToCartFromModal() {
    if (!currentProduct) return;
    addToCart(currentProduct, currentQty);
    closeProductModal();
}

// ── Cart ───────────────────────────────────────────────────────

function addToCart(product, qty = 1) {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }
    updateCartUI();
    showToast('Added to cart: ' + product.name.substring(0, 30) + '...');
}

function updateCartUI() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').textContent = total;

    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        footer.style.display = 'none';
        return;
    }

    footer.style.display = 'block';
    container.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</p>
                <div class="cart-qty-ctrl">
                    <button onclick="updateCartQty(${idx}, -1)">−</button>
                    <span>${item.qty}</span>
                    <button onclick="updateCartQty(${idx}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${idx})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('totalPrice').textContent = '₹' + subtotal.toLocaleString('en-IN');
    document.getElementById('totalQty').textContent = totalQty;
}

function updateCartQty(idx, delta) {
    cart[idx].qty = Math.max(1, cart[idx].qty + delta);
    updateCartUI();
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCartUI();
}

function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

function closeCartOverlay(e) {
    if (e.target === document.getElementById('cartOverlay')) {
        toggleCart();
    }
}

// ── Checkout & Order ───────────────────────────────────────────

function checkout() {
    if (cart.length === 0) return;
    const orderId = 'AMZ-' + Date.now().toString().slice(-8);
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('orderModal').style.display = 'flex';
    cart = [];
    updateCartUI();
    toggleCart();
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function buyNow() {
    if (!currentProduct) return;
    addToCart(currentProduct, currentQty);
    closeProductModal();
    setTimeout(() => toggleCart(), 300);
}

// ── Toast ──────────────────────────────────────────────────────

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Search ─────────────────────────────────────────────────────

function handleSearch(val) {
    val = val.trim().toLowerCase();
    if (!val) { clearSearch(); return; }

    const results = Object.entries(products).filter(([id, p]) =>
        p.name.toLowerCase().includes(val) ||
        p.brand.toLowerCase().includes(val) ||
        p.desc.toLowerCase().includes(val)
    );

    document.getElementById('shopSection').style.display = 'none';
    document.getElementById('searchResults').style.display = 'block';
    document.getElementById('searchTitle').textContent =
        `Results for "${val}" (${results.length} found)`;

    document.getElementById('searchGrid').innerHTML = results.length
        ? results.map(([id, p]) => `
            <div class="product-card" onclick="openProduct('${id}')">
                <img src="${p.img}" alt="${p.name}">
                <div class="product-card-info">
                    <p class="pc-brand">${p.brand}</p>
                    <p class="pc-name">${p.name}</p>
                    <div class="pc-price">
                        <span class="pc-now">₹${p.price.toLocaleString('en-IN')}</span>
                        <span class="pc-off">${p.discount}% off</span>
                    </div>
                    <div class="pc-stars">★★★★☆ <span>${p.ratings}</span></div>
                </div>
            </div>
        `).join('')
        : '<p class="no-results">No products found for your search.</p>';
}

function clearSearch() {
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('shopSection').style.display = 'flex';
    document.getElementById('searchInput').value = '';
}

// ── Category ───────────────────────────────────────────────────

function showCategory(cat) {
    const map = {
        appliances: ['ac', 'fridge', 'microwaves', 'washing-machine'],
        home: ['cushion', 'figurine', 'storage', 'lighting'],
        electronics: ['boat', 'boult', 'noise', 'zebronics']
    };
    const labels = {
        appliances: 'Appliances',
        home: 'Home & Décor',
        electronics: 'Electronics & Headphones'
    };

    const ids = map[cat] || [];
    document.getElementById('shopSection').style.display = 'none';
    document.getElementById('searchResults').style.display = 'block';
    document.getElementById('searchTitle').textContent = labels[cat];

    document.getElementById('searchGrid').innerHTML = ids.map(id => {
        const p = products[id];
        return `
            <div class="product-card" onclick="openProduct('${id}')">
                <img src="${p.img}" alt="${p.name}">
                <div class="product-card-info">
                    <p class="pc-brand">${p.brand}</p>
                    <p class="pc-name">${p.name}</p>
                    <div class="pc-price">
                        <span class="pc-now">₹${p.price.toLocaleString('en-IN')}</span>
                        <span class="pc-off">${p.discount}% off</span>
                    </div>
                    <div class="pc-stars">★★★★☆ <span>${p.ratings}</span></div>
                </div>
            </div>
        `;
    }).join('');
}