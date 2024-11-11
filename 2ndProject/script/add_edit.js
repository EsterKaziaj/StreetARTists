const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode') || 'add';
const artistId = parseInt(urlParams.get('artistId')) || 1;
const itemId = urlParams.get('itemId');
let items = JSON.parse(localStorage.getItem('items')) || [];
let selectedItem = null;

// Set today's date for dateCreated input
document.getElementById('dateCreated').value = new Date().toISOString().split('T')[0];

if (mode === 'edit' && itemId) {
    selectedItem = items.find(item => item.id == itemId);
    if (selectedItem) {
        document.getElementById('pageTitle').innerText = 'Edit Item';
        document.getElementById('title').value = selectedItem.title;
        document.getElementById('description').value = selectedItem.description;
        document.getElementById('type').value = selectedItem.type;
        document.getElementById('price').value = selectedItem.price;
        document.getElementById('isPublished').checked = selectedItem.isPublished;
        document.getElementById('imageName').innerText = selectedItem.image || '';
    }
}

document.getElementById('addEditButton').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const price = parseFloat(document.getElementById('price').value);
    const isPublished = document.getElementById('isPublished').checked;
    const imageName = document.getElementById('imageUpload').files.length > 0 ? document.getElementById('imageUpload').files[0].name : '';

    if (!title || !type || !price || !imageName) {
        alert('Please fill in all required fields.');
        return;
    }

    if (mode === 'edit' && selectedItem) {
        selectedItem.title = title;
        selectedItem.description = description;
        selectedItem.type = type;
        selectedItem.price = price;
        selectedItem.isPublished = isPublished;
        selectedItem.image = imageName;
    } else {
        const newItem = {
            id: Date.now(),
            artistId: artistId,
            title,
            description,
            type,
            isPublished,
            price,
            image: imageName,
            dateCreated: new Date().toISOString().split('T')[0],
            dateSold: '',
            priceSold: ''
        };
        items.push(newItem);
    }

    localStorage.setItem('items', JSON.stringify(items));
    window.location.href = `artist_items.html?artistId=${artistId}`;
});

document.getElementById('cancelButton').addEventListener('click', () => {
    window.location.href = `artist_items.html?artistId=${artistId}`;
});

document.getElementById('imageUpload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('imageName').innerText = file.name;

        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.createElement('img');
            imagePreview.src = e.target.result;
            imagePreview.style.maxWidth = '100%';
            imagePreview.style.marginTop = '10px';

            if (document.getElementById('imageName').nextSibling) {
                document.getElementById('imageName').parentNode.removeChild(document.getElementById('imageName').nextSibling);
            }
            document.getElementById('imageName').parentNode.appendChild(imagePreview);
        };
        reader.readAsDataURL(file);
    }
});