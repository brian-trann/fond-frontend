import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decode } from 'html-entities';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { postUserRecipeLike, postUserRecipeUnlike } from '../actions/recipes';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FondApi from '../api';
import noImg from '../assets/no-img.jpg';
import { isEmpty, generateFormattedStringFromRecipe } from '../helpers/helpers';
import MySnackBar from '../common/MySnackBar';
import MyClipboard from '../common/MyClipboard';
/**
 * Recipe Component renders the recipe ingredients, instructions, and author
 */
const useStyles = makeStyles(() => ({
	root         : {
		display      : 'flex',
		margin       : '2rem',
		marginBottom : '2rem'
	},
	details      : {
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'center',
		margin         : '1rem'
	},
	content      : {
		flex : '1 0 auto'
	},
	media        : {
		width : 400
	},
	description  : {
		marginTop : '1rem'
	},
	author       : {
		marginTop : '4rem'
	},
	siteUrl      : {
		display   : 'flex',
		marginTop : '1rem'
	},
	container    : {
		marginBottom : '6rem'
	},
	addRemoveBtn : {
		float       : 'right',
		marginRight : '2rem'
	}
}));

const Recipe = () => {
	// check if image is array or string
	const { id } = useParams();
	const classes = useStyles();
	const recipesInStore = useSelector((st) => st.recipes);
	const token = useSelector((st) => st.user.token);
	const dispatch = useDispatch();
	const history = useHistory();
	const [ recipeObj, setRecipeObj ] = useState({});
	const [ open, setOpen ] = useState(false);

	const handleSnackOpen = () => {
		setOpen(true);
	};

	const handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleLikeDislike = (isUserRecipes) => {
		if (token) {
			const decoded = jwt_decode(token);
			if (!isUserRecipes) {
				dispatch(postUserRecipeLike(decoded.user, id)).catch((e) => {
					console.log('Error: ', e);
				});
			}

			if (isUserRecipes) {
				dispatch(postUserRecipeUnlike(decoded.user, id)).catch((e) => {
					console.log('Error: ', e);
				});
			}
		} else {
			history.push('/signup');
		}
	};

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
				//set md?
				setRecipeObj(() => ({ ...recipesInStore[id] }));
			} else {
				fetchRecipe(id);
			}
		},
		[ id, recipesInStore ]
	);
	const isAdded = (recipesInStore, id) => {
		return Object.keys(recipesInStore).includes(id);
	};

	const renderRecipe = (recipeObj) => {
		const { title, recipe, url } = recipeObj;
		const decodedTitle = decode(title);
		const decodedDescription = decode(recipe.description);
		
		const author = Array.isArray(recipe?.author) ? recipe.author[0] : recipe.author;
		let img
		if(Array.isArray(recipe.image)){
			if(typeof recipe.image[0] === 'string'){
				img = recipe.image[0]
			}
			if(typeof recipe.image[0] === 'object' && recipe.image[0]['@type'] === 'ImageObject'){
				img = recipe.image[0].url
			}
			console.log(img)
		}
		if(recipe.image instanceof String || typeof recipe.image ==='string'){
			img = recipe.image
		}
		if(recipe.image instanceof Object && !Array.isArray(recipe.image)){
			img = recipe.image.url
			
		}
		
		return (
			<div className={classes.container}>
				<div className='Recipe-image'>
					<Card
						className={classes.root}
						variant='outlined'
						onClick={() => window.open(url)}
					>
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
								<div className={classes.siteUrl}>
									<Typography variant='subtitle2' color='textSecondary'>
										Click to view recipe on website...
									</Typography>
								</div>
							</CardContent>
						</div>
						<CardMedia
							className={classes.media}
							component='img'
							src={img ||  noImg}
							title={decodedTitle}
							alt={decodedDescription}
						/>
					</Card>
				</div>
				{/* Add / Remove button */}

				<Button
					color='primary'
					onClick={() => handleLikeDislike(isAdded(recipesInStore, id))}
					className={classes.addRemoveBtn}
				>
					{isAdded(recipesInStore, id) ? 'Remove' : 'Add'}
				</Button>
				{/* EndButton*/}
				{/* Clipboard */}
				{!isEmpty(recipeObj) && (
					<React.Fragment>
						Copy to clipboard
						<MyClipboard
							handleSnackOpen={handleSnackOpen}
							markDownString={
								generateFormattedStringFromRecipe(recipeObj.recipe).markdown
							}
							textString={generateFormattedStringFromRecipe(recipeObj.recipe).text}
						/>
					</React.Fragment>
				)}
				{/* End Clipboard */}

				{/* Recipe Ingredients */}
				<Typography component='h5' variant='h5'>
					Ingredients
				</Typography>
				<ul>
					{recipe.recipeIngredient.map((item, i) => (
						<Typography key={i} component='li'>
							{decode(item)}
						</Typography>
					))}
				</ul>
				{/* End Recipe Ingredients */}

				{/* Instructions */}
				<Typography component='h5' variant='h5'>
					Instructions
				</Typography>
				<ol>
					{recipe.recipeInstructions.map(({ text }, i) => (
						<Typography key={i} component='li' paragraph={true}>
							{decode(text)}
						</Typography>
					))}
				</ol>
				{/* End Recipe Instructions */}

				{/* Recipe Author */}
				{author && 
				(<Card className={classes.author}
							variant='outlined'  
							onClick={()=> window.open(author?.url || url)}>
					<CardContent>
						<Typography component='h5' variant='h6'>Recipe by: {author?.name}</Typography>
						<Typography 
							className={classes.description}
							variant='subtitle1'
							color='textSecondary'
							>{author?.description}</Typography>
						<div className={classes.siteUrl}>
							<Typography
								variant='subtitle2' 
								color='textSecondary'
								>{author?.url || url}
							</Typography>
						</div>
						
					</CardContent>
				</Card>)}
				{/* End Author */}
				{/* Snackbar */}
				<MySnackBar
					text='Copied to clipboard'
					open={open}
					handleSnackClose={handleSnackClose}
				/>
				{/* End Snackbar */}
			</div>
		);
	};

	return (
		<React.Fragment>
			{isEmpty(recipeObj)  ?  <p>Loading</p> : renderRecipe(recipeObj) }
		</React.Fragment>
	);
};
export default Recipe;
