import { FactDisplay } from 'widgets/FactDisplay/ui/FactDisplay';
import { AgeDisplay } from 'widgets/AgeDisplay/ui/AgeDisplay';
import { Div } from '@vkontakte/vkui';

export const MainPage = () => {

	return (
		<Div>
			<FactDisplay/>
			<AgeDisplay/>
		</Div>
	);
};
