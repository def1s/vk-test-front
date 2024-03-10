import cls from './MainPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { FactDisplay } from 'widgets/FactDisplay/ui/FactDisplay';
import { AgeDisplay } from 'widgets/AgeDisplay/ui/AgeDisplay';

interface MainPageProps {
    className?: string
}

export const MainPage = ({ className }: MainPageProps) => {

	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<FactDisplay/>
			<AgeDisplay/>
		</div>
	);
};
