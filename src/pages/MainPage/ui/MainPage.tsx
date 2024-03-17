import { FactDisplay } from 'widgets/FactDisplay';
import { AgeDisplay } from 'widgets/AgeDisplay';
import { Div } from '@vkontakte/vkui';

export const MainPage = () => {

	return (
		<Div>
			<FactDisplay/>
			<AgeDisplay/>
		</Div>
	);
};
