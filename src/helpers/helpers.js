const renderInstructions = (recipe) => {
	return recipe.recipeInstructions.map((step, i) => (
		<p>
			{i + 1}. {step.text}
		</p>
	));
};

const renderIngredients = (recipe) => {
	const ingredients = recipe.recipeIngredient.map((item) => {
		return <li>{item}</li>;
	});
	return <ul>{ingredients}</ul>;
};
export { renderInstructions, renderIngredients };
