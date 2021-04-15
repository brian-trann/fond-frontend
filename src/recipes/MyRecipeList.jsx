import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import GenericList from './GenericList';
import { isEmpty } from '../helpers/helpers';
import { getUserRecipes } from '../actions/recipes';

const MyRecipeList = () => {
	const dispatch = useDispatch();
	const recipes = useSelector((st) => st.recipes);
	const token = useSelector((st) => st.user.token);
	// If no token || users
	// redirect
	const decoded = jwt_decode(token);

	const username = decoded.user;

	useEffect(
		() => {
			dispatch(getUserRecipes(username)).catch((e) => {
				console.error('Something went wrong. Error: ', e);
			});
		},
		[ username, dispatch ]
	);

	return (
		<React.Fragment>
			{isEmpty(recipes) ? <p>empty</p> : <GenericList userRecipes={true} recipes={recipes} />}
		</React.Fragment>
	);
};

export default MyRecipeList;
