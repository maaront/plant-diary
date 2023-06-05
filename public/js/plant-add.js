// Listen for the form submit event
document.getElementById("add-plant").addEventListener("click", function (event) {
    event.preventDefault();
  
    // Get the plant name from the Name field
    const plantName = document.getElementById("common-name").value;
  
    // Send a POST request to the /search route on the server
    fetch(`/plant/id`, {
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
    
  
          console.log(plant);
        });
      })
      .catch((error) => console.error("Error:", error));
    
    
  