import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../actions/user';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import logo from '../logo.svg';
import MyNavButton from './MyNavButton';
import MyNavTypography from './MyNavTypography';

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
	const dispatch = useDispatch();
	const userState = useSelector((st) => st.user);
	const handleLogOut = () => {
		dispatch(userLogout());
	};

	const renderAuthUser = () => {
		return (
			<React.Fragment>
				<MyNavButton to='/myrecipes' text='My Recipes' />
				<MyNavButton to='/account' text='Account' />
				<MyNavButton to='/' text='Log Out' handleClick={handleLogOut} />
			</React.Fragment>
		);
	};

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
					<MyNavTypography to='/' text='Fond' className={classes.title} />
					<MyNavButton to='/' text='Home' />
					<MyNavButton to='/recipes' text='Recipes' />
					<MyNavButton to='/scrape' text='Scrape' />
					{userState.token ? renderAuthUser() : renderUnAuthUser()}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
