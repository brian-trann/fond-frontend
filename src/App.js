import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './routes-nav/NavBar';
import Routes from './routes-nav/Routes';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes />
		</BrowserRouter>
	);
}

export default App;
