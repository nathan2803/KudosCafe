/**
 * Cart Functionality
 */

// Cart state
let cartItems = [];

// Add item to cart
function addToCart(item, quantity) {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            ...item,
            quantity
        });
    }
    
    // Update cart display
    updateCartCount();
    updateCartModal();
    
    // Save to local storage
    saveCart();
}

// Remove item from cart
function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    
    // Update cart display
    updateCartCount();
    updateCartModal();
    
    // Save to local storage
    saveCart();
}

// Update item quantity in cart
function updateCartItemQuantity(itemId, newQuantity) {
    const item = cartItems.find(item => item.id === itemId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            updateCartModal();
            saveCart();
        }
    }
}

// Calculate cart totals
function calculateCartTotals() {
    const subtotal = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    
    return {
        subtotal,
        total: subtotal // Add tax or other calculations if needed
    };
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    cartCount.textContent = totalItems;
    
    // Toggle visibility
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

// Update cart modal contents
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('cartEmpty');
    const orderSummary = document.getElementById('orderSummary');
    const subtotalElement = document.getElementById('subtotalAmount');
    const totalElement = document.getElementById('totalAmount');
    
    // Clear current items
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        // Show empty state
        emptyCart.style.display = 'flex';
        cartItemsContainer.style.display = 'none';
        orderSummary.style.display = 'none';
    } else {
        // Hide empty state, show items and summary
        emptyCart.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        orderSummary.style.display = 'block';
        
        // Add items to container
        cartItems.forEach(item => {
            const cartItemElement = createCartItemElement(item);
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Update totals
        const { subtotal, total } = calculateCartTotals();
        subtotalElement.textContent = formatCurrency(subtotal);
        totalElement.textContent = formatCurrency(total);
    }
    
    // Update proceed button state
    const proceedButton = document.getElementById('proceedToBookingBtn');
    proceedButton.disabled = cartItems.length === 0;
    
    if (cartItems.length === 0) {
        proceedButton.classList.add('disabled');
    } else {
        proceedButton.classList.remove('disabled');
    }
}

// Create cart item element
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.itemId = item.id;
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
                <button class="cart-quantity-btn decrease" data-item-id="${item.id}">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span class="cart-item-quantity-value">${item.quantity}</span>
                <button class="cart-quantity-btn increase" data-item-id="${item.id}">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
        <div class="cart-item-subtotal">
            <span>Subtotal</span>
            <span class="cart-item-subtotal-value">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <div class="cart-item-remove" data-item-id="${item.id}">
            <i class="fa-solid fa-xmark"></i>
        </div>
    `;
    
    // Add event listeners
    const decreaseBtn = cartItem.querySelector('.decrease');
    const increaseBtn = cartItem.querySelector('.increase');
    const removeBtn = cartItem.querySelector('.cart-item-remove');
    
    decreaseBtn.addEventListener('click', () => {
        updateCartItemQuantity(item.id, item.quantity - 1);
    });
    
    increaseBtn.addEventListener('click', () => {
        updateCartItemQuantity(item.id, item.quantity + 1);
    });
    
    removeBtn.addEventListener('click', () => {
        removeFromCart(item.id);
    });
    
    return cartItem;
}

// Save cart to local storage
function saveCart() {
    storage.set('cartItems', cartItems);
}

// Load cart from local storage
function loadCart() {
    const savedCart = storage.get('cartItems');
    if (savedCart) {
        cartItems = savedCart;
        updateCartCount();
    }
}

// Clear cart
function clearCart() {
    cartItems = [];
    updateCartCount();
    updateCartModal();
    saveCart();
}