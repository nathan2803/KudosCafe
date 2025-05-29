/**
 * Modal Functions
 */

// Item modal elements
const itemModal = document.getElementById('itemModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const itemQuantity = document.getElementById('itemQuantity');
const addToOrderBtn = document.getElementById('addToOrder');
const closeItemModalBtn = document.getElementById('closeItemModal');
const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
const increaseQuantityBtn = document.getElementById('increaseQuantity');

// Cart modal elements
const cartModal = document.getElementById('cartModal');
const closeCartModalBtn = document.getElementById('closeCartModal');
const clearCartBtn = document.getElementById('clearCartBtn');
const proceedToBookingBtn = document.getElementById('proceedToBookingBtn');
const startOrderingBtn = document.getElementById('startOrderingBtn');

// Booking modal elements
const bookingModal = document.getElementById('bookingModal');
const closeBookingModalBtn = document.getElementById('closeBookingModal');

// Current selected item
let currentItem = null;

// Open item modal with item details
function openItemModal(item) {
    // Set current item
    currentItem = item;
    
    // Update modal content
    modalImage.src = item.image;
    modalTitle.textContent = item.title;
    modalPrice.textContent = formatCurrency(item.price);
    modalDescription.textContent = item.description;
    itemQuantity.value = '1';
    
    // Open modal
    openModal(itemModal);
}

// Open cart modal
function openCartModal() {
    updateCartModal();
    openModal(cartModal);
}

// Open modal
function openModal(modal) {
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    
    // Display modal
    modal.style.display = 'block';
    
    // Trigger animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Close modal
function closeModal(modal) {
    // Remove show class to trigger animation
    modal.classList.remove('show');
    
    // Hide modal after animation
    setTimeout(() => {
        modal.style.display = 'none';
        
        // Enable body scroll if no modals are open
        if (!document.querySelector('.modal.show')) {
            document.body.style.overflow = 'auto';
        }
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target);
    }
});

// Event Listeners for Item Modal
closeItemModalBtn.addEventListener('click', () => closeModal(itemModal));

decreaseQuantityBtn.addEventListener('click', () => {
    const currentValue = parseInt(itemQuantity.value);
    if (currentValue > 1) {
        itemQuantity.value = currentValue - 1;
    }
});

increaseQuantityBtn.addEventListener('click', () => {
    const currentValue = parseInt(itemQuantity.value);
    itemQuantity.value = currentValue + 1;
});

itemQuantity.addEventListener('change', () => {
    // Ensure minimum value is 1
    if (parseInt(itemQuantity.value) < 1) {
        itemQuantity.value = '1';
    }
});

addToOrderBtn.addEventListener('click', () => {
    if (currentItem) {
        const quantity = parseInt(itemQuantity.value);
        addToCart(currentItem, quantity);
        
        closeModal(itemModal);
        showToast(`Added ${quantity} × ${currentItem.title} to your order`, 'success');
    }
});

// Event Listeners for Cart Modal
closeCartModalBtn.addEventListener('click', () => closeModal(cartModal));

clearCartBtn.addEventListener('click', () => {
    if (cartItems.length > 0) {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            showToast('Your cart has been cleared', 'info');
        }
    }
});

proceedToBookingBtn.addEventListener('click', () => {
    closeModal(cartModal);
    initBookingModal();
});

startOrderingBtn.addEventListener('click', () => {
    closeModal(cartModal);
});

// Event Listeners for Booking Modal
closeBookingModalBtn.addEventListener('click', () => closeModal(bookingModal));