import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode';

import GenericList from './GenericList';
import { isEmpty } from '../helpers/helpers';
import { getUserRecipes } from '../actions/recipes';

const useStyles = makeStyles(() => ({
	emptyRecipes : {
		textAlign : 'center',
		marginTop : '2rem'
	}
}));

const MyRecipeList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const recipes = useSelector((st) => st.recipes);
	const token = useSelector((st) => st.user.token);
	const [ searching, setSearching ] = useState(false);
	const [ filteredRecipes, setFilteredRecipes ] = useState({});
	const [ searchWords, setSearchWords ] = useState('');
	// If no token || users
	// redirect
	const decoded = jwt_decode(token);

	const username = decoded.user;
	const filterRecipes = (recipes, words) => {
		const lowerWords = words.toLowerCase();
		const filteredIds = Object.values(recipes).reduce((acc, curr) => {
			// instead of returning entire object, i can return a list of IDs
			// i will be able to keep less things in state
			const { title, id } = curr;
			const lowerTitle = title.toLowerCase();
			if (lowerTitle.includes(lowerWords)) {
				return { ...acc, [id]: { ...curr } };
			} else {
				return acc;
			}
		}, {});
		return filteredIds;
	};
	const searchRecipeStore = (words) => {
		setSearching(true);
		// setSearchWords(words.split(' '));
		setSearchWords(words);
		const filtered = filterRecipes(recipes, words);
		setFilteredRecipes(filtered);
	};

	useEffect(
		() => {
			if (isEmpty(recipes)) {
				dispatch(getUserRecipes(username, token)).catch((e) => {
					console.error('Something went wrong. Error: ', e);
				});
			}
		},
		[ username, dispatch, token, recipes ]
	);
	const noRecipesLiked = () => (
		<p className={classes.emptyRecipes}>You have not added any recipes yet!</p>
	);

	return (
		<React.Fragment>
			{isEmpty(recipes) ? (
				noRecipesLiked()
			) : !searching ? (
				<GenericList
					userRecipes={true}
					recipes={recipes}
					searchRecipeStore={searchRecipeStore}
					searchWords={searchWords}
				/>
			) : (
				<GenericList
					userRecipes={true}
					recipes={filteredRecipes}
					searchRecipeStore={searchRecipeStore}
					searchWords={searchWords}
				/>
			)}
		</React.Fragment>
	);
};

export default MyRecipeList;
