import { USER_RECIPES, USER_LOGOUT, USER_LIKE_RECIPE, USER_UNLIKE_RECIPE } from '../actions/types';

const INITIAL_STATE = {};
const recipes = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_RECIPES:
			return { ...state, ...action.payload };

		case USER_LIKE_RECIPE:
			return { ...state, ...action.payload };

		case USER_LOGOUT:
			// clears local storage
			return { ...INITIAL_STATE };

		case USER_UNLIKE_RECIPE:
			const recipes = { ...state };
			delete recipes[action.payload];
			return recipes;

		default:
			return state;
	}
};
export default recipes;
