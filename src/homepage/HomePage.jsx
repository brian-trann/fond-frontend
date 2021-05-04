import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
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
		padding : theme.spacing(8, 0, 6)
	},
	cardHeader  : {
		backgroundColor :
			theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]
	}
}));

const userTypes = [
	{
		title         : 'Start now!',
		description   : [ 'No email needed!', 'Browse recipes', 'Extract recipes from websites' ],
		buttonText    : 'Start here',
		buttonLink    : '/recipes',
		buttonVariant : 'outlined'
	},
	{
		title         : 'Register!',
		description   : [
			'Keep track of recipes',
			'Trello Integration (in dev)',
			'Export all recipes (in dev)'
		],
		buttonText    : 'Sign up',
		buttonLink    : '/signup',
		buttonVariant : 'outlined'
	}
];

const homepageContent = {
	title          : 'Fond',
	description    :
		"Fond is a full stack recipe web app and web scraper built using NodeJS, React, PostgreSQL, and Express. It's goal is to make it easier to see recipe instructions and ingredients and to share recipes with oneself.",
	additionalInfo : 'Also, browse over 9000 recipes'
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
					<Typography variant='h5' align='center' color='textSecondary' component='p'>
						{homepageContent.description}
					</Typography>
				</Container>
				{/* End hero unit */}
				<Container maxWidth='md' component='main'>
					<Grid container spacing={5} alignItems='center' justify='center'>
						{userTypes.map(
							({
								title,
								subheader,
								description,
								buttonText,
								buttonLink,
								buttonVariant
							}) => (
								<Grid item key={title} xs={12} sm={6} md={4}>
									<Card>
										<CardHeader
											title={title}
											subheader={subheader}
											titleTypographyProps={{ align: 'center' }}
											subheaderTypographyProps={{ align: 'center' }}
											className={classes.cardHeader}
										/>
										<CardContent>
											<ul>
												{description.map((line) => (
													<Typography
														component='li'
														variant='subtitle1'
														align='center'
														key={line}
													>
														{line}
													</Typography>
												))}
											</ul>
										</CardContent>
										<CardActions>
											<Button
												href={buttonLink}
												fullWidth
												variant={buttonVariant}
												color='primary'
											>
												{buttonText}
											</Button>
										</CardActions>
									</Card>
								</Grid>
							)
						)}
					</Grid>
				</Container>
			</div>
		</React.Fragment>
	);
};
export default HomePage;
