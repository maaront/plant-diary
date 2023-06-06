function searchFormSubmit(event, searchQuery) {
  event.preventDefault();

  fetch('/plant/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ plantName: searchQuery })
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

    const firstButton = document.createElement("button");
    firstButton.textContent = "First";
    firstButton.addEventListener("click", function (event) {
      searchFormSubmit(event, response.links.first);
    });
    paginationDiv.appendChild(firstButton);

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    // If we are on the first page, disable the "Previous" button
    if (response.links.self === response.links.first) {
      prevButton.disabled = true;
    } else {
      prevButton.addEventListener("click", function (event) {
        searchFormSubmit(event, response.links.self - 1);
      });
    }
    paginationDiv.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    // If we are on the last page, disable the "Next" button
    if (response.links.self === response.links.last) {
      nextButton.disabled = true;
    } else {
      nextButton.addEventListener("click", function (event) {
        searchFormSubmit(event, response.links.self + 1);
      });
    }
    paginationDiv.appendChild(nextButton);

    const lastButton = document.createElement("button");
    lastButton.textContent = "Last";
    lastButton.addEventListener("click", function (event) {
      searchFormSubmit(event, response.links.last);
    });
    paginationDiv.appendChild(lastButton);
  });
}
