import App from './app/App';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from 'app/providers/QueryProvider';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
	<QueryProvider>
		<App/>
	</QueryProvider>
);
