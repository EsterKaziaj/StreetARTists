 // Get elements
 const submitButton = document.getElementById('submitBid');
 const confirmationWindow = document.getElementById('confirmationWindow');
 const closeButton = document.getElementById('closeWindow');

 // Event listener for the submit button
 submitButton.addEventListener('click', () => {
     const bidAmount = document.getElementById('bidAmount').value;
     if (bidAmount && bidAmount > 0) {
         confirmationWindow.style.display = 'block';
     } else {
         alert('Please enter a valid bid amount.');
     }
 });

 // Event listener for the close button
 closeButton.addEventListener('click', () => {
     confirmationWindow.style.display = 'none';
 });