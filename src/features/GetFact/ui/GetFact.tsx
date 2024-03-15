import cls from './GetFact.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useHttp } from 'shared/hooks/useHttp/useHttp';
import { Button } from '@vkontakte/vkui';
import { useState } from 'react';

export interface FactData {
	fact: string,
	length: number
}

interface GetFactProps {
    className?: string
}

export const GetFact = ({ className }: GetFactProps) => {
	const { request, loading, error, clearError } = useHttp();
	const client = useQueryClient();

	const { refetch } = useQuery<FactData>(
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
				// очищаю ошибку
				clearError();

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
				{!loading && !error && 'Получить факт'}
				{loading && !error && 'Загрузка...'}
				{!loading && error && 'Произошла ошибка...'}
			</Button>
		</div>
	);
};
