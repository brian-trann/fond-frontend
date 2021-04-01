import axios from 'axios';
import { LOAD_RECIPES } from './types';
const API_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const getRecipesFromAPI = () => {
	return async function(dispatch) {
		const res = await axios.get(`${API_URL}/recipes`);

		const recipes = res.data.reduce((acc, curr) => {
			const { id, url, raw_recipe, keywords, title } = curr;
			const recipe = JSON.parse(raw_recipe);
			return {
				...acc,
				[id] : { url, keywords, title, id: id, ...recipe }
			};
		}, {});

		dispatch(gotRecipes(recipes));
	};
};
const gotRecipes = (recipes) => {
	return { type: LOAD_RECIPES, payload: recipes };
};
export { getRecipesFromAPI };
