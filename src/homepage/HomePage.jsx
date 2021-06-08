import React from 'react';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	root        : {
		display       : 'flex',
		flexDirection : 'column',
		minHeight     : '70vh'
	},
	heroContent : {
		padding    : theme.spacing(8, 0, 6),
		paddingTop : '20vh'
	},
	paragraph   : {
		padding : theme.spacing(2, 0, 1)
	}
}));

// const userTypes = [
// 	{
// 		title         : 'Start now!',
// 		description   : [ 'No email needed!', 'Browse recipes', 'Extract recipes from websites' ],
// 		buttonText    : 'Start here',
// 		buttonLink    : '/recipes',
// 		buttonVariant : 'outlined'
// 	},
// 	{
// 		title         : 'Register!',
// 		description   : [
// 			'Keep track of recipes',
// 			'Trello Integration (in dev)',
// 			'Export all recipes (in dev)'
// 		],
// 		buttonText    : 'Sign up',
// 		buttonLink    : '/signup',
// 		buttonVariant : 'outlined'
// 	}
// ];

const homepageContent = {
	title          : 'Fond',
	description    :
		"Fond is a full stack recipe web app and web scraper built using NodeJS, React, PostgreSQL, and Express. It's goal is to make it easier to see recipe instructions and ingredients and to share recipes with oneself.",
	additionalInfo :
		"The database was populated by the command line tool I created for this project. Fond currently has over 9000 recipes available. The web app's scraping functionality is still in development."
};

const HomePage = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<div className={classes.root}>
				{/* Hero unit */}

				<Container maxWidth='sm' component='main' className={classes.heroContent}>
					<Typography
						component='h1'
						variant='h2'
						align='center'
						color='textPrimary'
						gutterBottom
					>
						{homepageContent.title}
					</Typography>
					<Typography
						className={classes.paragraph}
						variant='h5'
						align='center'
						color='textSecondary'
						component='p'
					>
						{homepageContent.description}
					</Typography>
					<Typography
						className={classes.paragraph}
						variant='h5'
						align='center'
						color='textSecondary'
						component='p'
					>
						{homepageContent.additionalInfo}
					</Typography>
				</Container>
				{/* End hero unit */}
			</div>
		</React.Fragment>
	);
};
export default HomePage;
