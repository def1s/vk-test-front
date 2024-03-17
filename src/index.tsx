import App from './app/App';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from 'app/providers/QueryProvider';
import { VKProvider } from 'app/providers/VKProvider';


const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
	<VKProvider>
		<QueryProvider>
			<App/>
		</QueryProvider>
	</VKProvider>
);
