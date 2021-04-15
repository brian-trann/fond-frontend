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
export { isEmpty };
