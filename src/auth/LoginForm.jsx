import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from '../common/MyTextField';
import { Button, Typography } from '@material-ui/core';
import * as yup from 'yup';
import './LoginForm.css';
const validationSchema = yup.object({
	email    : yup.string().email().required(),
	password : yup.string().required()
});

const LoginForm = () => {
	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={validationSchema}
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
				<div className='LoginForm-container'>
					<Typography variant='h4' gutterBottom>
						Log In
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
							<Button type='submit'>Log in</Button>
						</div>
						<pre>{JSON.stringify(values, null, 2)}</pre>
						<pre>{JSON.stringify(errors, null, 2)}</pre>
					</Form>
				</div>
			)}
		</Formik>
	);
};
export default LoginForm;
