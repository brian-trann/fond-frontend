import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from '../common/MyTextField';
import { Button } from '@material-ui/core';
import './SearchForm.css';
const SearchForm = () => {
	return (
		<Formik
			initialValues={{ search: '' }}
			onSubmit={(data, { setSubmitting }) => {
				// setSubmitting(true);
				// make async call

				console.log('submit');
				console.log('data');
				console.log(data);
				// setSubmitting(false);
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
