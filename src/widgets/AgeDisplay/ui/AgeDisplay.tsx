import cls from './AgeDisplay.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { AgeData, GetAge } from 'features/GetAge';
import { useQuery } from '@tanstack/react-query';
import { Group } from '@vkontakte/vkui';

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
			<div className="">{data && data.age}</div>
		</Group>
	);
};
