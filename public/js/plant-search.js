document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const plantName = document.getElementById("search-input").value;

  fetch(`/plant/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantName: plantName }),
  })
    .then((response) => response.json())
    .then((response) => {
      const plantList = document.getElementById("search-results");
      plantList.innerHTML = ""; // Clear previous results

      if (response.plants.length > 0) {
        for (let plant of response.plants) {
          const plantCard = document.createElement("div");
          plantCard.classList.add("card", "col-4");

          if (plant.image_url) {
            const plantImage = document.createElement("img");
            plantImage.src = plant.image_url;
            plantImage.classList.add("card-img-top");
            plantCard.appendChild(plantImage);
          }

          const plantCardBody = document.createElement("div");
          plantCardBody.classList.add("card-body");

          const commonName = document.createElement("p");
          commonName.classList.add("card-title");
          commonName.textContent = plant.common_name;
          plantCardBody.appendChild(commonName);

          const scientificName = document.createElement("p");
          scientificName.classList.add("card-text");
          scientificName.textContent = plant.scientific_name;
          plantCardBody.appendChild(scientificName);

          plantCard.appendChild(plantCardBody);

          plantList.appendChild(plantCard);
        }
      } else {
        plantList.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch((err) => console.error(err));
});
