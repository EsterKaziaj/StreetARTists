
// Menu Toggle
const menuIcon = document.getElementById('menuIcon');
const menuPanel = document.getElementById('menuPanel');
const logoutLink = document.getElementById('logoutLink');

menuIcon.addEventListener('click', () => {
    menuPanel.style.display = menuPanel.style.display === 'block' ? 'none' : 'block';
});

// Sign In/Sign Up Form Toggle
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const toggleSignUp = document.getElementById('toggleSignUp');
const toggleSignIn = document.getElementById('toggleSignIn');
const signInToggle = document.getElementById('signInToggle');
const signUpToggle = document.getElementById('signUpToggle');

toggleSignUp.addEventListener('click', () => {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

toggleSignIn.addEventListener('click', () => {
    signUpForm.style.display = 'none';
    signInForm.style.display = 'block';
});

signInToggle.addEventListener('click', () => {
    signUpForm.style.display = 'none';
    signInForm.style.display = 'block';
});

signUpToggle.addEventListener('click', () => {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

// Sign In/Sign Up Logic with Local Storage
document.getElementById('signInButton').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Sign In Successful');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'index.html'; // Redirect to homepage
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('signUpButton').addEventListener('click', () => {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.find(u => u.username === username)) {
        alert('Username already exists');
        return;
    }

    const newUser = { username, password };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    alert('Sign Up Successful');
    signUpForm.style.display = 'none';
    signInForm.style.display = 'block';
});

// Logout Logic
logoutLink.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out');
    window.location.href = 'index.html';
});

// Check if user is logged in
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUser) {
    logoutLink.style.display = 'block';
}
