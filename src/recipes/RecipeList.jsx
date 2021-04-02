import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipesFromAPI } from '../actions/recipes';
import { makeStyles } from '@material-ui/core/styles';
import RecipeCard from './RecipeCard';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
	root       : {
		flexGrow : 1
	},
	recipeCard : {
		padding   : theme.spacing(3),
		textAlign : 'center',
		color     : theme.palette.text.secondary
	}
}));
const RecipeList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const recipes = useSelector((st) => st.recipes);

	const isMissing = !Object.keys(recipes).length;

	const handleClick = (id) => {
		history.push(`/recipes/${id}`);
	};
	useEffect(
		() => {
			if (isMissing) {
				dispatch(getRecipesFromAPI());
			}
		},
		[ isMissing, dispatch ]
	);
	const renderRecipeCards = Object.values(recipes).map((r) => {
		return (
			<RecipeCard
				handleClick={handleClick}
				key={r.id}
				className={classes.recipeCard}
				recipeObj={r}
			/>
		);
	});
	return (
		<React.Fragment>
			<div className='RecipeList'>This is a recipe List -- Add a search bar</div>
			<div className='card-container'>
				<Grid container spacing={2} justify='space-around' alignItems='center'>
					{renderRecipeCards}
					{renderRecipeCards}
				</Grid>
			</div>
		</React.Fragment>
	);
};
export default RecipeList;
