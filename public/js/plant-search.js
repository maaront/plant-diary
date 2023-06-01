// Listen for the form submit event
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the plant name from the form input
    const plantName = document.getElementById('plantName').value;

    // Send a POST request to the /search route on the server
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Convert the JavaScript object to a JSON string
        body: JSON.stringify({ plantName: plantName })
    })
    
    .then(response => response.json())
    .then(data => {
        // Get the 'results' div
        const resultsDiv = document.getElementById('results');
        
        // Clear out any old results
        resultsDiv.innerHTML = '';
        
        // Loop over the data (the plants)
        data.forEach(plant => {
            // Create a new div for each plant
            const plantDiv = document.createElement('div');
            
            // Set the text of the div to the common name of the plant
            plantDiv.textContent = plant.common_name;
            
            // Append the new div to the 'results' div
            resultsDiv.appendChild(plantDiv);
        });
    })
    
    .catch(error => console.error('Error:', error));
});
