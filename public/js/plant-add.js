// Add event listener to button click
document.getElementById('add-plant').addEventListener('click', async () => {

    // Get required plant data from the HTML elements. We can add more later
  const commonName = document.getElementById('common-name').innerText;
  const scientificName = document.getElementById('common-name').innerText;

  // POST request to '/plant/add'route 
  const response = await fetch('/plant/add', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({ 
      common_name: commonName, 
      scientific_name: scientificName
    }),
  });

  // Check if the response was successful
  if (response.ok) {
    alert('Plant added successfully');
  } else {
    alert('Failed to add plant');
  }
});