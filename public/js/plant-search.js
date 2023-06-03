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
  
        // Create container for plant list
        const plantList = document.createElement("ul");
  
        // Loop over the data (the plants)
        response.plants.forEach((plant) => {
          // Create a new list item for each plant
          const plantListItem = document.createElement("li");
  
          // Create a new anchor element for each plant
          const plantLink = document.createElement("a");
  
          // Set the text of the anchor element to the common name of the plant
          plantLink.textContent = plant.common_name;
  
          // Set the href attribute of the anchor element to the plant's ID
          plantLink.href = `/plants/${plant.id}`;
  
          // Append the anchor element to the list item element
          plantListItem.appendChild(plantLink);
  
          // Append the list item element to the plant list
          plantList.appendChild(plantListItem);
  
          console.log(plant);
        });
  
        // Append the plant list to the 'results' div
        resultsDiv.appendChild(plantList);
      })
      .catch((error) => console.error("Error:", error));
  });
  