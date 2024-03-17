import React from 'react';
import './styles/index.scss';
import { MainPage } from 'pages/MainPage';
import { AppRoot, Panel, PanelHeader, View } from '@vkontakte/vkui';

const App = () => {
	return (
		<AppRoot>
			<View activePanel={'main'}>
				<Panel id={'main'}>
					<PanelHeader>VK TEST TASK</PanelHeader>
					<MainPage/>
				</Panel>
			</View>
		</AppRoot>
	);
};

export default App;
