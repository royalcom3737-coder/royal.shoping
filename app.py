from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import os
import json
import secrets

app = Flask(__name__, static_folder="static", template_folder="templates")

# Secret key
app.secret_key = os.environ.get("SECRET_KEY", secrets.token_hex(32))

# Owner login
OWNER_USERNAME = "royalshoping.com"
OWNER_PASSWORD = os.environ.get("OWNER_PASSWORD", "CHANGE_THIS_PASSWORD")

# Product storage
PRODUCT_FILE = "products.json"


def load_products():
    if not os.path.exists(PRODUCT_FILE):
        return []

    try:
        with open(PRODUCT_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except:
        return []


def save_products(products):
    with open(PRODUCT_FILE, "w", encoding="utf-8") as file:
        json.dump(products, file, indent=4, ensure_ascii=False)


# ===============================
# CUSTOMER HOME
# ===============================

@app.route("/")
def home():
    products = load_products()
    return render_template("index.html", products=products)


# ===============================
# OWNER LOGIN
# ===============================

@app.route("/owner/login", methods=["GET", "POST"])
def owner_login():

    if request.method == "POST":

        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        if username == OWNER_USERNAME and password == OWNER_PASSWORD:
            session["owner_logged_in"] = True
            return redirect(url_for("owner_panel"))

        return render_template(
            "owner_login.html",
            error="Invalid username or password"
        )

    return render_template("owner_login.html")


# ===============================
# OWNER LOGOUT
# ===============================

@app.route("/owner/logout")
def owner_logout():

    session.pop("owner_logged_in", None)

    return redirect(url_for("owner_login"))


# ===============================
# OWNER PANEL
# ===============================

@app.route("/owner")
def owner_panel():

    if not session.get("owner_logged_in"):
        return redirect(url_for("owner_login"))

    products = load_products()

    return render_template(
        "owner.html",
        products=products
    )


# ===============================
# ADD PRODUCT
# ===============================

@app.route("/owner/add-product", methods=["POST"])
def add_product():

    if not session.get("owner_logged_in"):
        return redirect(url_for("owner_login"))

    products = load_products()

    new_product = {
        "id": secrets.token_hex(8),
        "name": request.form.get("name", "").strip(),
        "category": request.form.get("category", "").strip(),
        "description": request.form.get("description", "").strip(),
        "price": float(request.form.get("price", 0)),
        "image": request.form.get("image", "").strip(),
        "stock": int(request.form.get("stock", 0))
    }

    products.append(new_product)

    save_products(products)

    return redirect(url_for("owner_panel"))


# ===============================
# DELETE PRODUCT
# ===============================

@app.route("/owner/delete-product/<product_id>", methods=["POST"])
def delete_product(product_id):

    if not session.get("owner_logged_in"):
        return redirect(url_for("owner_login"))

    products = load_products()

    products = [
        product
        for product in products
        if product.get("id") != product_id
    ]

    save_products(products)

    return redirect(url_for("owner_panel"))


# ===============================
# UPDATE PRODUCT
# ===============================

@app.route("/owner/update-product/<product_id>", methods=["POST"])
def update_product(product_id):

    if not session.get("owner_logged_in"):
        return redirect(url_for("owner_login"))

    products = load_products()

    for product in products:

        if product.get("id") == product_id:

            product["name"] = request.form.get(
                "name", ""
            ).strip()

            product["category"] = request.form.get(
                "category", ""
            ).strip()

            product["description"] = request.form.get(
                "description", ""
            ).strip()

            product["price"] = float(
                request.form.get("price", 0)
            )

            product["image"] = request.form.get(
                "image", ""
            ).strip()

            product["stock"] = int(
                request.form.get("stock", 0)
            )

            break

    save_products(products)

    return redirect(url_for("owner_panel"))


# ===============================
# PRODUCTS API
# ===============================

@app.route("/api/products")
def products_api():

    products = load_products()

    return jsonify(products)


# ===============================
# RUN
# ===============================

if __name__ == "__main__":
    app.run(debug=True)
