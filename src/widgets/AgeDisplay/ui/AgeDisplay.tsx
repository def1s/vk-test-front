import cls from './AgeDisplay.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AgeData, GetAge } from 'features/GetAge';
import { useQuery } from '@tanstack/react-query';
import { Div, Group } from '@vkontakte/vkui';
import { getAgeString } from '../lib/getAgeString';

interface AgeDisplayProps {
    className?: string
}

export const AgeDisplay = ({ className }: AgeDisplayProps) => {
	const { data } = useQuery<AgeData>({
		queryKey: ['age'],
		enabled: false
	});

	return (
		<Group className={classNames(cls.AgeDisplay, {}, [className])}>
			<GetAge/>
			{
				data && data.age &&
				<Div>
					{`Возраст ${data.name} составляет ${getAgeString(data.age)}.`}
				</Div>
			}
			{
				data && data.age === null && <Div>Возраст неизвестен</Div>
			}
		</Group>
	);
};
