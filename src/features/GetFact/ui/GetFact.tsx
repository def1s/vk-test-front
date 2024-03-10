import cls from './GetFact.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useQuery } from '@tanstack/react-query';
import { useHttp } from 'shared/hooks/useHttp/useHttp';

export interface FactData {
	fact: string,
	length: number
}

interface GetFactProps {
    className?: string
}

export const GetFact = ({ className }: GetFactProps) => {
	const { request, loading, error, clearError } = useHttp();

	const { refetch } = useQuery<FactData>(
		{
			queryKey: ['fact'],
			queryFn: () => request('https://catfact.ninja/fact'),
			enabled: false // отключаю автоматическое выполнение запроса
		});

	const onHandleClick = async () => {
		clearError();
		await refetch()
			.catch(error => console.error(error));
	};

	return (
		<div className={classNames(cls.GetFact, {}, [className])}>
			<Button
				onClick={onHandleClick}
				disabled={loading}
			>
				{!loading && !error && 'Получить факт'}
				{loading && !error && 'Загрузка...'}
				{!loading && error && 'Произошла ошибка...'}
			</Button>
		</div>
	);
};
