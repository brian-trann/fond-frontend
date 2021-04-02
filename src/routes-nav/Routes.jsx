import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../homepage/HomePage';
import RecipeList from '../recipes/RecipeList';
import Recipe from '../recipes/Recipe';
import Container from '@material-ui/core/Container';
import ScrapeForm from '../scrape/ScrapeForm';
const Routes = () => {
	return (
		<Switch>
			<Container maxWidth='md'>
				<Route exact path='/'>
					<HomePage />
				</Route>
				<Route exact path='/recipes'>
					<RecipeList />
				</Route>
				<Route exact path='/recipes/:id'>
					<Recipe />
				</Route>
				<Route exact path='/scrape'>
					<ScrapeForm />
				</Route>
			</Container>
			<Redirect to='/' />
		</Switch>
	);
};
export default Routes;
