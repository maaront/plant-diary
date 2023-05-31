const fetch = require('node-fetch'); // Import fetch

// Add an event listener to the search form.
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const token = 't_RrrFDUYpfQ6Dj_7jRMH3QPJENvdDDklPweJJNX-XU'; // Our API token

    // Get the name of the plant from the input box
    const plantName = document.getElementById('plantName').value;

    // Pass API token and plant name to the URL
    fetch(`https://trefle.io/api/v1/plants/search?token=${token}&q=${plantName}`)
        
        .then(response => response.json()) //parse the response body text as JSON
        .then(data => {
            // Get the 'results' div where the search results will be displayed
            const resultsDiv = document.getElementById('results');

            // Clear out any previous search results.
            resultsDiv.innerHTML = '';

            // Loop over each plant in the search results.
            data.data.forEach(plant => {
                // Create a new div for this plant.
                const plantDiv = document.createElement('div');

                // Set the text of the div to the common name of the plant.
                plantDiv.textContent = plant.common_name;

                // Append the div to the 'results' div.
                resultsDiv.appendChild(plantDiv);
            });
        })
        
        .catch(error => console.error('Error:', error));
});


