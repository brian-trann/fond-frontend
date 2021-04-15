import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
const MyNavTypography = ({ text, className, variant = 'h6', handlePath = '/' }) => {
	const history = useHistory();
	return (
		<Typography
			variant={variant}
			onClick={() => {
				history.push(handlePath);
			}}
			className={className}
		>
			{text}
		</Typography>
	);
};
export default MyNavTypography;
