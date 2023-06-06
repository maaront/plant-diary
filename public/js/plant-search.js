document
  .querySelector("#search-form")
  .addEventListener("submit", searchFormSubmit);

function searchFormSubmit(event, url = '') {
  event.preventDefault();
  
  let fetchUrl = '/api/plants/search';
  let method = 'POST';
  let headers = { 'Content-Type': 'application/json' };
  let body = JSON.stringify({ plantName: document.querySelector("#plant-search").value });

  if (url) {
    fetchUrl = url;
    method = 'GET';
    headers = {};
    body = null;
  }

  fetch(fetchUrl, {
    method,
    headers,
    body,
  })
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    const plantList = document.getElementById("plant-list");
    plantList.innerHTML = "";
    for (let plant of response.plants) {
      const plantDiv = document.createElement("div");

      // Add common name
      const commonName = document.createElement("h2");
      commonName.textContent = plant.common_name;
      plantDiv.appendChild(commonName);

      // Add scientific name
      const scientificName = document.createElement("p");
      scientificName.textContent = plant.scientific_name;
      plantDiv.appendChild(scientificName);

      // Add image
      if (plant.image_url) {
        const image = document.createElement("img");
        image.src = plant.image_url;
        plantDiv.appendChild(image);
      }

      plantList.appendChild(plantDiv);
    }

    // Now add pagination
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    // Add Prev and Next buttons with their respective link data
    const prevButton = createPaginationButton('Previous', response.links.prev);
    const nextButton = createPaginationButton('Next', response.links.next);

    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(nextButton);

  })
  .catch((err) => console.error(err));  // Handle errors
}

function createPaginationButton(text, url) {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = (event) => {
    searchFormSubmit(event, url);
  };
  return button;
}
