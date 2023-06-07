# LeafLink

## Description
LeafLink is a web application that acts as a personal plant diary. It allows users to search for plants via an API, view details about individual plants, and save plants to their personal diary. The application uses Express.js for the server-side logic, MySQL as the database, Sequelize as the ORM to interact with the database, and Handlebars for the view templates. The plant data is fetched from the Trefle API.

## Local Installation
1. If you'd like to run this locally, clone the repository: git clone https://github.com/maaront/leaf-link
2. Navigate to the project directory: cd leaf-link
3. Install the dependencies: npm install
4. Set up your MySQL database and update the connection details in the .env file
5. Run the schema and seed commands to create the development database: npm run seed

## Usage
1. Visit the deployed application at: https://leaflink.herokuapp.com/
2. On the homepage, you can use the search bar to search for plants.
3. Clicking on a plant will show more details about it.
4. You can add the plant to your personal plant diary by clicking the "Add to Diary" button.

## Features
- Search for plants by name.
- View detailed information about each plant.
- Save plants to a personal plant diary.
- View all saved plants in the plant diary.

## Technologies Used
- Express.js
- MySQL
- Sequelize
- Handlebars
- Trefle API

## Credits
This project was developed by Matt Turner, Claudia Gillota, and Dan Kopac.

## License
This project is licensed under the MIT License.