const fetch = require('node-fetch'); // Import fetch

const token = 't_RrrFDUYpfQ6Dj_7jRMH3QPJENvdDDklPweJJNX-XU'; // Our API token
const plantName = 'rose';  // Substitute with the name of the plant the user is searching for.

fetch(`https://trefle.io/api/v1/plants/search?token=${token}&q=${plantName}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
