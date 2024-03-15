import cls from './AgeDisplay.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AgeData, GetAge } from 'features/GetAge';
import { useQuery } from '@tanstack/react-query';
import { Div, Group, Text } from '@vkontakte/vkui';

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
			<Text className="" weight={'2'}>{data && data.age}</Text>
		</Group>
	);
};
