import React, { useState } from 'react';
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
import MySnackBar from './MySnackBar';
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
	title          : 'Scrape the fond',
	description    : 'Please provide a URL to a recipe',
	example        : {
		goodExample : {
			text : 'Like this',
			url  : 'https://www.allrecipes.com/recipe/258362'
		},
		badExample  : {
			text : 'Not this',
			url  : 'https://www.allrecipes.com/'
		}
	},
	url            : {
		text : 'My web scraping approach and developer usage: GitHub',
		link : 'https://github.com/brian-trann/fond'
	},
	placeholderUrl : 'https://www.allrecipes.com/recipe/258362'
};
const ScrapeForm = () => {
	const history = useHistory();
	const classes = useStyles();
	const [ open, setOpen ] = useState(false);
	const handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
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
					setOpen(true);
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
										placeholder={scrapeFormContent.placeholderUrl}
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
						<MySnackBar
							text='Failed! The developer has been notified'
							open={open}
							handleSnackClose={handleSnackClose}
							severity='error'
						/>
					</div>
				</React.Fragment>
			)}
		</Formik>
	);
};
export default ScrapeForm;
