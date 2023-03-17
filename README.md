# letsblogaboutit
This is the repository for the fourteenth bootcamp challenge (tech blog).

## Description
`letsblogaboutit` is a CMS-style blog site where developers can publish their blog posts and comment on other developers' posts. The app follows the MVC paradigm, using Handlebars.js as the templating language, Sequelize as the ORM, and the `express-session` npm package for authentication. In addition, the app includes one-piece theme for the posts on the blog.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
To install the necessary dependencies, run the following command:

npm install

markdown
Copy code

This will install the following packages:

- `express`
- `express-handlebars`
- `mysql2`
- `sequelize`
- `dotenv`
- `bcrypt`
- `express-session`
- `connect-session-sequelize`
- `one-piece-themes`

## Usage
To use the app, follow these steps:

1. Set up a MySQL database and update the `.env` file with your database credentials.
2. Run the following command to create the database tables:

    ```
    npm run seed
    ```

3. Start the server by running the following command:

    ```
    npm start
    ```

4. Open your browser and navigate to http://localhost:3001 to use the app.

In addition to the core features outlined in the acceptance criteria, the app includes the following features:

- A one-piece theme: The posts deal with one piece topics.

## Credits
This app was created by Jarrett Jennings using the following technologies:

- Node.js
- Express.js
- Handlebars.js
- Sequelize
- MySQL
- Heroku

The one-piece topics were created by Jarrett Jennings and are available under the MIT License.

## License
This project is licensed under the terms of the MIT License.
