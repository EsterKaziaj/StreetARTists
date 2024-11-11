// Fetch artist data dynamically from API
const urlParams = new URLSearchParams(window.location.search);
const selectedArtistId = parseInt(urlParams.get('artistId')) || 1;
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        const artistData = data;
        const selectedArtist = artistData.find(artist => artist.id === selectedArtistId);
        if (selectedArtist) {
            document.getElementById('artistName').textContent = selectedArtist.name;
        } else {
            document.getElementById('artistName').textContent = 'Unknown Artist';
        }
    })
    .catch(error => {
        console.error('Error fetching artist data:', error);
    });

// Sample base items data
let baseItems = [
    { id: 1, artistId: 1, title: 'Abstract Colors', description: 'Beautiful abstract painting', type: 'Painting', isPublished: true, price: 500, image: 'img/mosaic1.png', dateCreated: '2024-11-01' },
    { id: 2, artistId: 1, title: 'Monochrome Faces', description: 'Sketch art with monochrome theme', type: 'Sketch', isPublished: false, price: 300, image: 'img/mosaic2.png', dateCreated: '2024-11-02' }
];
const storedItems = JSON.parse(localStorage.getItem('items')) || [];
let items = [...baseItems, ...storedItems];

function renderItems() {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '';

    const addNewButton = document.createElement('div');
    addNewButton.className = 'add-new-item';
    addNewButton.textContent = '+ Add New Item';
    addNewButton.onclick = () => window.location.href = `artist_add_edit_item.html?mode=add&artistId=${selectedArtistId}`;
    itemsContainer.appendChild(addNewButton);

    const artistItems = items.filter(item => item.artistId === selectedArtistId);
    if (artistItems.length === 0) {
        itemsContainer.innerHTML += '<p>No items available for this artist.</p>';
        return;
    }

    artistItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description || 'No description provided'}</p>
            <p>Date Created: ${item.dateCreated}</p>
            <p>Type: ${item.type}</p>
            <p>Price: $${item.price}</p>
            <div class="item-controls">
                <button class="send-to-auction" onclick="redirectToAuction(${item.id})">Send to Auction</button>
                <button class="publish-toggle" onclick="togglePublish(${item.id})">${item.isPublished ? 'Unpublish' : 'Publish'}</button>
                <button class="remove-item" onclick="confirmRemove(${item.id})">Remove</button>
                <button class="edit-item" onclick="editItem(${item.id})">Edit</button>
            </div>
        `;
        itemsContainer.appendChild(itemCard);
    });
}

function redirectToAuction(itemId) {
    window.location.href = `auction.html?artistId=${selectedArtistId}&itemId=${itemId}`;
}

function togglePublish(itemId) {
    const item = items.find(i => i.id === itemId);
    if (item) {
        item.isPublished = !item.isPublished;
        updateLocalStorage();
        renderItems();
    }
}

function confirmRemove(itemId) {
    if (confirm('Are you sure you want to remove this item?')) {
        items = items.filter(i => i.id !== itemId);
        updateLocalStorage();
        renderItems();
    }
}

function editItem(itemId) {
    window.location.href = `artist_add_edit_item.html?mode=edit&artistId=${selectedArtistId}&itemId=${itemId}`;
}

function updateLocalStorage() {
    const nonBaseItems = items.filter(item => !baseItems.some(baseItem => baseItem.id === item.id));
    localStorage.setItem('items', JSON.stringify(nonBaseItems));
}

document.addEventListener('DOMContentLoaded', renderItems);

// Menu Toggle
const menuIcon = document.getElementById('menuIcon');
const menuPanel = document.getElementById('menuPanel');
menuIcon.addEventListener('click', () => {
    menuPanel.style.display = menuPanel.style.display === 'block' ? 'none' : 'block';
});