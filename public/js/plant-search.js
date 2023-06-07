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
      // Create search-results div
      const plantList = document.getElementById("search-results");
      plantList.innerHTML = "";
      for (let plant of response.plants) {
        const plantDiv = document.createElement("div");

        // Add image
        if (plant.image_url) {
          const image = document.createElement("img");
          image.src = plant.image_url;
          plantDiv.appendChild(image);
        }
        
        // Add common name
        const commonName = document.createElement("h2");
        commonName.textContent = plant.common_name;
        plantDiv.appendChild(commonName);

        // Add scientific name
        const scientificName = document.createElement("p");
        scientificName.textContent = plant.scientific_name;
        plantDiv.appendChild(scientificName);

        // Create a link for the plant
        const plantLink = document.createElement("a");
        plantLink.href = `/plant/${plant.common_name}`;  // Replace with the correct link to individual plant page
        plantLink.appendChild(plantDiv);

        plantList.appendChild(plantLink);
      }
    })
    .catch((err) => console.error(err));  // Handle errors
});
