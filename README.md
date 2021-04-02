# Fond Proposal

1. I will be creating a PERN stack app for my final project. Postgres, Express, React, Node.
2. This app will be evenly focused on full-stack development.
3. My aim is to make this a website that is also mobile-friendly.
4. My goal is to help recipes be more accessible and sharable. I feel like many recipe websites are not well suited for screen readers. Also recipe websites tend to have a poor user experience.
5. The target demographic for the app are people between the age of 18-40.
6. I plan on collecting my own data (recipes) by web scraping and by having users scrape for their own recipes, that will also help populate the database.
7. Project Approach:
   1. DB Schema


          | users        | 
          |--------------|
          | username     |
          | password     |
          | email        |
          | is_admin     |
          | is_confirmed |


          | recipes      |
          |--------------|
          | id           |
          | url          |
          | raw_recipe   |
          | title        |
          | keywords     |
          | organization |

          | user_recipes |
          |--------------|
          | username     |
          | recipe_id    |

   2. Issues might run into with my API
        
        An issue that I may run into with my API is when a user searches by something other than keywords or title.

   3. Sensitive Data

        The only sensitive data that is stored currently is the password. This will be encrypted using Bcrypt.
   4. Functionality the app will include

        * Browsing and searching for recipes
        * Exporting recipes 
        * Scraping recipes, given a URL
   5. User Flow

        * An all users can browse recipes and scrape for recipes
        * Authenticated users can also like recipes and share recipes to their email
   6. Stretch Goals 

        * Log In via Trello
        * Export to Trello
        * Export to Phone (stretch stretch goal via Twilio) 
          * This would require me to ask for a phone number, which I do not like the idea of.
  
---
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
