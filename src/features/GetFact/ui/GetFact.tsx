import cls from './GetFact.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useHttp } from 'shared/hooks/useHttp/useHttp';
import { Button } from '@vkontakte/vkui';

export interface FactData {
	fact: string,
	length: number
}

interface GetFactProps {
    className?: string
}

export const GetFact = ({ className }: GetFactProps) => {
	const { request } = useHttp();
	const client = useQueryClient();

	const { refetch, isFetching, error } = useQuery<FactData>(
		{
			queryKey: ['fact'],
			queryFn: ({ signal }) => request('https://catfact.ninja/fact', signal),
			enabled: false // отключаю автоматическое выполнение запроса
		});

	const onHandleClick = async () => {
		// отменяю все запросы, которые еще не завершились
		// cancelQueries всегда выполняется без ошибки
		client.cancelQueries({ queryKey: ['fact'] })
			.then(() => {
				// отправляю запрос
				return refetch();
			})
			.then(refetchResult => {
				// если запрос завершился с ошибкой
				if (refetchResult.error) {
					console.error(refetchResult.error);
				}
			});
	};

	return (
		<div className={classNames(cls.GetFact, {}, [className])}>
			<Button
				onClick={onHandleClick}
			>
				{!isFetching && !error && 'Получить факт'}
				{isFetching && 'Загрузка...'}
				{!isFetching && error && `Произошла ошибка: ${error.message}`}
			</Button>
		</div>
	);
};
