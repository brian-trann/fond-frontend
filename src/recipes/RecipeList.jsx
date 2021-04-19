import React, { useEffect, useState } from 'react';

import FondApi from '../api';
import GenericList from './GenericList';
import { filterSpecialChars } from '../helpers/helpers';

const RecipeList = () => {
	const [ recipes, setRecipes ] = useState({});

	const [ limit ] = useState(15);
	const [ skip, setSkip ] = useState(0);
	const [ search, setSearch ] = useState('');

	const nextRecipeBatch = () => {
		setSkip(skip + limit);
	};

	const searchRecipeDb = (words) => {
		const filteredWords = filterSpecialChars(words);
		const trimmedWords = filteredWords.trim();
		setSkip(0);
		console.log('reset skip and recipes');
		setRecipes({});

		setSearch(trimmedWords);
	};

	useEffect(
		() => {
			const fetchRecipes = async (limit, skip, search) => {
				const res = await FondApi.getRecipes(limit, skip, search);

				const formattedRecipes = res.reduce((acc, curr) => {
					const { id, url, raw_recipe, keywords, title } = curr;
					const recipe = JSON.parse(raw_recipe);
					return {
						...acc,
						[id] : { url, keywords, title, id, recipe }
					};
				}, {});

				setRecipes((oldRecipes) => ({ ...oldRecipes, ...formattedRecipes }));
			};
			fetchRecipes(limit, skip, search).catch((e) => {
				console.log(e);
			});
		},
		[ limit, skip, search ]
	);

	return (
		<React.Fragment>
			<GenericList
				recipes={recipes}
				paginateHandler={nextRecipeBatch}
				searchRecipeDb={searchRecipeDb}
			/>
		</React.Fragment>
	);
};
export default RecipeList;
