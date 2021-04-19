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
export { isEmpty, filterSpecialChars };
