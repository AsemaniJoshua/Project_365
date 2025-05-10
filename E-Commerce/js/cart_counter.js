// localStorage.clear();

// Getting customerProducts array from localStorage or initializing it
let customerProducts = JSON.parse(localStorage.getItem("customerProducts")) || [];

// Function to update cart count display
function updateCartCount() {
    // Cart Item counter
    let cartCount = 0;

    // Looping through customerProducts array
    customerProducts.forEach(product => {
        cartCount += product.quantity;
    });

    // Updating cart count in stylesheet
    let StyleSheet = document.styleSheets[0];
    for (let i = 0; i < StyleSheet.cssRules.length; i++) {
        let rules = StyleSheet.cssRules[i];
        if (rules.selectorText == ".active::after") {
            rules.style.display = "block";
            rules.style.content = `"${cartCount}"`;
        }
    }
}

// Adding eventlistener to cart icon
document.getElementById("cart_icon").addEventListener("click", () => {
    window.location.href = "cart.html";
});


document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});
