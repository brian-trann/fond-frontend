import FondApi from '../api';
import { USER_RECIPES, USER_LIKE_RECIPE, USER_UNLIKE_RECIPE } from './types';
import { isEmpty } from '../helpers/helpers';

const getUserRecipes = (username, token) => {
	// Extract only the recipes...
	return async (dispatch) => {
		const res = await FondApi.getCurrentUser(username, token);

		if (isEmpty(res.user.recipes)) return;

		const recipes = res.user.recipes.reduce((acc, curr) => {
			const { id, url, raw_recipe, keywords, title } = curr;
			const recipe = JSON.parse(raw_recipe);
			return {
				...acc,
				[id] : { url, keywords, title, id: id, recipe }
			};
		}, {});

		dispatch(gotUserRecipes(recipes));
	};
};
const gotUserRecipes = (recipes) => {
	return { type: USER_RECIPES, payload: recipes };
};
const postUserRecipeLike = (username, recipeId) => {
	return async (dispatch) => {
		const res = await FondApi.likeRecipe(username, recipeId);

		const { id, url, raw_recipe, keywords, title } = res.recipe;

		const recipeParsed = JSON.parse(raw_recipe);
		const recipe = { [id]: { url, keywords, title, recipe: recipeParsed, id: id } };
		dispatch(gotUserRecipeLike(recipe));
	};
};
const gotUserRecipeLike = (recipe) => {
	return { type: USER_LIKE_RECIPE, payload: recipe };
};
const postUserRecipeUnlike = (username, recipeId) => {
	return async (dispatch) => {
		const res = await FondApi.unlikeRecipe(username, recipeId);
		const id = res.unlike;
		dispatch(gotUserRecipeUnlike(id));
	};
};
const gotUserRecipeUnlike = (id) => {
	return { type: USER_UNLIKE_RECIPE, payload: id };
};
export { getUserRecipes, postUserRecipeLike, postUserRecipeUnlike };
