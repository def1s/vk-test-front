import cls from './MainPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { FactDisplay } from 'widgets/FactDisplay/ui/FactDisplay';
import { AgeDisplay } from 'widgets/AgeDisplay/ui/AgeDisplay';
import { Div } from '@vkontakte/vkui';

interface MainPageProps {
    className?: string
}

export const MainPage = ({ className }: MainPageProps) => {

	return (
		<Div
			className={classNames(cls.MainPage, {}, [className])}
			// style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<FactDisplay/>
			<AgeDisplay/>
		</Div>
	);
};
