import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserSignupToken } from '../actions/user';
import { Button, Typography } from '@material-ui/core';
import MyTextField from '../common/MyTextField';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const validationSchema = yup.object({
	email    : yup.string().email(),
	password : yup.string().required().min(5),
	username : yup.string().required()
});
const useStyles = makeStyles((theme) => ({
	root        : {
		display       : 'flex',
		flexDirection : 'column',
		minHeight     : '70vh'
	},
	heroContent : {
		padding : theme.spacing(8, 0, 6)
	},
	formField   : {
		margin : theme.spacing(3, 0, 1)
	}
}));
const SignupForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	return (
		<Formik
			initialValues={{ email: '', password: '', username: '' }}
			validationSchema={validationSchema}
			onSubmit={(data, { setSubmitting, resetForm }) => {
				setSubmitting(true);

				dispatch(getUserSignupToken(data))
					.then(() => {
						history.push('/');
					})
					.catch((e) => {
						resetForm({
							values  : { email: '', password: '', username: '' },
							errors  : { email: e[0] },
							touched : { email: true }
						});
						setSubmitting(false);
					});
			}}
		>
			{() => (
				<Container className={classes.root} maxWidth='sm'>
					<div className={classes.heroContent}>
						<Typography variant='h2' component='h1' color='textSecondary' gutterBottom>
							Sign up
						</Typography>
						<Form>
							<div className={classes.formField}>
								<MyTextField
									label='Email'
									name='email'
									placeholder='email'
									type='input'
								/>
							</div>
							<div className={classes.formField}>
								<MyTextField
									label='Password'
									name='password'
									type='password'
									placeholder='password'
								/>
							</div>
							<div className={classes.formField}>
								<MyTextField
									label='Username'
									name='username'
									placeholder='username'
									type='input'
								/>
							</div>

							<div>
								<Button type='submit'>Sign Up</Button>
							</div>
						</Form>
					</div>
				</Container>
			)}
		</Formik>
	);
};
export default SignupForm;
