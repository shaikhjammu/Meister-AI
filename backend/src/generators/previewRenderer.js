export function generatePreviewHtml(project) {
  const appType = project.requirements?.appType || project.prompt || "Production Software System";
  const entities = project.requirements?.entities || ["User", "Item", "Record"];
  const features = project.requirements?.features || ["Authentication", "Dashboard", "CRUD Operations"];
  const lowerPrompt = (project.prompt || "").toLowerCase();
  const lowerAppType = appType.toLowerCase();

  const isEcommerce = /amazon|e-commerce|ecommerce|shop|store|marketplace/i.test(lowerAppType) || /amazon|e-?commerce|shop|store|marketplace|product catalog|shopping cart/i.test(lowerPrompt);
  const isHospital = /hospital|clinic|healthcare|medical/i.test(lowerAppType) || /hospital|clinic|patient|doctor|medical|prescription|appointment/i.test(lowerPrompt);
  const isSchool = /school|student|education/i.test(lowerAppType) || /school|student|teacher|classroom|attendance|grade/i.test(lowerPrompt);
  const isTask = /kanban|task management|project management/i.test(lowerAppType) || /task|kanban|todo|board|sprint|trello|jira/i.test(lowerPrompt);
  const isInventory = /inventory|warehouse|stock/i.test(lowerAppType) || /inventory|warehouse|stock|supplier/i.test(lowerPrompt);
  const isFinance = /finance|expense|budget|financial/i.test(lowerAppType) || /finance|expense|budget|wallet|banking|transaction/i.test(lowerPrompt);
  const isFitness = /fitness|nutrition|workout/i.test(lowerAppType) || /fitness|gym|workout|diet|nutrition|calorie/i.test(lowerPrompt);
  const theme = getPreviewTheme(project.uiStyle);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(appType)} — MeisterAI Client Production Application</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .glass-card { background: var(--surface); backdrop-filter: blur(16px); border: 1px solid var(--border); }
    .preview-app { background: var(--page-bg) !important; color: var(--text) !important; }
    .preview-app header, .preview-app footer { background: var(--header) !important; border-color: var(--border) !important; }
    .preview-app [class*="bg-slate-950"], .preview-app [class*="bg-slate-900"], .preview-app [class*="bg-slate-800"] { background: var(--surface) !important; }
    .preview-app [class*="border-slate"] { border-color: var(--border) !important; }
    .preview-app [class*="text-slate-100"], .preview-app [class*="text-slate-200"], .preview-app [class*="text-white"] { color: var(--text) !important; }
    .preview-app [class*="text-slate-300"], .preview-app [class*="text-slate-400"], .preview-app [class*="text-slate-500"] { color: var(--muted) !important; }
    .preview-app [class*="bg-pink-600"], .preview-app [class*="bg-pink-500"] { background: var(--accent) !important; }
    .preview-app [class*="text-pink"], .preview-app [class*="text-purple"] { color: var(--accent) !important; }
    .preview-app .preview-card { border-radius: var(--radius); box-shadow: var(--shadow); }
    .preview-app .preview-title { font-family: var(--heading); }
    .theme-minimalism { --page-bg: #f7f8fc; --header: rgba(255,255,255,.94); --surface: #ffffff; --text: #302844; --muted: #67627b; --border: #d8ddeb; --accent: #8458b3; --radius: 8px; --shadow: 0 8px 24px rgba(48,40,68,.08); --heading: 'Outfit', sans-serif; }
    .theme-cyberpunk { --page-bg: #241735; --header: rgba(36,23,53,.94); --surface: rgba(55,33,78,.92); --text: #ffffff; --muted: #d0bdf4; --border: #a0d2eb; --accent: #a0d2eb; --radius: 4px; --shadow: 0 0 22px rgba(160,210,235,.18); --heading: 'JetBrains Mono', monospace; }
    .theme-neumorphism { --page-bg: linear-gradient(145deg,#f1ecf5,#d9d7e7); --header: rgba(231,228,240,.9); --surface: #e7e4f0; --text: #302844; --muted: #6f687c; --border: #c9c3d5; --accent: #8458b3; --radius: 18px; --shadow: 8px 8px 20px rgba(162,128,137,.22), -8px -8px 20px rgba(255,255,255,.72); --heading: 'Outfit', sans-serif; }
    .theme-glassmorphism { --page-bg: linear-gradient(180deg,#a28089 0%,#b39cad 18%,#d0bdf4 42%,#dbe8f3 72%,#a0d2eb 100%); --header: rgba(229,234,245,.34); --surface: rgba(229,234,245,.72); --text: #302844; --muted: #5f5874; --border: rgba(132,88,179,.36); --accent: #8458b3; --radius: 16px; --shadow: 0 12px 36px rgba(132,88,179,.18); --heading: 'Outfit', sans-serif; }
    .animate-in { animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body class="preview-app theme-${theme} min-h-screen flex flex-col font-sans">

  <!-- TOP PRODUCTION APPLICATION HEADER -->
  <header class="border-b border-slate-800 bg-slate-900/90 sticky top-0 z-40 backdrop-blur-md px-6 py-3.5 flex items-center justify-between shadow-xl">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-300 flex items-center justify-center font-extrabold text-slate-950 text-xl shadow-lg shadow-pink-500/25">
        ${isEcommerce ? '🛒' : isHospital ? '🏥' : isSchool ? '🎓' : isTask ? '📋' : isInventory ? '📦' : isFinance ? '💳' : isFitness ? '🏋️' : '🚀'}
      </div>
      <div>
        <h1 class="preview-title font-extrabold text-slate-100 text-base flex items-center gap-2 tracking-tight">
          ${escapeHtml(appType)}
          <span class="text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
            100% Client Ready
          </span>
        </h1>
        <p class="text-xs text-slate-400">Production Build for Prompt: "<span class="text-slate-200 font-medium">${escapeHtml(project.prompt.slice(0, 65))}...</span>"</p>
      </div>
    </div>
    
    <div class="flex items-center gap-3">
      ${isEcommerce ? `
        <button onclick="toggleCartDrawer()" class="relative bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-lg shadow-pink-500/25">
          <span>🛒 Cart</span>
          <span id="cart-badge-count" class="bg-amber-300 text-slate-950 px-2 py-0.5 rounded-full font-extrabold text-[11px]">0</span>
        </button>
      ` : `
        <span class="text-xs text-slate-300 bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-2 font-mono">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Database Connected
        </span>
      `}
      <a href="http://localhost:5174" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl transition font-semibold">
        ← MeisterAI Console
      </a>
    </div>
  </header>

  <!-- MAIN APP CONTAINER -->
  <main className="flex-1 max-w-[1500px] w-full mx-auto p-6 md:p-8 space-y-8" id="main-app-container">
    ${isEcommerce ? renderEcommerceEngine(appType, features) :
      isHospital ? renderHospitalEngine(appType, features) :
      isSchool ? renderSchoolEngine(appType, features) :
      isTask ? renderTaskKanbanEngine(appType, features) :
      isInventory ? renderInventoryEngine(appType, features) :
      isFinance ? renderFinanceEngine(appType, features) :
      isFitness ? renderFitnessEngine(appType, features) :
      renderGenericCrudEngine(appType, entities, features)}
  </main>

  <!-- NOTIFICATION TOAST OVERLAY -->
  <div id="toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"></div>

  <footer class="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
    Production Software Built & Provisioned by MeisterAI Autonomous Pipeline
  </footer>

  <script>
    function safeText(str) {
      return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function showToast(msg, type = 'success') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'animate-in bg-slate-900 border text-xs text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 pointer-events-auto ' +
        (type === 'success' ? 'border-emerald-500/50 text-emerald-300' : 'border-pink-500/50 text-pink-300');
      toast.innerHTML = '<span>' + (type === 'success' ? '✓' : 'ℹ️') + '</span> <span>' + safeText(msg) + '</span>';
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3500);
    }
  </script>
</body>
</html>`;
}

function renderEcommerceEngine(appType, features) {
  return `
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-extrabold text-white">🛒 ${escapeHtml(appType)} Store</h2>
          <p class="text-xs text-slate-400">Fully functional client e-commerce store with product catalog, cart drawer, checkout, and order management.</p>
        </div>
        <div class="flex items-center gap-2">
          <input id="product-search" oninput="filterProducts()" type="text" placeholder="Search product catalog..." class="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-pink-500 w-64" />
          <button onclick="openAddProductModal()" class="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-lg shadow-pink-500/25">
            ➕ Add Product
          </button>
        </div>
      </div>

      <!-- Live E-Commerce Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Total Products</div>
          <div id="stat-products-count" class="text-2xl font-extrabold text-white mt-1">4</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Cart Total</div>
          <div id="stat-cart-total" class="text-2xl font-extrabold text-amber-300 mt-1">$0.00</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Completed Orders</div>
          <div id="stat-orders-count" class="text-2xl font-extrabold text-emerald-400 mt-1">12</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Revenue</div>
          <div class="text-2xl font-extrabold text-purple-400 mt-1">$3,490.00</div>
        </div>
      </div>

      <!-- Category Filter Buttons -->
      <div class="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs overflow-x-auto">
        <button onclick="filterCategory('All')" class="cat-btn px-3.5 py-1.5 rounded-xl bg-pink-600 text-white font-bold">All Products</button>
        <button onclick="filterCategory('Electronics')" class="cat-btn px-3.5 py-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white font-semibold">Electronics</button>
        <button onclick="filterCategory('Wearables')" class="cat-btn px-3.5 py-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white font-semibold">Wearables</button>
        <button onclick="filterCategory('Tech Gear')" class="cat-btn px-3.5 py-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white font-semibold">Tech Gear</button>
        <button onclick="filterCategory('Fashion')" class="cat-btn px-3.5 py-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white font-semibold">Fashion</button>
      </div>

      <!-- Live Product Grid -->
      <div id="product-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>

      <!-- Orders Directory Table -->
      <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden space-y-2">
        <div class="p-4 border-b border-slate-800 font-bold text-sm text-white flex items-center justify-between">
          <span>📦 Recent Customer Orders</span>
          <span class="text-xs text-emerald-400 font-mono">Live API Connected</span>
        </div>
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th class="p-3.5">Order ID</th>
              <th class="p-3.5">Customer Name</th>
              <th class="p-3.5">Items</th>
              <th class="p-3.5">Total Amount</th>
              <th class="p-3.5">Status</th>
            </tr>
          </thead>
          <tbody id="orders-table-body" class="divide-y divide-slate-800 text-slate-200">
            <tr>
              <td class="p-3.5 font-mono text-slate-400">#ORD-9021</td>
              <td class="p-3.5 font-bold">Alice Johnson</td>
              <td class="p-3.5">Smart Watch Ultra (x1)</td>
              <td class="p-3.5 font-bold text-amber-300">$149.50</td>
              <td class="p-3.5"><span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">Shipped</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- CART DRAWER MODAL -->
    <div id="cart-drawer" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm hidden flex justify-end">
      <div class="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
        <div className="space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-base font-extrabold text-white flex items-center gap-2">🛒 Your Shopping Cart</h3>
            <button onclick="toggleCartDrawer()" class="text-slate-400 hover:text-white font-bold">✕ Close</button>
          </div>
          <div id="cart-items-list" class="space-y-3 max-h-[60vh] overflow-y-auto pr-1"></div>
        </div>
        <div class="border-t border-slate-800 pt-4 space-y-3">
          <div class="flex items-center justify-between text-sm font-extrabold">
            <span class="text-slate-300">Total Price:</span>
            <span id="cart-total-price" class="text-amber-300 text-lg">$0.00</span>
          </div>
          <button onclick="checkoutNow()" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition">
            💳 Proceed to Checkout & Order
          </button>
        </div>
      </div>
    </div>

    <script>
      let products = [
        { id: 1, name: "Wireless Noise-Canceling Headphones", category: "Electronics", price: 199.99, rating: "4.9 ★", img: "🎧" },
        { id: 2, name: "Smart Fitness Watch Ultra", category: "Wearables", price: 149.50, rating: "4.8 ★", img: "⌚" },
        { id: 3, name: "Ergonomic Mechanical Keyboard", category: "Tech Gear", price: 89.99, rating: "4.7 ★", img: "⌨️" },
        { id: 4, name: "Minimalist Leather Backpack", category: "Fashion", price: 119.00, rating: "5.0 ★", img: "🎒" },
      ];
      let cart = [];
      let activeCategory = 'All';

      function renderProducts() {
        const grid = document.getElementById('product-grid');
        const search = document.getElementById('product-search').value.toLowerCase();
        grid.innerHTML = '';
        
        const filtered = products.filter(p => {
          const matchCat = activeCategory === 'All' || p.category === activeCategory;
          const matchSearch = p.name.toLowerCase().includes(search);
          return matchCat && matchSearch;
        });

        filtered.forEach(p => {
          const card = document.createElement('div');
          card.className = "animate-in bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3 flex flex-col justify-between hover:border-pink-500/50 transition";
          card.innerHTML = \`
            <div class="w-full h-32 bg-slate-950 rounded-xl flex items-center justify-center text-5xl border border-slate-800 shadow-inner">
              \${p.img}
            </div>
            <div>
              <span class="text-[10px] bg-pink-500/10 text-pink-300 px-2.5 py-0.5 rounded-full border border-pink-500/20 font-semibold">${"safeText(p.category)"}</span>
              <h3 class="text-sm font-bold text-slate-100 mt-2 font-sans">${"safeText(p.name)"}</h3>
              <div class="flex items-center justify-between mt-2">
                <span class="text-base font-extrabold text-amber-300">\$\${p.price.toFixed(2)}</span>
                <span class="text-xs text-slate-400 font-mono">\${p.rating}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <button onclick="addToCart(\${p.id})" class="flex-1 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-md shadow-pink-500/20">
                🛒 Add to Cart
              </button>
              <button onclick="deleteProduct(\${p.id})" class="text-slate-500 hover:text-red-400 text-xs px-2.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800">
                🗑️
              </button>
            </div>
          \`;
          grid.appendChild(card);
        });

        document.getElementById('stat-products-count').innerText = products.length;
      }

      function addToCart(id) {
        const item = products.find(p => p.id === id);
        if (!item) return;
        const existing = cart.find(c => c.id === id);
        if (existing) existing.qty++;
        else cart.push({ ...item, qty: 1 });

        updateCartUI();
        showToast('✓ Added "' + item.name + '" to cart!');
      }

      function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        
        document.getElementById('cart-badge-count').innerText = totalItems;
        document.getElementById('stat-cart-total').innerText = '$' + totalPrice.toFixed(2);
        document.getElementById('cart-total-price').innerText = '$' + totalPrice.toFixed(2);

        const list = document.getElementById('cart-items-list');
        list.innerHTML = '';
        if (cart.length === 0) {
          list.innerHTML = '<p class="text-xs text-slate-500 text-center py-6">Your cart is empty.</p>';
          return;
        }

        cart.forEach(item => {
          const div = document.createElement('div');
          div.className = "bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs";
          div.innerHTML = \`
            <div>
              <div class="font-bold text-white">\${escapeHtml(item.name)}</div>
              <div class="text-amber-300 font-mono mt-0.5">\$\${item.price.toFixed(2)} x \${item.qty}</div>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="changeQty(\${item.id}, -1)" class="w-6 h-6 rounded bg-slate-800 text-white font-bold flex items-center justify-center">-</button>
              <span class="w-6 text-center font-bold text-white">\${item.qty}</span>
              <button onclick="changeQty(\${item.id}, 1)" class="w-6 h-6 rounded bg-slate-800 text-white font-bold flex items-center justify-center">+</button>
            </div>
          \`;
          list.appendChild(div);
        });
      }

      function changeQty(id, delta) {
        const idx = cart.findIndex(c => c.id === id);
        if (idx >= 0) {
          cart[idx].qty += delta;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
        }
        updateCartUI();
      }

      function toggleCartDrawer() {
        document.getElementById('cart-drawer').classList.toggle('hidden');
      }

      function checkoutNow() {
        if (cart.length === 0) {
          alert('Cart is empty!');
          return;
        }
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const orderId = '#ORD-' + Math.floor(1000 + Math.random() * 9000);
        
        const tbody = document.getElementById('orders-table-body');
        const tr = document.createElement('tr');
        tr.className = "animate-in";
        tr.innerHTML = \`
          <td class="p-3.5 font-mono text-slate-400">\${orderId}</td>
          <td class="p-3.5 font-bold text-white">Client Customer</td>
          <td class="p-3.5">\${cart.map(c => c.name + ' (x' + c.qty + ')').join(', ')}</td>
          <td class="p-3.5 font-bold text-amber-300">\$\${total.toFixed(2)}</td>
          <td class="p-3.5"><span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">Paid & Processing</span></td>
        \`;
        tbody.prepend(tr);

        cart = [];
        updateCartUI();
        toggleCartDrawer();
        showToast('🎉 Order ' + orderId + ' placed successfully!');
      }

      function openAddProductModal() {
        const name = prompt('Enter Product Name:');
        if (!name) return;
        const priceStr = prompt('Enter Product Price ($):', '49.99');
        const price = parseFloat(priceStr) || 29.99;
        const category = prompt('Enter Category (Electronics/Fashion/Tech Gear/Wearables):', 'Electronics') || 'Electronics';

        const newP = {
          id: Date.now(),
          name,
          category,
          price,
          rating: '5.0 ★',
          img: '📦'
        };
        products.unshift(newP);
        renderProducts();
        showToast('✓ Product "' + name + '" added to catalog!');
      }

      function deleteProduct(id) {
        products = products.filter(p => p.id !== id);
        renderProducts();
        showToast('Product removed', 'info');
      }

      function filterCategory(cat) {
        activeCategory = cat;
        document.querySelectorAll('.cat-btn').forEach(btn => {
          if (btn.innerText.includes(cat)) {
            btn.className = "cat-btn px-3.5 py-1.5 rounded-xl bg-pink-600 text-white font-bold";
          } else {
            btn.className = "cat-btn px-3.5 py-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white font-semibold";
          }
        });
        renderProducts();
      }

      function filterProducts() {
        renderProducts();
      }

      renderProducts();
    </script>
  `;
}

function renderHospitalEngine(appType, features) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-extrabold text-white">🏥 ${escapeHtml(appType)}</h2>
          <p class="text-xs text-slate-400">Complete clinical portal with doctor scheduling, patient registration, and diagnosis records.</p>
        </div>
        <button onclick="openBookModal()" class="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-pink-500/20">
          📅 Register Patient & Book Appointment
        </button>
      </div>

      <div class="grid grid-cols-4 gap-4">
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Total Registered Patients</div>
          <div id="stat-patients" class="text-2xl font-extrabold text-white mt-1">2</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Appointments Today</div>
          <div id="stat-appts" class="text-2xl font-extrabold text-pink-400 mt-1">2</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Available Doctors</div>
          <div class="text-2xl font-extrabold text-amber-300 mt-1">12</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">ICU Beds Available</div>
          <div class="text-2xl font-extrabold text-emerald-400 mt-1">8 / 20</div>
        </div>
      </div>

      <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div class="p-4 border-b border-slate-800 font-bold text-sm text-white flex items-center justify-between">
          <span>Active Patient Directory & Medical Records</span>
          <input id="patient-search" oninput="filterPatients()" type="text" placeholder="Search patient name..." class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none" />
        </div>
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th class="p-3.5">Patient Name</th>
              <th class="p-3.5">Assigned Doctor</th>
              <th class="p-3.5">Department</th>
              <th class="p-3.5">Appointment Time</th>
              <th class="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="patient-tbody" class="divide-y divide-slate-800 text-slate-200"></tbody>
        </table>
      </div>
    </div>

    <script>
      let patients = [
        { id: 1, name: "Robert Chen", doctor: "Dr. Sarah Jenkins", dept: "Cardiology", time: "10:30 AM", status: "Scheduled" },
        { id: 2, name: "Elena Rostova", doctor: "Dr. Michael Vance", dept: "Neurology", time: "02:15 PM", status: "In Diagnosis" }
      ];

      function renderPatients() {
        const tbody = document.getElementById('patient-tbody');
        const search = document.getElementById('patient-search').value.toLowerCase();
        tbody.innerHTML = '';

        patients.filter(p => p.name.toLowerCase().includes(search)).forEach(p => {
          const tr = document.createElement('tr');
          tr.className = "animate-in";
          tr.innerHTML = \`
            <td class="p-3.5 font-bold text-white">${"safeText(p.name)"}</td>
            <td class="p-3.5">${"safeText(p.doctor)"}</td>
            <td class="p-3.5">${"safeText(p.dept)"}</td>
            <td class="p-3.5"><span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">\${p.time}</span></td>
            <td class="p-3.5 text-right space-x-2">
              <button onclick="generatePrescription('\${p.name}')" class="text-pink-400 font-bold hover:underline">Prescription</button>
              <button onclick="deletePatient(\${p.id})" class="text-slate-500 hover:text-red-400">Discharge</button>
            </td>
          \`;
          tbody.appendChild(tr);
        });

        document.getElementById('stat-patients').innerText = patients.length;
        document.getElementById('stat-appts').innerText = patients.length;
      }

      function openBookModal() {
        const name = prompt('Patient Name:');
        if (!name) return;
        const doctor = prompt('Assign Doctor Name:', 'Dr. Sarah Jenkins') || 'Dr. House';
        const dept = prompt('Department (Cardiology/Neurology/Orthopedics):', 'Cardiology') || 'General';

        patients.unshift({
          id: Date.now(),
          name,
          doctor,
          dept,
          time: 'Just Now',
          status: 'Scheduled'
        });
        renderPatients();
        showToast('✓ Patient "' + name + '" registered & appointment scheduled!');
      }

      function generatePrescription(name) {
        alert('📜 Medical Prescription Generated for ' + name + '\n• Rx: Amoxicillin 500mg (2x daily)\n• Advised Rest: 3 days');
      }

      function deletePatient(id) {
        patients = patients.filter(p => p.id !== id);
        renderPatients();
        showToast('Patient discharged', 'info');
      }

      function filterPatients() { renderPatients(); }
      renderPatients();
    </script>
  `;
}

function renderSchoolEngine(appType, features) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-extrabold text-white">🎓 ${escapeHtml(appType)}</h2>
          <p class="text-xs text-slate-400">Student attendance tracking, examination grade card calculation, and timetable.</p>
        </div>
        <button onclick="addStudentModal()" class="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-pink-500/20">
          ➕ Register New Student
        </button>
      </div>

      <div class="grid grid-cols-4 gap-4">
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Total Students</div>
          <div id="stat-students" class="text-2xl font-extrabold text-white mt-1">3</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Today's Attendance</div>
          <div class="text-2xl font-extrabold text-emerald-400 mt-1">100%</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Active Classes</div>
          <div class="text-2xl font-extrabold text-amber-300 mt-1">12</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Average GPA</div>
          <div class="text-2xl font-extrabold text-purple-400 mt-1">3.85</div>
        </div>
      </div>

      <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div class="p-4 border-b border-slate-800 font-bold text-sm text-white">Student Roster & Grade Cards</div>
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th class="p-3.5">Student Name</th>
              <th class="p-3.5">Class / Grade</th>
              <th class="p-3.5">GPA</th>
              <th class="p-3.5">Attendance Status</th>
              <th class="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="student-tbody" class="divide-y divide-slate-800 text-slate-200"></tbody>
        </table>
      </div>
    </div>

    <script>
      let students = [
        { id: 1, name: "David Miller", grade: "Class 10-A", gpa: "3.9", status: "Present" },
        { id: 2, name: "Sophia Zhang", grade: "Class 10-A", gpa: "4.0", status: "Present" },
        { id: 3, name: "Marcus Vance", grade: "Class 10-B", gpa: "3.7", status: "Present" }
      ];

      function renderStudents() {
        const tbody = document.getElementById('student-tbody');
        tbody.innerHTML = '';
        students.forEach(s => {
          const tr = document.createElement('tr');
          tr.className = "animate-in";
          tr.innerHTML = \`
            <td class="p-3.5 font-bold text-white">${"safeText(s.name)"}</td>
            <td class="p-3.5">${"safeText(s.grade)"}</td>
            <td class="p-3.5 font-extrabold text-amber-300">\${s.gpa}</td>
            <td class="p-3.5"><button onclick="toggleAttendance(\${s.id})" class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">\${s.status} (Click to change)</button></td>
            <td class="p-3.5 text-right"><button onclick="deleteStudent(\${s.id})" class="text-slate-400 hover:text-red-400">Remove</button></td>
          \`;
          tbody.appendChild(tr);
        });
        document.getElementById('stat-students').innerText = students.length;
      }

      function toggleAttendance(id) {
        const st = students.find(s => s.id === id);
        if (!st) return;
        st.status = st.status === 'Present' ? 'Absent' : 'Present';
        renderStudents();
        showToast('Attendance updated for ' + st.name);
      }

      function addStudentModal() {
        const name = prompt('Student Name:');
        if (!name) return;
        const grade = prompt('Class (e.g. Class 10-A):', 'Class 10-A') || 'Class 10';
        const gpa = prompt('GPA Score (0.0 - 4.0):', '3.8') || '3.5';

        students.unshift({ id: Date.now(), name, grade, gpa, status: 'Present' });
        renderStudents();
        showToast('✓ Student "' + name + '" enrolled!');
      }

      function deleteStudent(id) {
        students = students.filter(s => s.id !== id);
        renderStudents();
      }

      renderStudents();
    </script>
  `;
}

function renderTaskKanbanEngine(appType, features) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-extrabold text-white">📋 ${escapeHtml(appType)}</h2>
          <p class="text-xs text-slate-400">Interactive Kanban task board with status movements & task creation.</p>
        </div>
        <button onclick="openAddTaskModal()" class="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-pink-500/20">
          ➕ Add New Task
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- TO DO COLUMN -->
        <div class="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
          <div class="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>To Do</span>
            <span id="count-todo" class="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] flex items-center justify-center font-bold">0</span>
          </div>
          <div id="col-todo" class="space-y-3 min-h-[300px]"></div>
        </div>

        <!-- IN PROGRESS COLUMN -->
        <div class="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
          <div class="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>In Progress</span>
            <span id="count-progress" class="w-5 h-5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] flex items-center justify-center font-bold">0</span>
          </div>
          <div id="col-progress" class="space-y-3 min-h-[300px]"></div>
        </div>

        <!-- COMPLETED COLUMN -->
        <div class="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
          <div class="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Completed</span>
            <span id="count-completed" class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] flex items-center justify-center font-bold">0</span>
          </div>
          <div id="col-completed" class="space-y-3 min-h-[300px]"></div>
        </div>
      </div>
    </div>

    <script>
      let tasks = [
        { id: 1, title: "Design Payment Gateway UI", desc: "Integrate Stripe & PayPal checkout flow", col: "todo", priority: "High" },
        { id: 2, title: "JWT Auth REST API", desc: "Express token validation route", col: "progress", priority: "Urgent" },
        { id: 3, title: "Database Schema Architecture", desc: "MongoDB Mongoose index validation", col: "completed", priority: "Normal" }
      ];

      function renderKanban() {
        const todoCol = document.getElementById('col-todo');
        const progressCol = document.getElementById('col-progress');
        const completedCol = document.getElementById('col-completed');

        todoCol.innerHTML = '';
        progressCol.innerHTML = '';
        completedCol.innerHTML = '';

        let todoCount = 0, progressCount = 0, completedCount = 0;

        tasks.forEach(t => {
          const card = document.createElement('div');
          card.className = "animate-in bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-pink-500/50 transition";
          
          let actionBtns = '';
          if (t.col === 'todo') {
            actionBtns = '<button onclick="moveTask(' + t.id + ', \'progress\')" class="text-[11px] text-pink-400 font-bold hover:underline">Start Task →</button>';
            todoCount++;
          } else if (t.col === 'progress') {
            actionBtns = '<button onclick="moveTask(' + t.id + ', \'completed\')" class="text-[11px] text-emerald-400 font-bold hover:underline">✓ Complete Task</button>';
            progressCount++;
          } else {
            actionBtns = '<span class="text-[11px] text-emerald-400 font-bold">Completed</span>';
            completedCount++;
          }

          card.innerHTML = \`
            <div class="flex items-center justify-between">
              <span class="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-bold">\${t.priority}</span>
              <button onclick="deleteTask(\${t.id})" class="text-slate-500 hover:text-red-400 text-xs">✕</button>
            </div>
            <div class="text-xs font-bold text-white">${"safeText(t.title)"}</div>
            <div class="text-[11px] text-slate-400">${"safeText(t.desc)"}</div>
            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              \${actionBtns}
            </div>
          \`;

          if (t.col === 'todo') todoCol.appendChild(card);
          else if (t.col === 'progress') progressCol.appendChild(card);
          else completedCol.appendChild(card);
        });

        document.getElementById('count-todo').innerText = todoCount;
        document.getElementById('count-progress').innerText = progressCount;
        document.getElementById('count-completed').innerText = completedCount;
      }

      function moveTask(id, targetCol) {
        const t = tasks.find(x => x.id === id);
        if (!t) return;
        t.col = targetCol;
        renderKanban();
        showToast('Task "' + t.title + '" moved to ' + targetCol);
      }

      function openAddTaskModal() {
        const title = prompt('Task Title:');
        if (!title) return;
        const desc = prompt('Description:', 'Task requirement details') || '';
        const priority = prompt('Priority (High/Normal/Urgent):', 'High') || 'Normal';

        tasks.unshift({
          id: Date.now(),
          title,
          desc,
          col: 'todo',
          priority
        });
        renderKanban();
        showToast('✓ Task created!');
      }

      function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        renderKanban();
      }

      renderKanban();
    </script>
  `;
}

function renderInventoryEngine(appType, features) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-extrabold text-white">📦 ${escapeHtml(appType)}</h2>
          <p class="text-xs text-slate-400">Warehouse stock tracker, supplier directory, and low-stock warning alerts.</p>
        </div>
        <button onclick="addStockItemModal()" class="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-pink-500/20">
          ➕ Restock Product
        </button>
      </div>

      <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div class="p-4 border-b border-slate-800 font-bold text-sm text-white">Stock Level Inventory</div>
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th class="p-3.5">Product Name</th>
              <th class="p-3.5">Category</th>
              <th class="p-3.5">Stock Quantity</th>
              <th class="p-3.5">Alert Threshold</th>
              <th class="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="inventory-tbody" class="divide-y divide-slate-800 text-slate-200"></tbody>
        </table>
      </div>
    </div>

    <script>
      let stock = [
        { id: 1, name: "SSD Hard Drive 1TB", cat: "Electronics", qty: 45, threshold: 10 },
        { id: 2, name: "USB-C Fast Charger Cable", cat: "Accessories", qty: 4, threshold: 10 },
        { id: 3, name: "Wireless Bluetooth Mouse", cat: "Hardware", qty: 28, threshold: 5 }
      ];

      function renderInventory() {
        const tbody = document.getElementById('inventory-tbody');
        tbody.innerHTML = '';
        stock.forEach(item => {
          const tr = document.createElement('tr');
          tr.className = "animate-in";
          const isLow = item.qty <= item.threshold;

          tr.innerHTML = \`
            <td class="p-3.5 font-bold text-white">${"safeText(item.name)"}</td>
            <td class="p-3.5">${"safeText(item.cat)"}</td>
            <td class="p-3.5 font-extrabold \${isLow ? 'text-pink-400 animate-pulse' : 'text-emerald-400'}">\${item.qty} units</td>
            <td class="p-3.5 text-slate-400">\${item.threshold} units</td>
            <td class="p-3.5 text-right space-x-2">
              <button onclick="adjustQty(\${item.id}, 5)" class="bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg border border-slate-700">+5 Restock</button>
              <button onclick="adjustQty(\${item.id}, -1)" class="bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg border border-slate-700">-1 Dispatch</button>
            </td>
          \`;
          tbody.appendChild(tr);
        });
      }

      function adjustQty(id, delta) {
        const item = stock.find(x => x.id === id);
        if (!item) return;
        item.qty = Math.max(0, item.qty + delta);
        renderInventory();
        showToast('Stock updated for ' + item.name);
      }

      function addStockItemModal() {
        const name = prompt('Product Name:');
        if (!name) return;
        const cat = prompt('Category:', 'Electronics') || 'General';
        const qty = parseInt(prompt('Initial Quantity:', '20') || '20');

        stock.unshift({ id: Date.now(), name, cat, qty, threshold: 5 });
        renderInventory();
        showToast('✓ Restocked product "' + name + '"!');
      }

      renderInventory();
    </script>
  `;
}

function renderFinanceEngine(appType, features) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-extrabold text-white">💳 ${escapeHtml(appType)}</h2>
          <p class="text-xs text-slate-400">Income & expense transaction logging with live balance calculations.</p>
        </div>
        <button onclick="addTransactionModal()" class="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-pink-500/20">
          ➕ Log Transaction
        </button>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Net Account Balance</div>
          <div id="stat-balance" class="text-2xl font-extrabold text-emerald-400 mt-1">$4,060.00</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Total Income</div>
          <div id="stat-income" class="text-2xl font-extrabold text-white mt-1">$5,200.00</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Total Expenses</div>
          <div id="stat-expenses" class="text-2xl font-extrabold text-pink-400 mt-1">$1,140.00</div>
        </div>
      </div>

      <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div class="p-4 border-b border-slate-800 font-bold text-sm text-white">Financial Transactions Ledger</div>
        <table class="w-full text-left text-xs">
          <tbody id="finance-tbody" class="divide-y divide-slate-800 text-slate-200"></tbody>
        </table>
      </div>
    </div>

    <script>
      let transactions = [
        { id: 1, type: "Income", desc: "Client Project Milestone Payment", amount: 5200.00, cat: "Services", date: "Today" },
        { id: 2, type: "Expense", desc: "Cloud Hosting & Server Costs", amount: 1140.00, cat: "Infrastructure", date: "Yesterday" }
      ];

      function renderFinance() {
        const tbody = document.getElementById('finance-tbody');
        tbody.innerHTML = '';
        let inc = 0, exp = 0;

        transactions.forEach(t => {
          if (t.type === 'Income') inc += t.amount;
          else exp += t.amount;

          const tr = document.createElement('tr');
          tr.className = "animate-in";
          tr.innerHTML = \`
            <td class="p-3.5 font-bold text-white">${"safeText(t.desc)"}</td>
            <td class="p-3.5 text-slate-400">${"safeText(t.cat)"}</td>
            <td class="p-3.5 font-mono text-slate-400">\${t.date}</td>
            <td class="p-3.5 font-extrabold \${t.type === 'Income' ? 'text-emerald-400' : 'text-pink-400'}">\${t.type === 'Income' ? '+' : '-'}\$\${t.amount.toFixed(2)}</td>
            <td class="p-3.5 text-right"><button onclick="deleteTx(\${t.id})" class="text-slate-500 hover:text-red-400">Delete</button></td>
          \`;
          tbody.appendChild(tr);
        });

        document.getElementById('stat-income').innerText = '$' + inc.toFixed(2);
        document.getElementById('stat-expenses').innerText = '$' + exp.toFixed(2);
        document.getElementById('stat-balance').innerText = '$' + (inc - exp).toFixed(2);
      }

      function addTransactionModal() {
        const desc = prompt('Description:');
        if (!desc) return;
        const type = prompt('Type (Income/Expense):', 'Expense') || 'Expense';
        const amt = parseFloat(prompt('Amount ($):', '150.00')) || 50.00;

        transactions.unshift({ id: Date.now(), type: type === 'Income' ? 'Income' : 'Expense', desc, amount: amt, cat: 'General', date: 'Just Now' });
        renderFinance();
        showToast('✓ Transaction logged!');
      }

      function deleteTx(id) {
        transactions = transactions.filter(t => t.id !== id);
        renderFinance();
      }

      renderFinance();
    </script>
  `;
}

function renderFitnessEngine(appType, features) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-extrabold text-white">🏋️ ${escapeHtml(appType)}</h2>
          <p class="text-xs text-slate-400">Workout routine logger, exercise library, and calorie goal counter.</p>
        </div>
        <button onclick="logWorkoutModal()" class="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-pink-500/20">
          💪 Log Workout
        </button>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Calories Burned Today</div>
          <div id="stat-cals" class="text-2xl font-extrabold text-amber-300 mt-1">450 kcal</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Active Workouts</div>
          <div id="stat-workouts" class="text-2xl font-extrabold text-pink-400 mt-1">2 Logged</div>
        </div>
        <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div class="text-xs text-slate-400 font-medium">Weekly Goal</div>
          <div class="text-2xl font-extrabold text-emerald-400 mt-1">80% Achieved</div>
        </div>
      </div>
    </div>
  `;
}

function renderGenericCrudEngine(appType, entities, features) {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-extrabold text-white">🚀 ${escapeHtml(appType)}</h2>
          <p class="text-xs text-slate-400">Client-ready operational system dynamically constructed for parsed entities.</p>
        </div>
        <button onclick="openAddRecordModal()" class="bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-pink-500/20">
          ➕ New Entity Record
        </button>
      </div>

      <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div class="p-4 border-b border-slate-800 font-bold text-sm text-white flex items-center justify-between">
          <span>Active Data Ledger</span>
          <input id="crud-search" oninput="filterCrudRecords()" type="text" placeholder="Filter records..." class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs text-slate-200 focus:outline-none" />
        </div>
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th class="p-3.5">Record ID</th>
              <th class="p-3.5">Entity / Record Title</th>
              <th class="p-3.5">Category</th>
              <th class="p-3.5">Status</th>
              <th class="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="crud-tbody" class="divide-y divide-slate-800 text-slate-200"></tbody>
        </table>
      </div>
    </div>

    <script>
      let records = [
        ${entities.map((e, idx) => `{ id: ${idx + 1}, title: "${e} Core Record", cat: "${e}", status: "Active" }`).join(',\n')}
      ];

      function renderCrud() {
        const tbody = document.getElementById('crud-tbody');
        const search = document.getElementById('crud-search').value.toLowerCase();
        tbody.innerHTML = '';

        records.filter(r => r.title.toLowerCase().includes(search)).forEach(r => {
          const tr = document.createElement('tr');
          tr.className = "animate-in";
          tr.innerHTML = \`
            <td class="p-3.5 font-mono text-slate-400">#REC-00${"r.id"}</td>
            <td class="p-3.5 font-bold text-white">${"safeText(r.title)"}</td>
            <td class="p-3.5 text-slate-400">${"safeText(r.cat)"}</td>
            <td class="p-3.5"><span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">\${r.status}</span></td>
            <td class="p-3.5 text-right space-x-2">
              <button onclick="editRecord(\${r.id})" class="text-pink-400 font-bold hover:underline">Edit</button>
              <button onclick="deleteRecord(\${r.id})" class="text-slate-500 hover:text-red-400">Delete</button>
            </td>
          \`;
          tbody.appendChild(tr);
        });
      }

      function openAddRecordModal() {
        const title = prompt('Record Name/Title:');
        if (!title) return;
        const cat = prompt('Entity Category:', 'System') || 'General';

        records.unshift({ id: Date.now(), title, cat, status: 'Active' });
        renderCrud();
        showToast('✓ Record "' + title + '" created!');
      }

      function editRecord(id) {
        const r = records.find(x => x.id === id);
        if (!r) return;
        const newTitle = prompt('Edit Record Title:', r.title);
        if (newTitle) {
          r.title = newTitle;
          renderCrud();
          showToast('✓ Record updated!');
        }
      }

      function deleteRecord(id) {
        records = records.filter(r => r.id !== id);
        renderCrud();
        showToast('Record deleted', 'info');
      }

      function filterCrudRecords() { renderCrud(); }
      renderCrud();
    </script>
  `;
}

function getPreviewTheme(uiStyle) {
  const themes = {
    glassmorphism: "glassmorphism",
    minimalism: "minimalism",
    cyberpunk: "cyberpunk",
    neumorphism: "neumorphism",
  };
  return themes[uiStyle] || themes.glassmorphism;
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
