import React from 'react';
import './styles/index.scss';
import { Fact } from 'widgets/Fact';
import { Age } from 'widgets/Age';
import { MainPage } from 'pages/MainPage';

const App = () => {
	return (
		<div className={'App'}>
			<MainPage/>
		</div>
	);
};

export default App;
