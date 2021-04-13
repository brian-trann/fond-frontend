import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FondApi from '../api';

const useStyles = makeStyles(() => ({
	root    : {
		display : 'flex'
	},
	details : {
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'center'
	},
	content : {
		flex : '1 0 auto'
	},
	media   : {
		width : 400
	}
}));

const Recipe = () => {
	// FUTURE SELF:
	// Think about making a component like: MyRecipeWrapper that will...
	// select from Redux state, or make call to API

	const { id } = useParams();
	const classes = useStyles();

	// const recipeObj = useSelector((st) => st.recipes[id]);
	// const { title, recipe } = recipeObj;

	const [ recipeObj, setRecipeObj ] = useState({});

	useEffect(
		() => {
			const fetchRecipe = async (recipeId) => {
				const res = await FondApi.getRecipeById(recipeId);
				const { id, url, raw_recipe, keywords, title } = res;
				const recipe = JSON.parse(raw_recipe);
				const formattedRecipe = { id, url, keywords, title, recipe };
				setRecipeObj(formattedRecipe);
			};
			fetchRecipe(id);
		},
		[ id ]
	);

	//
	// WILL NEED TO MAKE A RENDER AUTHOR card
	const renderInstructions = (recipe) => {
		return recipe.recipeInstructions.map((step, i) => (
			<p key={i}>
				{i + 1}. {step.text}
			</p>
		));
	};

	const renderIngredients = (recipe) => {
		const ingredients = recipe.recipeIngredient.map((item, i) => {
			return <li key={i}>{item}</li>;
		});
		return <ul>{ingredients}</ul>;
	};
	const renderRecipe = (recipeObj) => {
		const { title, recipe } = recipeObj;
		return (
			<div className='Recipe-container'>
				<div className='Recipe-image'>
					<Card className={classes.root}>
						<div className={classes.details}>
							<CardContent className={classes.content}>
								<Typography component='h5' variant='h5'>
									{title}
								</Typography>
								<Typography variant='subtitle1' color='textSecondary'>
									{recipe.description}
								</Typography>
							</CardContent>
						</div>
						<CardMedia
							className={classes.media}
							component='img'
							src={recipe.image[0]}
							title={title}
							alt={recipe.description}
						/>
					</Card>
				</div>
				<div className='Recipe-ingredients'>{renderIngredients(recipe)}</div>
				<div className='Recipe-instructions'>{renderInstructions(recipe)}</div>
			</div>
		);
	};

	// return (
	// 	<div className='Recipe-container'>
	// 		<div className='Recipe-image'>
	// 			<Card className={classes.root}>
	// 				<div className={classes.details}>
	// 					<CardContent className={classes.content}>
	// 						<Typography component='h5' variant='h5'>
	// 							{title}
	// 						</Typography>
	// 						<Typography variant='subtitle1' color='textSecondary'>
	// 							{recipe.description}
	// 						</Typography>
	// 					</CardContent>
	// 				</div>
	// 				<CardMedia
	// 					className={classes.media}
	// 					component='img'
	// 					src={recipe.image[0]}
	// 					title={title}
	// 					alt={recipe.description}
	// 				/>
	// 			</Card>
	// 		</div>
	// 		<div className='Recipe-ingredients'>{renderIngredients(recipe)}</div>
	// 		<div className='Recipe-instructions'>{renderInstructions(recipe)}</div>
	// 	</div>
	// );
	return (
		<React.Fragment>
			{Object.keys(recipeObj).length > 0 ? renderRecipe(recipeObj) : <p>Loading</p>}
		</React.Fragment>
	);
};
export default Recipe;
