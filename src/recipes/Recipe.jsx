import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { decode } from 'html-entities';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FondApi from '../api';

const useStyles = makeStyles(() => ({
	root        : {
		display      : 'flex',
		margin       : '2rem',
		marginBottom : '2rem'
	},
	details     : {
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'center'
	},
	content     : {
		flex : '1 0 auto'
	},
	media       : {
		width : 400
	},
	description : {
		marginTop : '1rem'
	}
}));

const Recipe = () => {
	const { id } = useParams();
	const classes = useStyles();

	const recipesInStore = useSelector((st) => st.recipes);

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

			if (recipesInStore[id]) {
				console.log('IN THE STORE');
				setRecipeObj(() => ({ ...recipesInStore[id] }));
			} else {
				console.log('request made');
				fetchRecipe(id);
			}
		},
		[ id, recipesInStore ]
	);

	//
	// WILL NEED TO MAKE A RENDER AUTHOR card
	const renderInstructions = (recipe) => {
		return recipe.recipeInstructions.map((step, i) => {
			const decodedStep = decode(step.text);
			return (
				<p key={i}>
					{i + 1}. {decodedStep}
				</p>
			);
		});
	};

	const renderIngredients = (recipe) => {
		const ingredients = recipe.recipeIngredient.map((item, i) => {
			const decodedItem = decode(item);
			return <li key={i}>{decodedItem}</li>;
		});
		return <ul>{ingredients}</ul>;
	};
	const renderRecipe = (recipeObj) => {
		const { title, recipe, url } = recipeObj;
		const decodedTitle = decode(title);
		const decodedDescription = decode(recipe.description);
		return (
			<div className='Recipe-container'>
				<div className='Recipe-image'>
					<Card className={classes.root} variant='outlined'>
						<div className={classes.details}>
							<CardContent className={classes.content}>
								<Typography component='h5' variant='h5'>
									{decodedTitle}
								</Typography>
								<Typography
									className={classes.description}
									variant='subtitle1'
									color='textSecondary'
								>
									{decodedDescription}
								</Typography>
							</CardContent>
						</div>
						<CardMedia
							className={classes.media}
							component='img'
							src={recipe.image[0]}
							title={decodedTitle}
							alt={decodedDescription}
						/>
					</Card>
				</div>
				<p>{url}</p>
				<div className='Recipe-ingredients'>{renderIngredients(recipe)}</div>
				<div className='Recipe-instructions'>{renderInstructions(recipe)}</div>
			</div>
		);
	};

	return (
		<React.Fragment>
			{Object.keys(recipeObj).length > 0 ? renderRecipe(recipeObj) : <p>Loading</p>}
		</React.Fragment>
	);
};
export default Recipe;
