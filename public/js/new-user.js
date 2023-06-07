const signupFormHandler = async (event) => {
  event.preventDefault();

  const user_name = document.querySelector("#username-signup").value.trim();
  const user_password = document.querySelector("#password-signup").value.trim();

  if (user_name && user_password) {
    const response = await fetch("/", {
      method: "POST",
      body: JSON.stringify({ user_name, user_password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  let signupForm = document.getElementById("signup-form");

  if (signupForm) {
    signupForm.addEventListener("submit", signupFormHandler);
  }
});
