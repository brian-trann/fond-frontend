import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	'@global'   : {
		ul : {
			margin    : 0,
			padding   : 0,
			listStyle : 'none'
		}
	},
	link        : {
		margin : theme.spacing(1, 1.5)
	},
	heroContent : {
		padding : theme.spacing(8, 0, 6)
	},
	cardHeader  : {
		backgroundColor :
			theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]
	},
	cardPricing : {
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'baseline',
		marginBottom   : theme.spacing(2)
	},
	footer      : {
		borderTop                    : `1px solid ${theme.palette.divider}`,
		marginTop                    : theme.spacing(8),
		paddingTop                   : theme.spacing(3),
		paddingBottom                : theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop    : theme.spacing(6),
			paddingBottom : theme.spacing(6)
		}
	}
}));

const userTypes = [
	{
		title         : 'Guest',
		description   : [ 'No email needed!', 'Browse recipes', 'Extract recipes from websites' ],
		buttonText    : 'Start here',
		buttonLink    : '/recipes',
		buttonVariant : 'outlined'
	},
	{
		title         : 'User',
		description   : [
			'Keep track of recipes',
			'Send yourself recipes (in dev)',
			'Export all recipes (in dev)'
		],
		buttonText    : 'Sign up',
		buttonLink    : '/signup',
		buttonVariant : 'outlined'
	}
];
const footers = [
	{
		title       : 'GitHub',
		description : [
			{ text: 'Front End Code', url: 'https://github.com/brian-trann/fond-frontend' },
			{ text: 'Back End Code', url: 'https://github.com/brian-trann/fond' },
			{
				text : 'Command Line Tool',
				url  : 'https://github.com/brian-trann/fond/tree/command-line'
			}
		]
	}
];
const HomePage = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			{/* Hero unit */}
			<Container maxWidth='sm' component='main' className={classes.heroContent}>
				<Typography
					component='h1'
					variant='h2'
					align='center'
					color='textPrimary'
					gutterBottom
				>
					Fond
				</Typography>
				<Typography variant='h5' align='center' color='textSecondary' component='p'>
					Insert a description here
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
			{/* Footer */}
			<Container maxWidth='md' component='footer' className={classes.footer}>
				<Grid container spacing={4} justify='space-evenly'>
					{footers.map(({ title, description }) => (
						<Grid item xs={6} sm={3} key={title}>
							<Typography variant='h6' color='textPrimary' gutterBottom>
								{title}
							</Typography>
							<ul>
								{description.map(({ text, url }) => (
									<li key={text}>
										<Link
											onClick={() => window.open(url)}
											variant='subtitle1'
											color='textSecondary'
										>
											{text}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
			</Container>
			{/* End footer */}
		</React.Fragment>
	);
};
export default HomePage;
