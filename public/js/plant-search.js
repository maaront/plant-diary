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
          // Create a new anchor element for each plant
          const plantLink = document.createElement("a");
  
          // Set the text of the anchor element to the common name of the plant
          plantLink.textContent = plant.common_name;
  
          // Set the href attribute of the anchor element to navigate to the plant page
        //   plantLink.href = `/plant?id=${plant.id}`;
          plantLink.href = `/plant/${plant.common_name}`;
        
  
          // Append the anchor element to the 'results' div
          resultsDiv.appendChild(plantLink);
  
          console.log(plant);
        });
      })
      .catch((error) => console.error("Error:", error));
  });
  