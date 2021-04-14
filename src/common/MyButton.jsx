import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
	root : {
		'& > *' : {
			margin : theme.spacing(1)
		}
	}
}));
const MyButton = ({ text, onClick, variant, color = 'primary', size = 'medium' }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Button variant={variant} color={color} onClick={onClick} size={size}>
				{text}
			</Button>
		</div>
	);
};
export default MyButton;
