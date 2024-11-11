 // Fetch artist data
 let artistData = [];
 let selectedArtistId = new URLSearchParams(window.location.search).get('artistId') || 1;
 
 fetch('https://jsonplaceholder.typicode.com/users')
     .then(response => response.json())
     .then(data => {
         artistData = data;
         displayArtistData();
     });
 
 // Generate items data dynamically
 const items = [];
 const salesData = {
     1: 9,  // Artist 1 sold 9 items
     2: 7,  // Artist 2 sold 7 items
     3: 3,  // Artist 3 sold 3 items
     4: 8,  // Artist 4 sold 8 items
     5: 2,  // Artist 5 sold 2 items
     6: 12, // Artist 6 sold 12 items
     7: 10, // Artist 7 sold 10 items
     8: 3,  // Artist 8 sold 3 items
     9: 2,  // Artist 9 sold 2 items
     10: 1  // Artist 10 sold 1 item
 };
 
 // Generate items for each artist
 let idCounter = 1;
 for (let artistId in salesData) {
     const itemsSold = salesData[artistId];
     for (let i = 0; i < itemsSold; i++) {
         items.push({
             id: idCounter++,
             artistId: parseInt(artistId),
             dateSold: new Date(new Date().setDate(new Date().getDate() - i)).toISOString().split('T')[0],
             priceSold: Math.floor(Math.random() * 1000) + 100 // Random price between 100 and 1000
         });
     }
 }
 
 function displayArtistData() {
     const artist = artistData.find(a => a.id == selectedArtistId);
     document.getElementById('artistName').innerText = artist ? artist.name : 'Artist Name';
 
     const artistItems = items.filter(item => item.artistId == selectedArtistId);
     const soldItems = artistItems.filter(item => item.dateSold);
     const totalIncome = soldItems.reduce((sum, item) => sum + (item.priceSold || 0), 0);
     document.getElementById('totalItemsSold').innerText = `Total Items Sold: ${soldItems.length}/${artistItems.length}`;
     document.getElementById('totalIncome').innerText = `Total Income: $${totalIncome}`;
     const liveItem = soldItems[soldItems.length - 1] || { priceSold: 0 };
     document.getElementById('liveAuctionItem').innerText = `Live Auctioning Item: $${liveItem.priceSold} current bid`;
 
     renderChart(7);
 }
 
 function renderChart(days) {
     const ctx = document.getElementById('artistChart').getContext('2d');
     const minDate = new Date();
     minDate.setDate(minDate.getDate() - days);
 
     const filteredItems = items.filter(item => {
         return item.artistId == selectedArtistId &&
                item.dateSold &&
                new Date(item.dateSold) >= minDate;
     });
 
     const dateCounts = {};
     filteredItems.forEach(item => {
         const date = new Date(item.dateSold).toISOString().split('T')[0];
         dateCounts[date] = dateCounts[date] || { count: 0, totalSales: 0 };
         dateCounts[date].count += 1;
         dateCounts[date].totalSales += item.priceSold;
     });
 
     const labels = Object.keys(dateCounts).sort();
     const counts = labels.map(label => dateCounts[label].count);
     const sales = labels.map(label => dateCounts[label].totalSales);
 
     new Chart(ctx, {
         type: 'bar',
         data: {
             labels: labels,
             datasets: [
                 {
                     label: 'Total Sales ($)',
                     data: sales,
                     backgroundColor: 'rgba(107, 79, 79, 0.7)'
                 },
                 {
                     label: 'Number of Items Sold',
                     data: counts,
                     backgroundColor: 'rgba(245, 214, 186, 0.7)'
                 }
             ]
         },
         options: {
             responsive: true,
             scales: {
                 x: { title: { display: true, text: 'Date' } },
                 y: { title: { display: true, text: 'Values' } }
             }
         }
     });
 }
 
 document.getElementById('days7').addEventListener('click', () => renderChart(7));
 document.getElementById('days14').addEventListener('click', () => renderChart(14));
 document.getElementById('days30').addEventListener('click', () => renderChart(30));
 
 // Menu Toggle Logic
 const menuIcon = document.getElementById('menuIcon');
 const menuPanel = document.getElementById('menuPanel');
 menuIcon.addEventListener('click', () => {
     menuPanel.style.display = menuPanel.style.display === 'block' ? 'none' : 'block';
 });
 window.addEventListener('click', (event) => {
     if (!menuPanel.contains(event.target) && !menuIcon.contains(event.target)) {
         menuPanel.style.display = 'none';
     }
 });
 