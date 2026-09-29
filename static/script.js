
// ===============================
// ROYAL.SHOPING
// Cart + Buy Now + WhatsApp Order
// ===============================

const OWNER_WHATSAPP = "917887889634";

let cart = JSON.parse(localStorage.getItem("royalShopingCart")) || [];


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {
    const countElement = document.getElementById("cartCount");

    if (countElement) {
        countElement.innerText = cart.length;
    }
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productName, price) {

    cart.push({
        name: productName,
        price: Number(price)
    });

    localStorage.setItem(
        "royalShopingCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(productName + " cart me add ho gaya hai! 🛒");
}


// ===============================
// BUY NOW
// ===============================

function buyNow(name, price) {

    document.getElementById("orderProduct").innerText = name;

    document.getElementById("orderPrice").innerText =
        "₹" + Number(price).toLocaleString("en-IN");

    // Store selected product for order
    const modal = document.getElementById("orderModal");

    modal.dataset.product = name;
    modal.dataset.price = price;

    modal.style.display = "block";
}


// ===============================
// CLOSE ORDER
// ===============================

function closeOrder() {

    const modal = document.getElementById("orderModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    const modal = document.getElementById("cartModal");

    if (!modal) return;

    displayCart();

    modal.style.display = "block";
}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    const modal = document.getElementById("cartModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty 🛒</p>";

        cartTotal.innerText = "0";

        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        total += Number(item.price);

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                ₹${Number(item.price).toLocaleString("en-IN")}
            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.innerText =
        total.toLocaleString("en-IN");
}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "royalShopingCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();
}


// ===============================
// CHECKOUT CART
// ===============================

function checkoutCart() {

    if (cart.length === 0) {

        alert("Cart empty hai bhai 🛒");

        return;
    }

    let message =
        "*NEW ORDER - ROYAL.SHOPING*%0A%0A";

    let total = 0;

    cart.forEach((item, index) => {

        total += Number(item.price);

        message +=
            `${index + 1}. ${item.name} - ₹${Number(item.price).toLocaleString("en-IN")}%0A`;
    });

    message +=
        `%0A*Total: ₹${total.toLocaleString("en-IN")}*%0A` +
        `💳 Payment: Cash on Delivery (COD)`;

    const whatsappURL =
        `https://wa.me/${OWNER_WHATSAPP}?text=${message}`;

    window.open(whatsappURL, "_blank");
}


// ===============================
// SUBMIT BUY NOW ORDER
// ===============================

function submitOrder(event) {

    event.preventDefault();

    const modal =
        document.getElementById("orderModal");

    const product =
        modal.dataset.product || "";

    const price =
        modal.dataset.price || "0";

    const name =
        document.getElementById("customerName").value.trim();

    const mobile =
        document.getElementById("customerMobile").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();


    // Mobile validation
    if (!/^[0-9]{10}$/.test(mobile)) {

        alert("Please 10-digit mobile number enter karo.");

        return;
    }


    if (!name || !address) {

        alert("Please complete all details.");

        return;
    }


    let message =
        "*NEW ORDER - ROYAL.SHOPING*%0A%0A" +

        `📦 *Product:* ${product}%0A` +

        `💰 *Price:* ₹${Number(price).toLocaleString("en-IN")}%0A` +

        `👤 *Name:* ${name}%0A` +

        `📞 *Mobile:* ${mobile}%0A` +

        `📍 *Address:* ${address}%0A` +

        `💳 *Payment:* Cash on Delivery (COD)`;


    const whatsappURL =
        `https://wa.me/${OWNER_WHATSAPP}?text=${message}`;


    window.open(whatsappURL, "_blank");


    closeOrder();
}


// ===============================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ===============================

window.addEventListener("click", function(event) {

    const orderModal =
        document.getElementById("orderModal");

    const cartModal =
        document.getElementById("cartModal");


    if (event.target === orderModal) {
        closeOrder();
    }

    if (event.target === cartModal) {
        closeCart();
    }

});


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();

});

