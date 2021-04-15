import React, { useEffect, useState } from 'react';
// import { useDispatch ,useSelector} from 'react-redux';
import FondApi from '../api';
// import { makeStyles } from '@material-ui/core/styles';
// import RecipeCard from './RecipeCard';
// import Grid from '@material-ui/core/Grid';
// import { useHistory } from 'react-router-dom';
// import MyButton from '../common/MyButton';
import GenericList from './GenericList';
// const useStyles = makeStyles((theme) => ({
// root           : {
// 	flexGrow : 1
// },
// recipeCard     : {
// 	padding   : theme.spacing(3),
// 	textAlign : 'center',
// 	color     : theme.palette.text.secondary
// },
// 	paginateButton : {
// 		padding       : theme.spacing(2),
// 		display       : 'flex',
// 		flexDirection : 'column',
// 		alignItems    : 'center'
// 	}
// }));

const RecipeList = () => {
	// const classes = useStyles();
	// const history = useHistory();
	// const dispatch = useDispatch();
	// const recipes = useSelector((st) => st.recipes);
	const [ recipes, setRecipes ] = useState({});

	const [ limit ] = useState(15);
	const [ skip, setSkip ] = useState(0);

	const nextRecipeBatch = () => {
		setSkip(skip + limit);
	};

	// const handleClick = (id) => {
	// 	history.push(`/recipes/${id}`);
	// };
	useEffect(
		() => {
			const fetchRecipes = async (limit, skip) => {
				const res = await FondApi.getRecipes(limit, skip);
				const formattedRecipes = res.reduce((acc, curr) => {
					const { id, url, raw_recipe, keywords, title } = curr;
					const recipe = JSON.parse(raw_recipe);
					return {
						...acc,
						[id] : { url, keywords, title, id: id, recipe }
					};
				}, {});
				setRecipes((oldRecipes) => ({ ...oldRecipes, ...formattedRecipes }));
			};
			fetchRecipes(limit, skip);
		},
		[ limit, skip ]
	);

	// const renderRecipeCards = Object.values(recipes).map((r) => {
	// 	return (
	// 		<RecipeCard
	// 			handleClick={handleClick}
	// 			key={r.id}
	// 			className={classes.recipeCard}
	// 			recipeObj={r}
	// 		/>
	// 	);
	// });
	return (
		<React.Fragment>
			{/* <div className='card-container'>
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
			<div className={classes.paginateButton}>
				<MyButton
					text='More Recipes'
					onClick={nextRecipeBatch}
					size='large'
					variant='outlined'
				/>
			</div> */}
			<GenericList recipes={recipes} paginateHandler={nextRecipeBatch} />
		</React.Fragment>
	);
};
export default RecipeList;
