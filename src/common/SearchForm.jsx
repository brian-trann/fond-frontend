import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from '../common/MyTextField';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

const SearchForm = ({ handleSearch }) => {
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
					<Container maxWidth='sm'>
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
					</Container>
				</React.Fragment>
			)}
		</Formik>
	);
};
export default SearchForm;
