import Drawable from './components/Drawable.js';
import Toolbar from './components/Toolbar';
import { ToolbarProvider } from './store/ToolbarProvider.js';

function App() {
	return (
		<ToolbarProvider>
			<main className='overflow-hidden'>
				<Toolbar />
				<Drawable />
			</main>
		</ToolbarProvider>
	);
}

export default App;
