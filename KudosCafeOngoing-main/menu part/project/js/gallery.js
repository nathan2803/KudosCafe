document.addEventListener('DOMContentLoaded', () => {
    // Gallery section reveal animation
    const galleryHero = document.querySelector('.gallery-hero');
    const interestGrid = document.getElementById('interestGrid');

    // Gallery items data for non-menu pictures
    const galleryItems = [
        { image: 'images/non menu pictures/syrups.jpg' }, //check
        { image: 'images/non menu pictures/girl2.jpg' }, //check
        { image: 'images/non menu pictures/flower.jpg' },
        { image: 'images/New pics/mek.jpeg' }, //check
        { image: 'images/non menu pictures/flower.jpg' }, //check
        { image: 'images/non menu pictures/WhiteBag.jpg' },
        { image: 'images/non menu pictures/bestiePics.jpg' },
        { image: 'images/non menu pictures/MirrorQt.jpg' },  
        { image: 'images/non menu pictures/Drink.jpg' },


        { image: 'images/non menu pictures/meow.jpg' },  //check
        { image: 'images/non menu pictures/wall.jpg' },
        { image: 'images/non menu pictures/greenBag2.jpg' },
        { image: 'images/non menu pictures/painting.jpg' },
        { image: 'images/non menu pictures/bagarden.jpg' }, //check
        { image: 'images/non menu pictures/pogi.jpg' },    //check
        { image: 'images/non menu pictures/scenery.png' }, //check
        { image: 'images/non menu pictures/window.jpg' },
        { image: 'images/non menu pictures/greenBag1.jpg' }, 
        { image: 'images/non menu pictures/rs.jpg' },
        { image: 'images/non menu pictures/slay.jpg' },
        { image: 'images/non menu pictures/tables.png' }, //check
        { image: 'images/non menu pictures/band.jpg' }, //check
        { image: 'images/non menu pictures/girlRoad.jpg' },
        { image: 'images/non menu pictures/KUDOS.jpg' },
        { image: 'images/New pics/cow.jpeg' },
        { image: 'images/non menu pictures/girl.jpg' },
        { image: 'images/non menu pictures/coffee.png' }, //check
        { image: 'images/New pics/fav.jpeg' },
        { image: 'images/non menu pictures/wall.png' },
        { image: 'images/New pics/9d443ae1-5b72-40c4-85a1-65f053c51edb.jpeg' },
        { image: 'images/New pics/e910b52c-c0c7-462f-86bf-a11511dd2a31.jpeg' },
        { image: 'images/non menu pictures/staff.png' },
        { image: 'images/New pics/10054546-53d9-4089-bb00-3c99dff42b53.jpeg' },
        


    ];

    // Create gallery items
    galleryItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-image">
                <img src="${item.image}" alt="">
            </div>
        `;
        interestGrid.appendChild(galleryItem);
    });

    // Parallax effect for gallery hero
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (galleryHero) {
            galleryHero.style.backgroundPositionY = `${scrollY * 0.4}px`;
        }
    });

    // Reveal animations on scroll
    const galleryItemElements = document.querySelectorAll('.gallery-item');
    
    const revealGalleryItems = () => {
        const windowHeight = window.innerHeight;
        const gridTop = interestGrid.getBoundingClientRect().top;
        
        if (gridTop < windowHeight * 0.9) {
            // Add staggered animation to gallery items
            galleryItemElements.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, 100 * index);
            });
            
            // Remove the scroll listener once items are revealed
            window.removeEventListener('scroll', revealGalleryItems);
        }
    };

    window.addEventListener('scroll', revealGalleryItems);
    
    // Check on initial load in case items are already in view
    setTimeout(revealGalleryItems, 500);
});