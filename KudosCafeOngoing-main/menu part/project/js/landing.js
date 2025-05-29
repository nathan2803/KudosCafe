// Modal functionality
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <div class="dish-details">
            <h2 id="modalDishTitle"></h2>
            <div class="rating" id="modalRating"></div>
            <p id="modalDescription"></p>
            <div class="reviews" id="modalReviews"></div>
        </div>
    </div>
`;
document.body.appendChild(modal);

// Dish details data
const dishDetails = {
    'Hickory Wings': {
        rating: 5,
        description: 'Our signature smoky and savory chicken wings, perfectly seasoned with our special hickory rub and slow-cooked to perfection.',
        reviews: [
            { text: 'Best wings in town! The smoky flavor is incredible.', rating: 5 },
            { text: 'Perfect appetizer for sharing. Always order these when I visit.', rating: 5 }
        ]
    },
    'Garlic Pepper Beef': {
        rating: 5,
        description: 'Premium beef cuts sautéed with fresh garlic and cracked black pepper, served with seasonal vegetables.',
        reviews: [
            { text: 'The beef is so tender and flavorful!', rating: 5 },
            { text: 'Love the garlic and pepper combination.', rating: 5 }
        ]
    },
    'Korean Beef Stew': {
        rating: 5,
        description: 'A hearty stew featuring tender beef chunks in a rich Korean-inspired broth with vegetables.',
        reviews: [
            { text: 'Authentic taste and generous portions!', rating: 5 },
            { text: 'Perfect comfort food for any day.', rating: 5 }
        ]
    },
    'Rebusado': {
        rating: 5,
        description: 'Crispy fried pork belly with our special batter, served with a tangy dipping sauce.',
        reviews: [
            { text: 'Crispy on the outside, tender on the inside!', rating: 5 },
            { text: 'The dipping sauce complements it perfectly.', rating: 5 }
        ]
    },
    'Seafood Marinara': {
        rating: 5,
        description: 'Fresh seafood medley in our house-made marinara sauce, served over al dente pasta.',
        reviews: [
            { text: 'The seafood is always fresh and the sauce is perfect!', rating: 5 },
            { text: 'Best pasta dish on the menu!', rating: 5 }
        ]
    },
    'Truffle Carbonara': {
        rating: 5,
        description: 'Creamy pasta with truffle essence, pancetta, and fresh parmesan cheese.',
        reviews: [
            { text: 'The truffle flavor is perfectly balanced.', rating: 5 },
            { text: 'Rich and creamy, just how I like it!', rating: 5 }
        ]
    }
};

// Add click event listeners to view buttons
document.querySelectorAll('.view-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.featured-card');
        const dishTitle = card.querySelector('h3').textContent;
        const details = dishDetails[dishTitle];

        if (details) {
            document.getElementById('modalDishTitle').textContent = dishTitle;
            
            // Set rating stars
            const ratingDiv = document.getElementById('modalRating');
            ratingDiv.innerHTML = '';
            for (let i = 0; i < details.rating; i++) {
                const star = document.createElement('i');
                star.className = 'fas fa-star';
                ratingDiv.appendChild(star);
            }

            // Set description
            document.getElementById('modalDescription').textContent = details.description;

            // Set reviews
            const reviewsDiv = document.getElementById('modalReviews');
            reviewsDiv.innerHTML = '<h3>Customer Reviews</h3>';
            details.reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review-item';
                reviewElement.innerHTML = `
                    <p>${review.text}</p>
                    <div class="review-rating">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                    </div>
                `;
                reviewsDiv.appendChild(reviewElement);
            });

            modal.style.display = 'block';
        }
    });
});

// Close modal when clicking the close button or outside the modal
const closeButton = modal.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});