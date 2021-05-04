# Fond (Front End)
Fond is a full stack recipe web app and web scraper built using NodeJS, React, PostgreSQL, and Express. Backend, scraper implementation, and Command line tool is located here: [GitHub](https://github.com/brian-trann/fond) 

## Usage

Users are free to browse recipes and extract recipes from other websites. Registered users can keep track of their added recipes.

---
### Basic Component Hierarchy

```
.
└── Provider / Redux Store
    └── PersistGate 
        └── App
            ├── NavBar
            └── Routes
```
```
Routes
  ├── HomePage
  ├── LoginForm
  ├── SignupForm
  ├── RecipeList
  │   ├── SearchForm
  │   └── GenericList
  │       └── RecipeCard
  ├── Recipe
  ├── MyRecipesList(private)
  │   ├── SearchForm
  │   └── GenericList
  │       └── RecipeCard
  └── ScrapeForm
```
### Dependencies
* [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
* [react-router-dom](https://www.npmjs.com/package/react-router-dom) - DOM bindings for React Router.
* [redux](https://www.npmjs.com/package/redux) - Redux is a predictable state container for JavaScript apps.
* [react-redux](https://www.npmjs.com/package/react-redux) - Official React bindings for Redux.
* [redux-thunk](https://www.npmjs.com/package/redux-thunk) - Thunk middleware for Redux.
* [redux-persist](https://www.npmjs.com/package/redux-persist) -  Persist and rehydrate a redux store.
* [formik](https://www.npmjs.com/package/formik) - React forms
* [yup](https://www.npmjs.com/package/yup) - Object schema validation
* [html-entities](https://www.npmjs.com/package/html-entities) - A utility to encode/decode HTML special characters
* [jwt-decode](https://www.npmjs.com/package/jwt-decode) - A utility to decode JWT tokens
* [react-highlight-words](https://www.npmjs.com/package/react-highlight-hooks) - A react hook to highlight words
* Other React and Material UI dependencies