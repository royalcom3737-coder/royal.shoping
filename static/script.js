let cart = [];

function addToCart(productId) {
    cart.push(productId);
    document.getElementById('cartCount').innerText = cart.length;
    document.getElementById('topCount').innerText = cart.length;
    alert('Product added to cart!');
}

function buyNow(productId) {
    let phone = "917887889634";
    let message = "Hello, I want to order product ID: " + productId;
    window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), "_blank");
}

function openCart() {
    document.getElementById('cartModal').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function checkout() {
    if(cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    let phone = "917887889634";
    let message = "Hello, I want to checkout with items: " + cart.join(', ');
    window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), "_blank");
}
