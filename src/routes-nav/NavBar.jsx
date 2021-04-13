import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../logo.svg';
import MyNavButton from './MyNavButton';

const useStyles = makeStyles(() => ({
	root  : {
		flexGrow : 1
	},
	title : {
		flexGrow : 2
	}
}));
const NavBar = () => {
	const classes = useStyles();

	// const renderAuthUser = () => {
	// 	return (
	// 		<React.Fragment>
	// 			<MyNavButton to='/myrecipes' text='My Recipes' />
	// 			<MyNavButton to='/account' text='Account' />
	// 			<MyNavButton to='/' text='Log Out' />
	// 		</React.Fragment>
	// 	);
	// };

	const renderUnAuthUser = () => (
		<React.Fragment>
			<MyNavButton to='/login' text='Log In' />
			<MyNavButton to='/signup' text='Sign Up' />
		</React.Fragment>
	);
	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<img src={logo} className='App-logo' alt='logo' />
					<Typography
						variant='h6'
						onClick={() => console.log('Home Click')}
						className={classes.title}
					>
						Fond
					</Typography>
					<MyNavButton to='/' text='Home' />
					<MyNavButton to='/recipes' text='Recipes' />
					<MyNavButton to='/scrape' text='Scrape' />
					{renderUnAuthUser()}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
