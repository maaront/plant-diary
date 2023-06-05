const logout = async () => {
  // Make a POST request to destroy the session on the back end
  const response = await fetch('/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successfully logged out, redirect to the homepage page
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

window.onload = function() {
  document.getElementById('logout').addEventListener('click', logout);
};
