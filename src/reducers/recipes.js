import { LOAD_RECIPES } from '../actions/types';

const INITIAL_STATE = {};
const recipes = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_RECIPES:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
export default recipes;
