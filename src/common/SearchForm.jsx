import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from '../common/MyTextField';
import { Button } from '@material-ui/core';

const SearchForm = ({ userRecipes, handleSearch }) => {
	return (
		<Formik
			initialValues={{ search: '' }}
			onSubmit={(data, { setSubmitting, resetForm }) => {
				setSubmitting(true);
				// make async call

				handleSearch(data.search);
				setSubmitting(false);
				resetForm();
			}}
		>
			{({ values, errors, handleSubmit }) => (
				<Form className='SearchForm'>
					<div>
						<MyTextField
							label='Search'
							name='search'
							placeholder='search'
							type='input'
						/>
						<Button type='submit'>Search</Button>
					</div>
					{/* <pre>{JSON.stringify(values, null, 2)}</pre>
					<pre>{JSON.stringify(errors, null, 2)}</pre> */}
				</Form>
			)}
		</Formik>
	);
};
export default SearchForm;
