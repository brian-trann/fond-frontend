import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const MyNavButton = ({ to, text }) => {
	return (
		<Button color='inherit' component={NavLink} to={to}>
			{text}
		</Button>
	);
};
export default MyNavButton;
