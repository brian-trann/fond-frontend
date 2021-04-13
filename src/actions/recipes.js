import axios from 'axios';
import { LOAD_RECIPES } from './types';
const API_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
// REFACTOR TO USE FondApi.js
const getRecipesFromAPI = () => {
	return async function(dispatch) {
		let limit = 20;
		let skip = 0;
		// make this only for getting user recieps
		const res = await axios.get(`${API_URL}/recipe?limit=${limit}&skip=${skip}`);
		console.log('limit ', limit);

		const recipes = res.data.recipes.reduce((acc, curr) => {
			const { id, url, raw_recipe, keywords, title } = curr;
			const recipe = JSON.parse(raw_recipe);
			return {
				...acc,
				[id] : { url, keywords, title, id: id, recipe }
			};
		}, {});

		dispatch(gotRecipes(recipes));
	};
};
const gotRecipes = (recipes) => {
	return { type: LOAD_RECIPES, payload: recipes };
};
export { getRecipesFromAPI };
