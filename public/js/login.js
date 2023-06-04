const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const user_name = document.querySelector('#username-login').value.trim();
    const user_password = document.querySelector('#password-login').value.trim();
    
    if (user_name && user_password) {
        // Send the username and password to the server
        const response = await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({ user_name, user_password }),
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in');
        }
    }
};
  
document.addEventListener('DOMContentLoaded', function () {
    let loginForm = document.getElementById('login-form');

    if (loginForm) { // Checking if the form exists
        loginForm.addEventListener('submit', loginFormHandler);
    }
});
