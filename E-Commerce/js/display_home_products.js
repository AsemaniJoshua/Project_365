// Displaying the products when the Page loads
function displayProducts() {
    const productContainer = document.getElementById("productCardContainer");

    HomePageProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("card");

        const ProductImage = document.createElement("img");
        ProductImage.src = product.image;
        ProductImage.alt = product.name;

        const ProductName = document.createElement("h2");
        ProductName.textContent = product.name;

        const ProductDescription = document.createElement("p");
        ProductDescription.textContent = product.description;

        const ProductPrice = document.createElement("p");
        ProductPrice.textContent = `$${product.price}`;

        const LinkToProduct = document.createElement("a");
        LinkToProduct.href = `Products.html`;
        LinkToProduct.setAttribute("id", "To_product_page_link");

        const Go_to_product_page = document.createElement("button");
        Go_to_product_page.textContent = "View in product page";
        Go_to_product_page.classList.add("view_in_product_page");



        productCard.appendChild(ProductImage);
        productCard.appendChild(ProductName);
        productCard.appendChild(ProductDescription);
        productCard.appendChild(ProductPrice);
        LinkToProduct.appendChild(Go_to_product_page)
        productCard.appendChild(LinkToProduct);

        productContainer.appendChild(productCard);
    });
}


// Page load logic
async function waitingForBrowser() {
    await new Promise(resolve => {
        document.addEventListener("DOMContentLoaded", resolve);
    });
    console.log("Page loaded");
}



// Function to handle the search functionality
function handleSearch() {
    const searchInput = document.getElementById("search_bar");
    const searchBtn = document.getElementById("search_btn");
    const productContainer = document.getElementById("productCardContainer");

    searchInput.addEventListener("keyup", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = ActualProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
        
        productContainer.innerHTML = "";
        
        // checking if filteredProducts is empty
        if (filteredProducts.length === 0) {
            productContainer.innerHTML = "<p style='margin: auto; font-size: 24px; font-weight: bold;'>No products found.</p>";
        } else {
            filteredProducts.forEach(product => {
                productContainer.innerHTML += `
                    <div class="card">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="cart_item_details">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Price: $${product.price}</p>
                        </div>
                        <div>
                            <button class="viewDetailsBtn" id="ViewProduct${product.id}">View Details</button>
                            <button class="addToCartBtn" id="AddProduct${product.id}">Add to Cart</button>                            
                        </div>
                    </div>
                `;
            });
        }

        attachEventListenersForViewDetails();
        // Functionality for close button
        document.addEventListener("click", (event) => {
        if (event.target && event.target.id === "closeBtn") {
            const viewDetailsSection = document.getElementById("viewDetailsSection");
            viewDetailsSection.style.display = "none";
        }
});
    });
}




// Functionality for Add to Cart button
function addToCartEventListeners() {
    ActualProducts.forEach(product => {
        const AddProductId = `AddProduct${product.id}`;
        const AddProductBtn = document.getElementById(AddProductId);

        if (AddProductBtn) {
            document.addEventListener("click", (event) => {
                if (event.target && event.target.id === `AddProduct${product.id}`) {
                    // Check if product is already in the cart
                    const existingProduct = customerProducts.find(p => p.id === product.id);

                    if (existingProduct) {
                        // Increase quantity
                        existingProduct.quantity += 1;
                    } else {
                        // Add product with quantity 1
                        customerProducts.push({ ...product, quantity: 1 });
                    }
                    // Storing customerProducts in localStorage
                    localStorage.setItem("customerProducts", JSON.stringify(customerProducts));

                    // Update cart count display
                    updateCartCount();

                    // Displaying message
                    console.log(`Added ${product.name} to cart`);
                    // alert(`Added ${product.name} to cart`);

                    // Showing toast
                    showToast(); 

                }
            });
        }
    });
}



// Functionality for Toast Notification
function showToast() { 
    const toast = document.getElementById("toast"); 
    toast.className = "toast show"; 
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000); 
}




// Function to attach event listeners
function attachEventListenersForViewDetails() {
    ActualProducts.forEach(product => {
        const ViewProductId = `ViewProduct${product.id}`;
        const ViewProductBtn = document.getElementById(ViewProductId);

        // Checking if the button is there or not
        if (ViewProductBtn) {
            ViewProductBtn.addEventListener("click", () => {
                // Calling the viewDetailsSection and viewDetailsContainer
                const viewDetailsSection = document.getElementById("viewDetailsSection");
                const viewDetailsContainer = document.getElementById("viewDetailsContainer");

                viewDetailsSection.style.display = "block";
                viewDetailsContainer.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}</p>
                    <div class="BtnContainer">
                        <button class="addToCart" id="AddProduct${product.id}">Add to Cart</button>
                        <button class="closeBtn" id="closeBtn">Close</button>
                    </div>
                `;
            });
        }
    });
}



// Functionality for close button
document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "closeBtn") {
        const viewDetailsSection = document.getElementById("viewDetailsSection");
        viewDetailsSection.style.display = "none";
    }
});


// Functionalities for categories
function handleCategory(){
    const categories = document.getElementById("category").value;
    const productContainer = document.getElementById("productCardContainer");

    productContainer.innerHTML = "";

    // Filtering for selected category
    const filteredProducts = HomePageProducts.filter(product => categories === "All" || product.category === categories);
    
    // Displaying filtered products
    filteredProducts.forEach(product => {
        productContainer.innerHTML += `
            <div class="card">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="cart_item_details">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Price: $${product.price}</p>
                        </div>
                        <div>
                            <button class="viewDetailsBtn" id="ViewProduct${product.id}">View Details</button>
                            <button class="addToCartBtn" id="AddProduct${product.id}">Add to Cart</button>                            
                        </div>
                    </div>
        `;

    });

    attachEventListenersForViewDetails();
    // Functionality for close button
    document.addEventListener("click", (event) => {
        if (event.target && event.target.id === "closeBtn") {
            const viewDetailsSection = document.getElementById("viewDetailsSection");
            viewDetailsSection.style.display = "none";
        }
    });
    
}

// Adding event listener to category dropdown
document.getElementById("category").addEventListener("change", handleCategory);





// calling the Asynchronous Function
waitingForBrowser().then(() => {
    displayProducts();
    handleSearch();
    addToCartEventListeners();
    attachEventListenersForViewDetails();
});









// Importing HomePageProducts from product.js
import { HomePageProducts, ActualProducts } from './product.js';