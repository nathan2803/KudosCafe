/**
 * Main Application Logic
 */

// DOM elements
const cartIconWrapper = document.querySelector('.cart-icon-wrapper');
const categoryNav = document.getElementById('categoryNav');
const viewOrderBtn = document.getElementById('viewOrderBtn');

// Initialize application
function initApp() {
    // Load saved cart
    loadCart();
    
    // Set initial category
    renderMenu('appetizer');
    
    // Add event listeners
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Category navigation
    categoryNav.querySelectorAll('.nav-link').forEach(link => {
        if (!link.classList.contains('orders-link')) {
            link.addEventListener('click', handleCategoryClick);
        }
    });
    
    // Cart icon click
    cartIconWrapper.addEventListener('click', () => {
        openCartModal();
    });
    
    // View order button
    viewOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartModal();
    });
}

// Handle category link click
function handleCategoryClick(e) {
    e.preventDefault();
    
    // Get category from data attribute
    const category = this.dataset.category;
    
    // Update active class
    categoryNav.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    this.classList.add('active');
    
    // Render menu for selected category
    renderMenu(category);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);