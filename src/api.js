import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class FondApi {
	static async request(endpoint, data = {}, token = 'no-token', method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}
	// Individual API Routes

	/** Get Recipes on homepage */
	static async getRecipes(limit, skip) {
		const res = await this.request(`recipe?limit=${limit}&skip=${skip}`);
		return res.recipes;
	}
	/** Get Recipe by ID */
	static async getRecipeById(id) {
		const res = await this.request(`recipe/${id}`);
		return res.recipe;
	}
	/** Signup for site; get token */
	static async signup(data) {
		const res = await this.request('auth/register', data, 'no-token', 'post');
		return res;
	}
	/** Log in and get JWT */
	static async login(data) {
		const res = await this.request('auth/token', data, 'no-token', 'post');
		return res;
	}
	/** Get Current User */
	static async getCurrentUser(username, token) {
		const res = await this.request(`user/${username}`, {}, token);

		return res;
	}
	/** User likes a recipe => returns the recipe */
	// will need to add token
	static async likeRecipe(username, recipeId) {
		const res = await this.request(
			`user/${username}/recipe/${recipeId}/like`,
			{},
			'no-token',
			'post'
		);
		return res;
	}
	/** User unlikes a recipe */
	// will need to add token
	static async unlikeRecipe(username, recipeId) {
		const res = await this.request(
			`user/${username}/recipe/${recipeId}/unlike`,
			{},
			'no-token',
			'post'
		);
		return res;
	}
}
export default FondApi;
