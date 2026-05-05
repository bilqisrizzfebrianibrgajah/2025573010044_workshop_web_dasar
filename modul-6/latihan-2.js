const products = [
    { id: 1, name: "Chocolate Cake", price: 180000, img: "https://tse4.mm.bing.net/th/id/OIP.E3YF1-N2ZzfLHz8IKkLBTgHaE8?pid=Api&P=0&h=180" },
    { id: 2, name: "Strawberry Cake", price: 165000, img: "https://houseofnasheats.com/wp-content/uploads/2023/01/Strawberry-Cake-Recipe-15.jpg" },
    { id: 3, name: "Birthday Cake", price: 350000, img: "https://sallysbakingaddiction.com/wp-content/uploads/2022/09/funfetti-birthday-cake.jpg" },
    { id: 4, name: "Tiramisu Cake", price: 195000, img: "https://www.tiramisucake.com/wp-content/uploads/2025/09/tiramisu-layer-cake-hero-768x578.webp" },
    { id: 5, name: "lotus biscoff cake", price: 210000, img: "https://thedessertlounge.in/wp-content/uploads/2025/01/IMG_5560-scaled.jpg" },
    { id: 6, name: "Red Velvet Cake", price: 225000, img: "https://i.pinimg.com/236x/16/3e/2e/163e2ecf77d82f71430361fd1a3c2ad2.jpg" }
];

let cartState = [];

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p style="font-weight: bold; color: #888;">Rp ${p.price.toLocaleString('id-ID')}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Tambah</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cartState.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartState.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function updateQuantity(productId, delta) {
    const item = cartState.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cartState = cartState.filter(i => i.id !== productId);
        }
    }
    renderCart();
}

function removeFromCart(productId) {
    cartState = cartState.filter(item => item.id !== productId);
    renderCart();
}

function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartBadge = document.getElementById('cart-badge');

    if (cartState.length === 0) {
        cartItemsElement.innerHTML = '<p style="color: #bbb;">Belum ada kue yang dipilih...</p>';
        cartTotalElement.innerText = '0';
        cartBadge.innerText = '0';
        return;
    }

    let total = 0;
    let totalItems = 0;

    cartItemsElement.innerHTML = cartState.map(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        totalItems += item.quantity;

        return `
            <div class="cart-item">
                <div style="max-width: 60%;">
                    <strong style="color: #d63384;">${item.name}</strong><br>
                    <small>${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}</small>
                </div>
                <div class="cart-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span style="margin: 0 5px;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})" style="background:none; color:#bbb; margin-left:10px;">🗑️</button>
                </div>
            </div>
        `;
    }).join('');

    cartTotalElement.innerText = total.toLocaleString('id-ID');
    cartBadge.innerText = totalItems;
}

function checkout() {
    if (cartState.length === 0) return alert("Wah, keranjang masih kosong nih!");
    
    let summary = "🍰 Ringkasan Pesanan Charmed Cakes 🍰\n\n";
    cartState.forEach(item => {
        summary += `• ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    summary += `\nTotal Akhir: Rp ${document.getElementById('cart-total').innerText}\n\nTerima kasih telah memesan!`;
    
    alert(summary);
    cartState = []; 
    renderCart();
}
displayProducts();