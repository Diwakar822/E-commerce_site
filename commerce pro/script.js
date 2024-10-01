const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.querySelector(".close");

let products = [];

// Fetch products from the Fake Store API
async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();
    displayProducts(products);
}

// Display products in cards
function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        card.addEventListener("click", () => openModal(product));
        productContainer.appendChild(card);
    });
}

// Open modal with product details
function openModal(product) {
    modalTitle.innerText = product.title;
    modalImage.src = product.image;
    modalDescription.innerText = product.description;
    modal.style.display = "block";
}

// Close modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Filter products based on search input
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Initialize
fetchProducts();
