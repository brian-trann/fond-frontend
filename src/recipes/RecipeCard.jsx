import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { decode } from 'html-entities';
import MyButton from '../common/MyButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
	root            : {
		maxWidth      : 285,
		height        : '100%',
		display       : 'flex',
		flexDirection : 'column'
	},
	media           : {
		height : 140
	},
	cardBody        : {
		marginBottom : 'auto'
	},
	cardDescription : {
		justify : 'flex-start'
	}
	// actions  : {
	// 	marginTop : 'auto'
	// }
});

const RecipeCard = ({ handleClick, recipeObj }) => {
	const classes = useStyles();

	const { recipe, title, id } = recipeObj;

	const handleChildClick = () => {
		handleClick(id);
	};
	const decodedTitle = decode(title);
	const decodedDescription = decode(recipe.description);
	const formattedTitle =
		decodedTitle.length < 40 ? decodedTitle : decodedTitle.slice(0, 40) + '...';
	const formattedDescription = decodedDescription.slice(0, 120) + '...';
	const avgImgQualityIdx = ~~((recipe.image.length - 1) / 2);
	return (
		<Grid item>
			<Card className={classes.root}>
				<CardActionArea className={classes.cardBody} onClick={handleChildClick}>
					<CardMedia
						className={classes.media}
						image={recipe.image[avgImgQualityIdx]}
						title='Contemplative Reptile'
					/>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{formattedTitle}
						</Typography>
						<Typography
							className={classes.cardDescription}
							variant='body2'
							color='textSecondary'
							component='p'
						>
							{formattedDescription}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className={classes.actions}>
					<MyButton size='small' text='Add' />
				</CardActions>
			</Card>
		</Grid>
	);
};

export default RecipeCard;
