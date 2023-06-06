const userFormHandler = async (event) => {
  event.preventDefault();

  // Collect values for new user
  const create-account = document.querySelector("#create-account").value.trim();
    const password = document.querySelector("#password").value.trim();