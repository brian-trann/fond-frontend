import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton';
import markDownSvg from '../assets/md.svg';
import txtSvg from '../assets/txt.svg';

const MyClipboard = ({ handleSnackOpen, markDownString, textString }) => {
	return (
		<React.Fragment>
			<CopyToClipboard text={markDownString}>
				<IconButton
					color='primary'
					onClick={handleSnackOpen}
					aria-label='upload picture'
					component='span'
				>
					<img src={markDownSvg} alt='Markdown logo' />
				</IconButton>
			</CopyToClipboard>
			<CopyToClipboard text={textString}>
				<IconButton
					color='primary'
					aria-label='upload picture'
					onClick={handleSnackOpen}
					component='span'
				>
					<img src={txtSvg} alt='text logo' />
				</IconButton>
			</CopyToClipboard>
		</React.Fragment>
	);
};

export default MyClipboard;
