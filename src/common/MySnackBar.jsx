import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
};
const MySnackBar = ({
	open,
	handleSnackClose,
	text,
	severity = 'success',
	autoHideDuration = 3000
}) => {
	return (
		<Snackbar
			open={open}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			autoHideDuration={autoHideDuration}
			onClose={handleSnackClose}
		>
			<Alert onClose={handleSnackClose} severity={severity}>
				{text}
			</Alert>
		</Snackbar>
	);
};
export default MySnackBar;
