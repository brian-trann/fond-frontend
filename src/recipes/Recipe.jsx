import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { renderInstructions, renderIngredients } from '../helpers/helpers';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

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
	const { id } = useParams();
	const classes = useStyles();
	const recipeObj = useSelector((st) => st.recipes[id]);
	const { title, recipe } = recipeObj;
	// Ingredients and Instructions may be generic components
	// that are rendered instead of helper functions that render HTML
	//
	// WILL NEED TO MAKE A RENDER AUTHOR card

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
export default Recipe;
