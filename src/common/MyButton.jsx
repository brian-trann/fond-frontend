import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
	root : {
		'& > *' : {
			margin : theme.spacing(1)
		}
	}
}));
const MyButton = ({
	text,
	onClick,
	variant,
	color = 'primary',
	size = 'medium',
	type = 'submit'
}) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Button variant={variant} color={color} type={type} onClick={onClick} size={size}>
				{text}
			</Button>
		</div>
	);
};
export default MyButton;
