let cartCount = 0;

function addToCart(productName) {
    cartCount++;
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cartCount;
    }
    alert(productName + ' cart me add ho gaya hai!');
}

function buyNow(name, price) {
    const prodNameInput = document.getElementById('prodName');
    const prodPriceInput = document.getElementById('prodPrice');
    const checkoutModal = document.getElementById('checkoutModal');

    if (prodNameInput && prodPriceInput && checkoutModal) {
        prodNameInput.value = name;
        prodPriceInput.value = price;
        checkoutModal.style.display = 'block';
    }
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.style.display = 'none';
    }
}

function submitOrder(event) {
    event.preventDefault();
    
    let product = document.getElementById('prodName').value;
    let price = document.getElementById('prodPrice').value;
    let name = document.getElementById('custName').value;
    let mobile = document.getElementById('custMobile').value;
    let address = document.getElementById('custAddress').value;
    let payment = document.getElementById('payMethod').value;

    let message = `*NEW ORDER - ROYAL.SHOPING*%0A%0A` +
                  `📦 *Product:* \({product} (₹\){price})%0A` +
                  `👤 *Name:* ${name}%0A` +
                  `📞 *Mobile:* ${mobile}%0A` +
                  `📍 *Address:* ${address}%0A` +
                  `💳 *Payment:* ${payment}`;

    let ownerWhatsApp = "919888888888"; // Yahan apna WhatsApp number daal sakte hain
    let whatsappUrl = `https://wa.me/\({ownerWhatsApp}?text=\){message}`;
    window.open(whatsappUrl, '_blank');
}

function openCart() {
    alert('Aapke cart me ' + cartCount + ' items hain.');
}
