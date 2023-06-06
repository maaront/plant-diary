const userFormHandler = async (event) => {
  event.preventDefault();

  // Collect values for new user
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // If successful, redirect the browser to the dashboard page
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  let signupForm = document.querySelector(".signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", userFormHandler);
  }
});
