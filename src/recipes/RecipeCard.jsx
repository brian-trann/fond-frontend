import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
	root  : {
		maxWidth : 285
	},
	media : {
		height : 140
	}
});

const RecipeCard = ({ handleClick, recipeObj }) => {
	const classes = useStyles();
	const { recipe, title, id } = recipeObj;

	const handleChildClick = () => {
		handleClick(id);
	};
	const formattedTitle = title.length < 60 ? title : title.slice(0, 60) + '...';
	const formattedDescription = recipe.description.slice(0, 120) + '...';
	const avgImgQualityIdx = ~~((recipe.image.length - 1) / 2);
	return (
		<Grid item>
			<Card className={classes.root}>
				<CardActionArea onClick={handleChildClick}>
					<CardMedia
						className={classes.media}
						image={recipe.image[avgImgQualityIdx]}
						title='Contemplative Reptile'
					/>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{formattedTitle}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							{formattedDescription}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size='small' color='primary'>
						Share
					</Button>
					<Button size='small' color='primary'>
						Learn More
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default RecipeCard;
