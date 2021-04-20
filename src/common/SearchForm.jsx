import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from '../common/MyTextField';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
	searchForm : {
		textAlign    : 'center',
		marginTop    : '2rem',
		marginBottom : '2rem'
	},
	button     : {
		marginLeft  : '1rem',
		marginRight : '1rem'
	}
}));

const SearchForm = ({ userRecipes, handleSearch }) => {
	// console.log(userRecipes); => BOOL if searching in in userRecipes or db
	// unsure if i need this
	const classes = useStyles();

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
			{({ handleReset }) => (
				<React.Fragment>
					<Form className={classes.searchForm}>
						<div>
							<MyTextField
								label='Search'
								name='search'
								placeholder='search'
								type='input'
							/>
							<Button className={classes.button} onClick={() => handleReset()}>
								Cancel
							</Button>
							<Button className={classes.button} type='submit'>
								Search
							</Button>
						</div>
					</Form>
				</React.Fragment>
			)}
		</Formik>
	);
};
export default SearchForm;
