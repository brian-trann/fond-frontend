import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from '../common/MyTextField';
import { Button } from '@material-ui/core';
import FondApi from '../api';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
const useStyles = makeStyles(() => ({
	scrapeForm : {
		textAlign    : 'center',
		marginTop    : '2rem',
		marginBottom : '2rem'
	},
	button     : {
		marginLeft  : '1rem',
		marginRight : '1rem'
	}
}));

const validationSchema = yup.object({
	url : yup.string().required().url()
});
const ScrapeForm = () => {
	const history = useHistory();
	const classes = useStyles();
	return (
		<Formik
			initialValues={{ url: '' }}
			validationSchema={validationSchema}
			onSubmit={async (data, { setSubmitting, resetForm }) => {
				setSubmitting(true);

				try {
					const res = await FondApi.scrape(data);
					history.push(`/recipes/${res.recipe.id}`);
				} catch (error) {
					resetForm();
					console.error('Something went wrong!', error);
					console.log('display failed scrape component');
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ values, errors, handleSubmit }) => (
				<Form className={classes.scrapeForm}>
					<div>
						<MyTextField label='Scrape Url' name='url' placeholder='url' type='input' />
						<Button className={classes.button} type='submit'>
							Submit
						</Button>
					</div>
					{/* <pre>{JSON.stringify(values, null, 2)}</pre>
					<pre>{JSON.stringify(errors, null, 2)}</pre> */}
				</Form>
			)}
		</Formik>
	);
};
export default ScrapeForm;
