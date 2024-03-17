import App from './app/App';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from 'app/providers/QueryProvider';
import { VKProvider } from 'app/providers/VKProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';


const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
	<ErrorBoundary>
		<VKProvider>
			<QueryProvider>
				<App/>
			</QueryProvider>
		</VKProvider>
	</ErrorBoundary>
);
