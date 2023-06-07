// Function to delete a plant
const deletePlant = async (plantId) => {
  try {
    const response = await fetch(`/plant/${plantId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Plant deleted successfully
      console.log('Plant deleted successfully');

      // Remove the plant card
      const plantCard = document.querySelector(`.card[data-plant-id="${plantId}"]`);
      if (plantCard) {
        plantCard.remove();
      }
    } else {
      // Failed to delete plant
      console.log('Failed to delete plant');
    }
  } catch (err) {
    console.error(err);
  }
};

// Event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.delete-button');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent event bubbling
      event.preventDefault(); // Prevent default link behavior

      const plantCard = event.target.closest('.card');
      const plantId = plantCard.dataset.plantId;
      console.log('Plant ID:', plantId);

      if (button.classList.contains('confirm')) {
        // Delete the plant
        deletePlant(plantId);
      } else {
        button.classList.add('confirm');
        button.textContent = 'Are you sure?';
        button.style.backgroundColor = 'red';
      }
    });
  });

  const plantCards = document.querySelectorAll('.card');

  plantCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      // Prevent redirect to individual plant page
      event.preventDefault();
    });
  });
});
