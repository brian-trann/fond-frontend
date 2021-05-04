import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../homepage/HomePage';
import RecipeList from '../recipes/RecipeList';
import MyRecipeList from '../recipes/MyRecipeList';
import Recipe from '../recipes/Recipe';
import SignupForm from '../auth/SignupForm';
import LoginForm from '../auth/LoginForm';
import ScrapeForm from '../common/ScrapeForm';
import PrivateRoute from './PrivateRoute';

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
			<PrivateRoute exact path='/myrecipes'>
				<MyRecipeList />
			</PrivateRoute>
			<Route exact path='/scrape'>
				<ScrapeForm />
			</Route>
			<Redirect to='/' />
		</Switch>
	);
};
export default Routes;
