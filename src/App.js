import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './routes-nav/NavBar';
import Routes from './routes-nav/Routes';
import Container from '@material-ui/core/Container';
import Footer from './common/Footer';
function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Container maxWidth='md'>
				<Routes />
			</Container>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
