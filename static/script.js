
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

    if (!countElement) return;

    let totalQuantity = 0;

    cart.forEach(function(item) {
        totalQuantity += Number(item.quantity || 1);
    });

    countElement.innerText = totalQuantity;
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productName, price) {

    const existingProduct = cart.find(
        item => item.name === productName
    );

    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity || 1) + 1;

    } else {

        cart.push({
            name: productName,
            price: Number(price),
            quantity: 1
        });
    }

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

    const productElement =
        document.getElementById("orderProduct");

    const priceElement =
        document.getElementById("orderPrice");

    const modal =
        document.getElementById("orderModal");

    if (!modal) return;

    if (productElement) {
        productElement.innerText = name;
    }

    if (priceElement) {
        priceElement.innerText =
            "₹" + Number(price).toLocaleString("en-IN");
    }

    modal.dataset.product = name;
    modal.dataset.price = price;

    modal.style.display = "block";
}


// ===============================
// CLOSE ORDER
// ===============================

function closeOrder() {

    const modal =
        document.getElementById("orderModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    const modal =
        document.getElementById("cartModal");

    if (!modal) return;

    displayCart();

    modal.style.display = "block";
}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    const modal =
        document.getElementById("cartModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty 🛒</p>";

        cartTotal.innerText = "0";

        return;
    }

    let total = 0;

    cart.forEach(function(item, index) {

        const price = Number(item.price);
        const quantity = Number(item.quantity || 1);
        const itemTotal = price * quantity;

        total += itemTotal;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div class="cart-product-info">

                <strong>${item.name}</strong>

                <br>

                ₹${price.toLocaleString("en-IN")}
                × ${quantity}

                <div class="quantity-controls">

                    <button
                        class="quantity-button"
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span class="quantity-number">
                        ${quantity}
                    </span>

                    <button
                        class="quantity-button"
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <div class="item-total">
                    Item Total:
                    ₹${itemTotal.toLocaleString("en-IN")}
                </div>

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

    let total = 0;

    cart.forEach((item, index) => {

        total += Number(item.price);

        const div =
            document.createElement("div");

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
        document.getElementById("customerName")
        .value.trim();

    const mobile =
        document.getElementById("customerMobile")
        .value.trim();

    const address =
        document.getElementById("customerAddress")
        .value.trim();


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Please 10-digit mobile number enter karo."
        );

        return;
    }


    if (!name || !address) {

        alert("Please complete all details.");

        return;
    }


    let message =
        "*NEW ORDER - ROYAL.SHOPING*%0A%0A" +

        `📦 *Product:* ${product}%0A` +

        `💰 *Price:* ₹${Number(price)
            .toLocaleString("en-IN")}%0A` +

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
// CLOSE MODAL OUTSIDE CLICK
// ===============================

window.addEventListener("click", function(event) {

    const orderModal =
        document.getElementById("orderModal");

    const cartModal =
        document.getElementById("cartModal");


    if (
        orderModal &&
        event.target === orderModal
    ) {
        closeOrder();
    }


    if (
        cartModal &&
        event.target === cartModal
    ) {
        closeCart();
    }

});


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();

});
function increaseQuantity(index) {

    if (!cart[index]) return;

    cart[index].quantity =
        Number(cart[index].quantity || 1) + 1;

    localStorage.setItem(
        "royalShopingCart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}


function decreaseQuantity(index) {

    if (!cart[index]) return;

    const quantity =
        Number(cart[index].quantity || 1);

    if (quantity > 1) {

        cart[index].quantity = quantity - 1;

    } else {

        cart.splice(index, 1);
    }

    localStorage.setItem(
        "royalShopingCart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}
