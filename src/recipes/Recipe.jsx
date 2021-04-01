import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Recipe = () => {
	const { id } = useParams();
	const recipeObj = useSelector((st) => st.recipes[id]);
	const { title, recipe } = recipeObj;
	return (
		<React.Fragment>
			<div className='Recipe'>This is a single recipe ID: {id}</div>
			<div className='Recipe-container'>
				<div className='Recipe-title'>{title}</div>
				<div className='Recipe-image'>
					<img src={recipe.image[0]} alt={recipe.description} />{' '}
				</div>
				<div className='Recipe-description'>
					<p>{recipe.description}</p>
				</div>
			</div>
		</React.Fragment>
	);
};
export default Recipe;
