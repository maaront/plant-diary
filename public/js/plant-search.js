document
  .querySelector("#search-form")
  .addEventListener("submit", searchFormSubmit);

function searchFormSubmit(event) {
  event.preventDefault();
  
  let fetchUrl = '/plants/search';
  let method = 'POST';
  let headers = { 'Content-Type': 'application/json' };
  let body = JSON.stringify({ plantName: document.querySelector("#search-input").value });

  fetch(fetchUrl, {
    method,
    headers,
    body,
  })
  .then((response) => {
    console.log(response);
      return response.json();
  })
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
  })
  .catch((err) => console.error(err));  // Handle errors
}
