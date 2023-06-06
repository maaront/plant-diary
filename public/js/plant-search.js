// Listen for the form submit event
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the plant name from the form input
    const plantName = document.getElementById("search-input").value;

    // Fetch and display the first page of search results
    fetchAndDisplayResults(plantName, 1);
  });

function fetchAndDisplayResults(plantName, page) {
  // Send a POST request to the /search route on the server
  fetch(`/plant/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Convert the JavaScript object to a JSON string
    body: JSON.stringify({ plantName: plantName }),
  })
    // Parse the response as JSON
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      // Get the 'results' div
      const resultsDiv = document.getElementById("search-results");

      // Clear out any old results
      resultsDiv.innerHTML = "";

      // Create a row div for the card layout
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");

      // Loop over the data (the plants)
      response.plants.forEach((plant) => {
        // Create a new column div for the Bootstrap grid
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-sm-3");

        // Create a new div for each piece of plant data
        const plantDiv = document.createElement("div");
        plantDiv.classList.add("card");

        const plantLink = document.createElement("a");
        plantLink.href = `/plant/${plant.common_name}`;
        plantLink.classList.add("plant-link");

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("card-img-top");
        const nameDiv = document.createElement("h6");
        nameDiv.classList.add("card-title");
        const sciNameDiv = document.createElement("p");
        sciNameDiv.classList.add("card-body");

        // Set the text of each div
        nameDiv.textContent = `Name: ${plant.common_name}`;
        sciNameDiv.textContent = `Scientific Name: ${plant.scientific_name}`;

        const img = document.createElement("img");
        img.src = plant.image_url;
        img.classList.add("card-img-top", "another-class");
        imgDiv.appendChild(img);

        // Append the divs to the plantLink
        plantLink.appendChild(imgDiv);
        plantLink.appendChild(nameDiv);
        plantLink.appendChild(sciNameDiv);

        // Append the plantLink to the main div
        plantDiv.appendChild(plantLink);

        // Append the main div to the column div
        colDiv.appendChild(plantDiv);

        // Append the column div to the row div
        rowDiv.appendChild(colDiv);
      });

      // Append the row div to the 'results' div
      resultsDiv.appendChild(rowDiv);
      // Create and display pagination buttons
      const totalPages = Math.ceil(
        response.meta.total / response.meta.per_page
      );
      const paginationDiv = document.createElement("div");
      paginationDiv.classList.add("pagination");

      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", function () {
          fetchAndDisplayResults(plantName, i);
        });
        paginationDiv.appendChild(pageButton);
      }

      resultsDiv.appendChild(paginationDiv);
    })
    .catch((error) => console.error("Error:", error));
}
