import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * PrivateRoute Component
 * - A wrapper that will allow/disallow access to a rtoure
 */
const PrivateRoute = ({ exact, path, children }) => {
	const token = useSelector((st) => st.user.token);
	return (
		<React.Fragment>
			{!token ? (
				<Redirect to='/' />
			) : (
				<Route exact={exact} path={path}>
					{children}
				</Route>
			)}
		</React.Fragment>
	);
};

export default PrivateRoute;
