document
  .getElementById("create-account-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the username and password from the form
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;

    // Send a POST request to /create-account
    fetch("/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        user_password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // If the server responded with a message, print it to the console
          console.log(data.message);
        } else {
          // If the server responded with a user object, print the user's id
          console.log(`Created user with id ${data.id}`);
        }
      })
      .catch((error) => console.error("Error:", error));
  });
