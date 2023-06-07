// Add event listener to button click
document.getElementById('add-plant').addEventListener('click', async () => {

    // Get required plant data from the HTML elements. We can add more later
  const commonName = document.getElementById('common-name').innerText;
  const scientificName = document.getElementById('scientific-name').innerText; 
  const imageURL = document.getElementById('plant-image').src; 
  console.log(imageURL);

  // POST request to '/plant/add'route 
  const response = await fetch('/plant/add', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({ 
      common_name: commonName, 
      scientific_name: scientificName, 
      image_url: imageURL,

    }),
    
  }); 

  // Create new div for fail/success message
  const messageDiv = document.createElement('div');

  if (response.ok) {
    // Success
    messageDiv.innerText = 'Plant added successfully';
  } else {
    // Failed
    messageDiv.innerText = 'Failed to add plant';
  }

  // Add the new div to the body of the document
  const  messageContainer = document.getElementById('message-container');
  messageContainer.innerHTML = '';
  messageContainer.appendChild(messageDiv);
});