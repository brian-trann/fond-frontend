import React from 'react';
import RecipeCard from './RecipeCard';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MyButton from '../common/MyButton';
import { isEmpty } from '../helpers/helpers';
import { useSelector } from 'react-redux';
import SearchForm from '../common/SearchForm';
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
	userRecipes = false
}) => {
	const classes = useStyles();
	const history = useHistory();
	const recipesState = useSelector((st) => st.recipes);
	const addedRecipeIds = Object.keys(recipesState);

	const renderRecipeCards = Object.values(recipes).map((r) => {
		const isInState = addedRecipeIds.includes(r.id.toString());
		return (
			<RecipeCard
				handleClick={() => history.push(`/recipes/${r.id}`)}
				key={r.id}
				className={classes.recipeCard}
				recipeObj={r}
				userRecipes={isInState}
			/>
		);
	});
	const renderPaginationButton = () => {
		return (
			<div className={classes.paginateButton}>
				<MyButton
					text='More Recipes'
					onClick={paginateHandler}
					size='large'
					variant='outlined'
				/>
			</div>
		);
	};
	const handleSearch = (searchWords) => {
		if (userRecipes) {
			searchRecipeStore(searchWords);
		} else {
			searchRecipeDb(searchWords);
		}
	};

	return (
		<React.Fragment>
			<div className='card-container'>
				<div>
					<SearchForm userRecipes={userRecipes} handleSearch={handleSearch} />
				</div>
				<Grid
					direction='row'
					container
					spacing={2}
					justify='space-around'
					alignItems='stretch'
				>
					{renderRecipeCards}
				</Grid>
			</div>
			{!userRecipes && !isEmpty(recipes) && renderPaginationButton()}
		</React.Fragment>
	);
};
export default GenericList;
