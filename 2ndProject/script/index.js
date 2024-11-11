document.addEventListener("DOMContentLoaded", function() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const artistSelect = document.getElementById('artist-select');
            data.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                artistSelect.appendChild(option);
            });
        });
});

document.getElementById('join-artist').addEventListener('click', function(event) {
    const artistSelect = document.getElementById('artist-select');
    if (artistSelect.value === "" && event.target.tagName !== "SELECT") {
        // Redirect to signin.html if no artist is selected and click is not on the dropdown
        window.location.href = 'signin.html';
    }
});

document.getElementById('artist-select').addEventListener('change', function() {
    const artistId = this.value;
    const artistName = this.options[this.selectedIndex].text; // Get the selected artist's name
    if (artistId) {
        window.location.href = `artists_home.html?artistId=${artistId}&artistName=${encodeURIComponent(artistName)}`;
    }
});
