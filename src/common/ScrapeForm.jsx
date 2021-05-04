import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from '../common/MyTextField';
import { Button } from '@material-ui/core';
import FondApi from '../api';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import * as yup from 'yup';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
	root        : {
		display       : 'flex',
		flexDirection : 'column',
		minHeight     : '70vh'
	},
	scrapeForm  : {
		textAlign    : 'center',
		marginTop    : '2rem',
		marginBottom : '2rem'
	},
	button      : {
		marginLeft  : '1rem',
		marginRight : '1rem'
	},
	heroContent : {
		padding : theme.spacing(8, 0, 6)
	}
}));

const validationSchema = yup.object({
	url : yup.string().required().url()
});

const scrapeFormContent = {
	title       : 'Scrape the fond',
	description : 'Please provide a URL to a recipe',
	url         : {
		text : 'My web scraping approach and developer usage: GitHub',
		link : 'https://github.com/brian-trann/fond'
	}
};
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
					console.log('display failed scrape component or maybe a snackbar');
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{() => (
				<React.Fragment>
					<div className={classes.root}>
						<Container maxWidth='sm' component='main' className={classes.heroContent}>
							<Typography variant='h2' component='h1' color='textSecondary'>
								{scrapeFormContent.title}
							</Typography>
							<Typography variant='h5' component='p' color='textSecondary'>
								{scrapeFormContent.description}
							</Typography>
							<Form className={classes.scrapeForm}>
								<div>
									<MyTextField
										label='Scrape Url'
										name='url'
										placeholder='url'
										type='input'
									/>
									<Button className={classes.button} type='submit'>
										Submit
									</Button>
								</div>
							</Form>
							<Typography variant='h5' component='p' color='textSecondary'>
								<Link
									onClick={() => window.open(scrapeFormContent.url.link)}
									variant='subtitle1'
									color='textSecondary'
								>
									{scrapeFormContent.url.text}
								</Link>
							</Typography>
						</Container>
					</div>
				</React.Fragment>
			)}
		</Formik>
	);
};
export default ScrapeForm;
