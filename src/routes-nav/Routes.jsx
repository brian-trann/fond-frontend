import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../homepage/HomePage';
import RecipeList from '../recipes/RecipeList';
import MyRecipeList from '../recipes/MyRecipeList';
import Recipe from '../recipes/Recipe';
import SignupForm from '../auth/SignupForm';
import LoginForm from '../auth/LoginForm';
import ScrapeForm from '../common/ScrapeForm';
// import SearchForm from '../common/SearchForm';
const Routes = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<HomePage />
			</Route>
			<Route exact path='/signup'>
				<SignupForm />
			</Route>
			<Route exact path='/login'>
				<LoginForm />
			</Route>
			<Route exact path='/recipes'>
				<RecipeList />
			</Route>
			<Route exact path='/recipes/:id'>
				<Recipe />
			</Route>
			<Route exact path='/myrecipes'>
				<MyRecipeList />
			</Route>
			<Route exact path='/scrape'>
				<ScrapeForm />
			</Route>
			<Redirect to='/' />
		</Switch>
	);
};
export default Routes;
