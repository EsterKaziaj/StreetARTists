// Sample data for demonstration purposes (with  image paths)
const items = [
    { id: 1, title: 'Abstract Colors', artist: 'Leanne Graham', price: 500, type: 'Painting', isPublished: true, image: 'img/colours.png' },
    { id: 2, title: 'Monochrome Faces', artist: 'Ervin Howell', price: 300, type: 'Sketch', isPublished: true, image: 'img/mosaic2.png' },
    { id: 3, title: 'Color Explosion', artist: 'Clementine Bauch', price: 700, type: 'Painting', isPublished: true, image: 'img/colours.png' },
    { id: 4, title: 'Serenity Portrait', artist: 'Patricia Lebsack', price: 450, type: 'Portrait', isPublished: true, image: 'img/mosaic3.png' },
    { id: 5, title: 'Dynamic Pattern', artist: 'Chelsey Dietrich', price: 600, type: 'Pattern', isPublished: true, image: 'img/painting.png' },
    { id: 6, title: 'Vibrant Chaos', artist: 'Mrs. Dennis Schulist', price: 800, type: 'Abstract', isPublished: true, image: 'img/colours.png' }
];

const listingContainer = document.getElementById('listingContainer');
const filterButton = document.getElementById('filterButton');
const filterPanel = document.getElementById('filterPanel');
const closeFilter = document.getElementById('closeFilter');
const applyFilters = document.getElementById('applyFilters');

// Show and hide filter panel
filterButton.addEventListener('click', () => filterPanel.style.display = 'block');
closeFilter.addEventListener('click', () => filterPanel.style.display = 'none');

// Function to render items
function renderItems(filteredItems = items) {
    listingContainer.innerHTML = '';
    filteredItems.filter(item => item.isPublished).forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `card-container ${index % 2 === 0 ? 'even-card' : 'odd-card'}`;
        card.innerHTML = `
            <div class="card">
                <img src="${item.image}" alt="${item.title}">
                <div class="card-content">
                    <h3>${item.artist}</h3>
                    <p>${item.title}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.</p>
                    <span>$${item.price}</span>
                </div>
            </div>
        `;
        listingContainer.appendChild(card);
    });
}

// Apply filters
applyFilters.addEventListener('click', () => {
    const nameFilter = document.getElementById('filterName').value.toLowerCase();
    const artistFilter = document.getElementById('filterArtist').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);
    const typeFilter = document.getElementById('filterType').value;

    const filteredItems = items.filter(item => {
        const matchesName = nameFilter === '' || item.title.toLowerCase().includes(nameFilter);
        const matchesArtist = artistFilter === '' || item.artist === artistFilter;
        const matchesPrice = (!minPrice || item.price >= minPrice) && (!maxPrice || item.price <= maxPrice);
        const matchesType = typeFilter === '' || item.type === typeFilter;
        return matchesName && matchesArtist && matchesPrice && matchesType;
    });

    renderItems(filteredItems);
    filterPanel.style.display = 'none';
});

renderItems(); // Initial render