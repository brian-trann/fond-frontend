import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserLoginToken } from '../actions/user';
import MyTextField from '../common/MyTextField';
import { Button, Typography } from '@material-ui/core';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
	root        : {
		display       : 'flex',
		flexDirection : 'column',
		minHeight     : '70vh'
	},
	formContent : {
		padding : theme.spacing(8, 0, 6)
	},
	formField   : {
		margin : theme.spacing(3, 0, 1)
	}
}));
const validationSchema = yup.object({
	email    : yup.string().email().required(),
	password : yup.string().required()
});

const LoginForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={validationSchema}
			onSubmit={(data, { setSubmitting, resetForm }) => {
				setSubmitting(true);
				// make async call
				dispatch(getUserLoginToken(data))
					.then(() => {
						history.push('/');
					})
					.catch((e) => {
						resetForm({
							values  : { email: data.email, password: '' },
							errors  : { email: e[0], password: e[0] },
							touched : { password: true }
						});
						setSubmitting(false);
					});
			}}
		>
			{() => (
				<Container className={classes.root} maxWidth='sm'>
					<div className={classes.formContent}>
						<Typography variant='h2' component='h1' color='textSecondary' gutterBottom>
							Log In
						</Typography>
						<Form>
							<div className={classes.formField}>
								<MyTextField
									label='Email'
									name='email'
									placeholder='Email'
									type='input'
								/>
							</div>
							<div className={classes.formField}>
								<MyTextField
									label='Password'
									name='password'
									type='password'
									placeholder='Password'
								/>
							</div>

							<div>
								<Button type='submit'>Log in</Button>
							</div>
						</Form>
					</div>
				</Container>
			)}
		</Formik>
	);
};
export default LoginForm;
