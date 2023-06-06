// Listen for the form submit event
document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the plant name from the form input
  const plantName = document.getElementById("search-input").value;

  // Send a POST request to the /search route on the server
  fetch(`/plant/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Convert the JavaScript object to a JSON string
    body: JSON.stringify({ plantName: plantName })
  })
    // Parse the response as JSON
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      // Get the 'results' div
      const resultsDiv = document.getElementById("search-results");

      // Clear out any old results
      resultsDiv.innerHTML = "";

      // Loop over the data (the plants)
      response.plants.forEach((plant) => {
        // Create a new div, list and list items for each piece of plant data
        const plantDiv = document.createElement("div");
        plantDiv.className = "plant-div";

        const ul = document.createElement("ul");
        ul.className = "plant-ul";

        const liName = document.createElement("li");
        liName.className = "plant-name";
        const liSciName = document.createElement("li");
        liSciName.className = "plant-sci-name";
        const liImg = document.createElement("li");
        liImg.className = "plant-img";

        const plantLink = document.createElement("a");
        plantLink.href = `/plant/${plant.common_name}`;
        plantLink.className = "plant-link";

        // Set the text of each list item
        liName.textContent = `Name: ${plant.common_name}`;
        liSciName.textContent = `Scientific Name: ${plant.scientific_name}`;
        
        const img = document.createElement("img");
        img.src = plant.image_url;
        img.className = "plant-image";
        liImg.appendChild(img);

        // Append the list items to the unordered list
        ul.appendChild(liName);
        ul.appendChild(liSciName);
        ul.appendChild(liImg);

        // Append the ul to the plantLink
        plantLink.appendChild(ul);
        
        // Append the plantLink to the div
        plantDiv.appendChild(plantLink);

        // Append the div to the 'results' div
        resultsDiv.appendChild(plantDiv);

        console.log(plant);
      });
    })
    .catch((error) => console.error("Error:", error));
});
