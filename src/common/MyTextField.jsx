import { TextField } from '@material-ui/core';
import { useField } from 'formik';
const MyTextField = ({ placeholder, type, ...props }) => {
	const [ field, meta ] = useField(props);
	const errorText = meta.error && meta.touched ? meta.error : '';
	return (
		<TextField
			{...field}
			placeholder={placeholder}
			type={type}
			helperText={errorText}
			error={!!errorText}
			size='small'
			variant='outlined'
			fullWidth
		/>
	);
};
export default MyTextField;
