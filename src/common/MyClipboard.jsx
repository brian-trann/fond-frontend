import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton';
import markDownSvg from '../assets/md.svg';
import txtSvg from '../assets/txt.svg';
import Tooltip from '@material-ui/core/Tooltip';
/**
 * MyClipboard Component adds text to a user's clipboard based on which icon is clicked
 */

const MyClipboard = ({ handleSnackOpen, markDownString, textString }) => {
	return (
		<React.Fragment>
			<CopyToClipboard text={markDownString}>
				<Tooltip title='Copy markdown text'>
					<IconButton
						color='primary'
						onClick={handleSnackOpen}
						aria-label='Copy markdown text'
						component='span'
					>
						<img src={markDownSvg} alt='Markdown logo' />
					</IconButton>
				</Tooltip>
			</CopyToClipboard>
			<CopyToClipboard text={textString}>
				<Tooltip title='Copy plaintext'>
					<IconButton
						color='primary'
						aria-label='Copy plaintext'
						onClick={handleSnackOpen}
						component='span'
					>
						<img src={txtSvg} alt='text logo' />
					</IconButton>
				</Tooltip>
			</CopyToClipboard>
		</React.Fragment>
	);
};

export default MyClipboard;
