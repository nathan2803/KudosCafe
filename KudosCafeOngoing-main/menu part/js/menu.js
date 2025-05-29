/**
 * Menu Data and Functions
 */

// Menu data by category
const menuData = {
    appetizer: [
        {
            id: 'app1',
            title: 'Mojos',
            price: 125,
            description: 'Crispy potato wedges with signature seasoning',
            image: 'kudos/appetizer/Mojos.jpg'
        },
        {
            id: 'app2',
            title: 'Twister Fries',
            price: 145,
            description: 'Spiral-cut fries with spicy coating',
            image: 'kudos/appetizer/Twister Fries.jpg'
        },
        {
            id: 'app3',
            title: 'Bistro Fries',
            price: 125,
            description: 'Thick-cut fries with garlic parmesan',
            image: 'kudos/appetizer/Bistro Fries.jpg'
        },
        {
            id: 'app4',
            title: 'Buffalo Wings',
            price: 220,
            description: 'Crispy fried chicken wings with buffalo sauce',
            image: 'kudos/appetizer/Buffalo Wings.jpg',
            badge: 'popular'
        },
        {
            id: 'app5',
            title: 'Hickory Wings',
            price: 220,
            description: 'Smoky BBQ glazed chicken wings',
            image: 'kudos/appetizer/Hickory Wings.jpeg'
        },
        {
            id: 'app6',
            title: 'Mozzarella Sticks',
            price: 165,
            description: 'Fried mozzarella sticks with marinara dip',
            image: 'kudos/appetizer/Mozzarella Sticks.jpg'
        },
        {
            id: 'app7',
            title: 'Nachos',
            price: 135,
            description: 'Classic nachos with cheese dip',
            image: 'kudos/appetizer/Nachos.jpg'
        },
        {
            id: 'app8',
            title: 'Nachos Overload',
            price: 165,
            description: 'Loaded nachos with ground beef and guacamole',
            image: 'kudos/appetizer/Nachos Overload.webp',
            badge: 'popular'
        }
    ],
    pasta: [
        {
            id: 'pasta1',
            title: 'Tuna Pesto',
            price: 165,
            description: 'Tuna flakes in basil pesto sauce with pasta',
            image: 'kudos/pasta/Tuna-Pesto.webp'
        },
        {
            id: 'pasta2',
            title: 'Seafood Marinara',
            price: 175,
            description: 'Mixed seafood in tomato marinara sauce',
            image: 'kudos/pasta/Seafood Marinara.webp'
        },
        {
            id: 'pasta3',
            title: 'Truffle Carbonara',
            price: 189,
            description: 'Creamy carbonara with truffle oil',
            image: 'kudos/pasta/Truffle Carbonara.jpg',
            badge: 'new'
        },
        {
            id: 'pasta4',
            title: 'Aglio Olio',
            price: 165,
            description: 'Garlic olive oil pasta with chili flakes',
            image: 'kudos/pasta/Aglio Olio.webp'
        }
    ],
    'main-course': [
        {
            id: 'main1',
            title: 'Katsudon',
            price: 185,
            description: 'Japanese pork cutlet rice bowl',
            image: 'kudos/main/Katsudon.png'
        },
        {
            id: 'main2',
            title: 'Lechon Kawali',
            price: 195,
            description: 'Crispy fried pork belly',
            image: 'kudos/main/Lechon Kawali.png',
            badge: 'popular'
        },
        {
            id: 'main3',
            title: 'Garlic Pepper Beef',
            price: 185,
            description: 'Stir-fried beef with garlic and black pepper',
            image: 'kudos/main/Garlic Pepper Beef.png'
        },
        {
            id: 'main4',
            title: 'Inalamangan Pork Rebusado',
            price: 175,
            description: 'Crispy fried pork with calamansi dip',
            image: 'kudos/main/Rebusado.png'
        },
        {
            id: 'main5',
            title: 'Kudos Original',
            price: 185,
            description: 'House special grilled chicken platter',
            image: 'kudos/main/Kudos Original.png'
        },
        {
            id: 'main6',
            title: 'Crispy Chicken Kare-kare',
            price: 195,
            description: 'Crispy chicken with peanut kare-kare sauce',
            image: 'kudos/main/Chicken Kare-Kare.png',
            badge: 'new'
        }
    ],
    dessert: [
        {
            id: 'dessert1',
            title: 'Smores',
            price: 155,
            description: 'Classic campfire treat with chocolate and marshmallow',
            image: 'kudos/dessert/Smores.png'
        },
        {
            id: 'dessert2',
            title: 'Golden Waffle',
            price: 125,
            description: 'Golden brown waffle with maple syrup',
            image: 'kudos/dessert/Golden Waffle.jpg'
        },
        {
            id: 'dessert3',
            title: 'Nutella Waffle',
            price: 125,
            description: 'Waffle loaded with Nutella spread',
            image: 'kudos/dessert/Nutella Waffle.jpg',
            badge: 'popular'
        },
        {
            id: 'dessert4',
            title: 'Matcha Waffle',
            price: 125,
            description: 'Green tea flavored waffle with red bean',
            image: 'kudos/dessert/Matcha Waffle.jpg'
        }
    ],
    drinks: [
        {
            id: 'drink1',
            title: 'Choco-Mint',
            price: 165,
            description: 'Chocolate mint milkshake',
            image: 'kudos/drinks/Choco-Mint.png'
        },
        {
            id: 'drink2',
            title: 'Matcha Caramel Overload',
            price: 155,
            description: 'Matcha latte with caramel drizzle',
            image: 'kudos/drinks/Matcha Caramel Overload.png',
            badge: 'popular'
        },
        {
            id: 'drink3',
            title: 'Biscoff Caramel Latte',
            price: 145,
            description: 'Biscoff cookie flavored latte',
            image: 'kudos/drinks/Biscoff Caramel Latte.png'
        },
        {
            id: 'drink4',
            title: 'Dirty-Matcha Caramel',
            price: 135,
            description: 'Espresso layered over matcha latte',
            image: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?auto=format&fit=crop&w=500&q=80'
        }
    ]
};

// Find item by ID across all categories
function findItemById(itemId) {
    for (const category in menuData) {
        const item = menuData[category].find(item => item.id === itemId);
        if (item) return item;
    }
    return null;
}

// Render menu by category
function renderMenu(category) {
    const menuContainer = document.getElementById('menuContainer');
    
    // Clear previous content
    menuContainer.innerHTML = '';
    
    // Create category container
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'menu-category active';
    categoryContainer.id = category;
    
    // Create category title
    const categoryTitle = document.createElement('h2');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = formatCategoryName(category);
    categoryContainer.appendChild(categoryTitle);
    
    // Create menu grid
    const menuGrid = document.createElement('div');
    menuGrid.className = 'menu-grid';
    
    // Check if category exists
    if (menuData[category] && menuData[category].length > 0) {
        // Populate menu items
        menuData[category].forEach(item => {
            const menuItem = createMenuItem(item);
            menuGrid.appendChild(menuItem);
        });
    } else {
        // Show empty state
        const emptyState = document.createElement('div');
        emptyState.className = 'menu-empty';
        emptyState.innerHTML = `
            <i class="fa-solid fa-utensils empty-icon"></i>
            <p class="empty-text">No items available in this category</p>
        `;
        menuGrid.appendChild(emptyState);
    }
    
    categoryContainer.appendChild(menuGrid);
    menuContainer.appendChild(categoryContainer);
}

// Create a menu item element
function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.dataset.itemId = item.id;
    
    // Create HTML structure
    menuItem.innerHTML = `
        ${item.badge ? `<div class="item-badge badge-${item.badge}">${item.badge}</div>` : ''}
        <div class="item-image-container">
            <img src="${item.image}" alt="${item.title}" class="item-image">
        </div>
        <div class="item-content">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-price">${item.price.toFixed(2)}</div>
        </div>
        <div class="quick-add" data-item-id="${item.id}">
            <i class="fa-solid fa-plus"></i>
        </div>
    `;
    
    // Add click event
    menuItem.addEventListener('click', () => {
        openItemModal(item);
    });
    
    // Add quick add functionality
    const quickAddBtn = menuItem.querySelector('.quick-add');
    quickAddBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent opening the modal
        addToCart(item, 1);
        showToast(`Added ${item.title} to your order`, 'success');
        
        // Animate cart icon
        const cartCount = document.getElementById('cartCount');
        cartCount.classList.add('bounce');
        setTimeout(() => cartCount.classList.remove('bounce'), 500);
    });
    
    return menuItem;
}

// Format category name for display
function formatCategoryName(category) {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}