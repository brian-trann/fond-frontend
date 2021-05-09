/**
 * isEmpty is a helper function to check if an object is empty.
 *  - default arg = {}
 * 
 * Object.entries(obj).length === 0 ? true : false
 * @param {Object} obj 
 * @returns Boolean
 */
const isEmpty = (obj = {}) => {
	return Object.entries(obj).length === 0;
};

/**
 * filterSpecialChars is a helper function that uses RegEx to 
 * return a new string with only word characters, digits, underscores, 
 * and white spaces
 * 
 * str.replace(/[^\w\s]/gi, '')
 * 
 *  - \w : Matches any alphanumeric character from the basic Latin alphabet, including the underscore.
 *  - \s : Matches a single white space character, including space, tab, form feed, line feed, and other Unicode spaces.
 * @param {String} String
 * @returns {String} String
 */
const filterSpecialChars = (str) => {
	return str.replace(/[^\w\s]/gi, '');
};

/**
 * generateFormattedStringFromRecipe: Given a recipe object, 
 * this function generates a formatted string for plain text and markdown.
 * 
 * - text : formatted string for plain text
 * - markdown: formatted string for markdown
 * 
 * @returns {} text: String, markdown:String
 */
const generateFormattedStringFromRecipe = (recipeObj) => {
	const response = { markdown: '', text: '' };
	const makeRecipeHeader = (recipeObj) => {
		const { description, name, recipeYield } = recipeObj;

		response.text += `${name}\n \n${description} \n\nYield: ${recipeYield} \n\n`;
		response.markdown += `# ${name} \n ## ${description} \n * Yield: ${recipeYield} \n`;

		if (recipeObj.totalTime) {
			const formattedTime = recipeObj.totalTime.replace(/PT(\d+)H(\d+)M/, '$1:$2');

			response.text += `Total Time: ${formattedTime}\n\n`;
			response.markdown += `* Total Time: ${formattedTime}\n`;
		}
		if (recipeObj.url) {
			response.text += `\n${recipeObj.url}\n\n`;
			response.markdown += `\n[Link to Recipe](${recipeObj.url})\n\n`;
		}
	};
	const makeIngredients = (recipeObj) => {
		response.text += 'Ingredients \n';
		response.markdown += '\n## Ingredients \n';

		recipeObj.recipeIngredient.forEach((ingredient) => {
			response.text += '* ' + ingredient + '\n';
			response.markdown += '* ' + ingredient + '\n';
		});
	};
	const makeInstructions = (recipeObj) => {
		response.text += '\nInstructions \n';
		response.markdown += '\n## Instructions \n';

		recipeObj.recipeInstructions.forEach(({ text }, i) => {
			response.text += `${i + 1}. ` + text + '\n\n';
			response.markdown += `${i + 1}. ` + text + '\n';
		});
	};
	const addImg = ({ name, image }) => {
		if (Array.isArray(image)) {
			if (image.length > 0) {
				response.markdown += `\n![${name}](${image[0]} "${name}") \n`;
			}
		}
		if (!Array.isArray(image) && image instanceof Object) {
			response.markdown += `\n![${name}](${image.url} "${name}") \n`;
		}
	};
	makeRecipeHeader(recipeObj);
	addImg(recipeObj);
	makeIngredients(recipeObj);
	makeInstructions(recipeObj);
	return response;
};
export { isEmpty, filterSpecialChars, generateFormattedStringFromRecipe };
