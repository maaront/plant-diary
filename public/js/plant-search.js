
// const fetch = require('node-fetch'); // Import fetch

document.getElementById('searchForm').addEventListener('submit', function(event) { // Add an event listener to search form
    event.preventDefault();

    const token = 't_RrrFDUYpfQ6Dj_7jRMH3QPJENvdDDklPweJJNX-XU'; // Our API token

    
    const plantName = document.getElementById('plantName').value; // get the plant name from the input box

    fetch(`https://trefle.io/api/v1/plants/search?token=${token}&q=${plantName}`) // Pass API token and plant name to the URL
        
        .then(response => response.json()) //parse the response body text as JSON
        .then(data => {
            // Get the 'results' div where the search results will be displayed
            const resultsDiv = document.getElementById('results');

            
            resultsDiv.innerHTML = ''; // Clear out old search results

            // Loop over each plant in the response
            data.data.forEach(plant => {
                // Create a new div for this plant
                const plantDiv = document.createElement('div');

                // Set the text of the div to common name
                plantDiv.textContent = plant.common_name;

                // Append the div to the 'results' div
                resultsDiv.appendChild(plantDiv);
            });
        })
        
        .catch(error => console.error('Error:', error));
});


