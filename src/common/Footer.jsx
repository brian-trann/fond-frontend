import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	'@global'    : {
		ul : {
			margin    : 0,
			padding   : 0,
			listStyle : 'none'
		}
	},
	footer       : {
		borderTop                    : `1px solid ${theme.palette.divider}`,
		marginTop                    : theme.spacing(5),
		paddingTop                   : theme.spacing(3),
		paddingBottom                : theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop    : theme.spacing(6),
			paddingBottom : theme.spacing(6)
		}
	},
	stickyFooter : {
		display       : 'flex',
		flexDirection : 'column',
		marginTop     : 'auto',
		padding       : theme.spacing(3, 2)
	}
}));
const footers = [
	{
		title       : 'GitHub',
		description : [
			{ text: 'Front End Code', url: 'https://github.com/brian-trann/fond-frontend' },
			{ text: 'Back End Code', url: 'https://github.com/brian-trann/fond' },
			{
				text : 'Command Line Tool',
				url  : 'https://github.com/brian-trann/fond/tree/command-line'
			}
		]
	}
];
const Footer = () => {
	const classes = useStyles();
	return (
		<div className={classes.stickyFooter}>
			<Container maxWidth='md' component='footer' className={classes.footer}>
				<Grid container spacing={4} justify='space-evenly'>
					{footers.map(({ title, description }) => (
						<Grid item xs={6} sm={3} key={title}>
							<Typography variant='h6' color='textPrimary' gutterBottom>
								{title}
							</Typography>
							<ul>
								{description.map(({ text, url }) => (
									<li key={text}>
										<Link
											onClick={() => window.open(url)}
											variant='subtitle1'
											color='textSecondary'
										>
											{text}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
};
export default Footer;
