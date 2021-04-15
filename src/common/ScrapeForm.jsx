import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from '../common/MyTextField';
import { Button } from '@material-ui/core';

import * as yup from 'yup';
import './ScrapeForm.css';

const validationSchema = yup.object({
	url : yup.string().required().url()
});
const ScrapeForm = () => {
	return (
		<Formik
			initialValues={{ url: '' }}
			validationSchema={validationSchema}
			onSubmit={(data, { setSubmitting }) => {
				setSubmitting(true);
				// make async call
				// use middleware to check url

				console.log('submit');
				console.log('data');
				console.log(data);
				setSubmitting(false);
			}}
		>
			{({ values, errors, handleSubmit }) => (
				<Form className='ScrapeForm-container'>
					<div>
						<MyTextField label='Scrape Url' name='url' placeholder='url' type='input' />
						<Button type='submit'>Submit</Button>
					</div>
					{/* <pre>{JSON.stringify(values, null, 2)}</pre>
					<pre>{JSON.stringify(errors, null, 2)}</pre> */}
				</Form>
			)}
		</Formik>
	);
};
export default ScrapeForm;
