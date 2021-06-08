import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { decode } from 'html-entities';
import { postUserRecipeLike, postUserRecipeUnlike } from '../actions/recipes';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MyButton from '../common/MyButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import noImg from '../assets/no-img.jpg';
import Highlighter from 'react-highlight-words';

const useStyles = makeStyles({
	root            : {
		maxWidth      : 285,
		height        : '100%',
		display       : 'flex',
		flexDirection : 'column'
	},
	media           : {
		height : 140,
		width  : 285
	},
	cardBody        : {
		marginBottom : 'auto'
	},
	cardDescription : {
		justify : 'flex-start'
	}
});

const RecipeCard = ({ handleClick, recipeObj, userRecipes, searchWords = '' }) => {
	const classes = useStyles();
	const token = useSelector((st) => st.user.token);
	const dispatch = useDispatch();
	const history = useHistory();
	const { recipe, title, id } = recipeObj;
	const decodedTitle = decode(title);
	const decodedDescription = decode(recipe.description);
	const formattedTitle =
		decodedTitle.length < 40 ? decodedTitle : decodedTitle.slice(0, 40) + '...';
	const formattedDescription = decodedDescription.slice(0, 120) + '...';

	// const avgImgQualityIdx = Array.isArray(recipe.image) ? ~~((recipe.image.length - 1) / 2) : null;

	const getRecipeImage = (recipe) => {
		let imgStr;

		if (Array.isArray(recipe.image)) {
			const avgImgQualityIdx = ~~((recipe.image.length - 1) / 2);
			imgStr = recipe.image[avgImgQualityIdx];
		}

		if (recipe.image instanceof String) {
			imgStr = recipe.image;
		}

		if (!Array.isArray(recipe.image) && typeof recipe.image === 'object') {
			imgStr = recipe.image.url;
		}
		return imgStr;
	};
	const searchWordsArr = searchWords.split(' ');
	const imgStr = getRecipeImage(recipe);

	const handleChildClick = () => {
		handleClick(id);
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

	return (
		<Grid item>
			<Card className={classes.root}>
				<CardActionArea className={classes.cardBody} onClick={handleChildClick}>
					<CardMedia
						className={classes.media}
						image={imgStr || noImg}
						title={decodedTitle}
					/>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							<Highlighter
								searchWords={searchWordsArr}
								autoEscape={true}
								textToHighlight={formattedTitle}
							/>
						</Typography>
						<Typography
							className={classes.cardDescription}
							variant='body2'
							color='textSecondary'
							component='p'
						>
							<Highlighter
								searchWords={searchWordsArr}
								autoEscape={true}
								textToHighlight={formattedDescription}
							/>
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className={classes.actions}>
					<MyButton
						size='small'
						onClick={() => handleLikeDislike(userRecipes)}
						text={userRecipes ? 'Remove' : 'Add'}
					/>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default RecipeCard;
