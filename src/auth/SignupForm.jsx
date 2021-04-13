import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { getUserSignupToken } from '../actions/user';
import { Button, Typography } from '@material-ui/core';
import MyTextField from '../common/MyTextField';
import * as yup from 'yup';
import './SignupForm.css';
const validationSchema = yup.object({
	email    : yup.string().email(),
	password : yup.string().required().min(5),
	username : yup.string().required()
});

const SignupForm = () => {
	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={{ email: '', password: '', username: '' }}
			validationSchema={validationSchema}
			onSubmit={(data, { setSubmitting, resetForm }) => {
				setSubmitting(true);
				// make async call

				console.log('submit');

				dispatch(getUserSignupToken(data));

				resetForm();
				setSubmitting(false);
			}}
		>
			{({ values, errors, handleSubmit }) => (
				<div className='SignupForm-container'>
					<Typography variant='h4' gutterBottom>
						Sign up
					</Typography>
					<Form>
						<div>
							<MyTextField
								label='Email'
								name='email'
								placeholder='email'
								type='input'
							/>
						</div>
						<div>
							<MyTextField
								label='Password'
								name='password'
								type='password'
								placeholder='password'
							/>
						</div>
						<div>
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
						{/* <pre>{JSON.stringify(values, null, 2)}</pre>
						<pre>{JSON.stringify(errors, null, 2)}</pre> */}
					</Form>
				</div>
			)}
		</Formik>
	);
};
export default SignupForm;
