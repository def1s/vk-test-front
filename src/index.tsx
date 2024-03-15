import App from './app/App';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from 'app/providers/QueryProvider';

import {
	AdaptivityProvider,
	ConfigProvider,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
	<ConfigProvider>
		<AdaptivityProvider>
			<QueryProvider>
				<App/>
			</QueryProvider>
		</AdaptivityProvider>
	</ConfigProvider>
);
