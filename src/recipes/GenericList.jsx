import React from 'react';
import RecipeCard from './RecipeCard';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MyButton from '../common/MyButton';
import { isEmpty } from '../helpers/helpers';
import { useSelector } from 'react-redux';
import SearchForm from '../common/SearchForm';
/**
 * GenericList is a component that will render recipes based on it's parent component
 *  - RecipeList (from database)
 *  - MyRecipeList (from redux store)
 */

const useStyles = makeStyles((theme) => ({
	paginateButton : {
		padding       : theme.spacing(2),
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center'
	}
}));

const GenericList = ({
	recipes,
	paginateHandler,
	searchRecipeDb,
	searchRecipeStore,
	searchWords,
	userRecipes = false
}) => {
	const classes = useStyles();
	const history = useHistory();
	const recipesState = useSelector((st) => st.recipes);
	const addedRecipeIds = Object.keys(recipesState);

	const handleSearch = (searchWords) => {
		if (userRecipes) {
			searchRecipeStore(searchWords);
		} else {
			searchRecipeDb(searchWords);
		}
	};
	// console.log('~~~~~~~~');
	// console.log(recipes);
	// console.log('~~~~~~~~');
	return (
		<React.Fragment>
			<div>
				<SearchForm userRecipes={userRecipes} handleSearch={handleSearch} />
			</div>
			<Grid direction='row' container spacing={2} justify='space-around' alignItems='stretch'>
				{Object.values(recipes).map((r) => {
					const isInState = addedRecipeIds.includes(r.id.toString());
					return (
						<RecipeCard
							handleClick={() => history.push(`/recipes/${r.id}`)}
							key={r.id}
							className={classes.recipeCard}
							recipeObj={r}
							userRecipes={isInState}
							searchWords={searchWords}
						/>
					);
				})}
			</Grid>

			{!userRecipes &&
			!isEmpty(recipes) && (
				<div className={classes.paginateButton}>
					<MyButton
						text='More Recipes'
						onClick={paginateHandler}
						size='large'
						variant='outlined'
					/>
				</div>
			)}
		</React.Fragment>
	);
};
export default GenericList;
