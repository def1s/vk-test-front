import cls from './GetAge.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useHttp } from 'shared/hooks/useHttp/useHttp';
import { Button } from 'shared/ui/Button/Button';

export interface AgeData {
	count: number,
	name: string,
	age: number | null
}

interface GetAgeProps {
    className?: string
}

export const GetAge = ({ className }: GetAgeProps) => {
	const [name, setName] = useState('');
	const [prevName, setPrevName] = useState('');
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

	const client = useQueryClient();
	const { request, loading, error } = useHttp();

	useEffect(() => {
		return () => { // очистка, чтобы избежать утечек памяти
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, []);

	const { refetch } = useQuery<AgeData>(
		{
			queryKey: ['age'],
			queryFn: ({ signal }) => request(`https://api.agify.io?name=${name}`, signal),
			enabled: false
		});

	const getAge = () => {
		// не отправляю запросы, если строка пуста или имя то же, что и было
		if (name.length === 0 || name === prevName) {
			return;
		}

		client.cancelQueries({ queryKey: ['age'] }); // отменяем все запросы, которые были отправлены до этого

		// подумать над обработкой или достаточно useHttp error?
		refetch()
			.then(() => setPrevName(name))
			.catch(error => console.error(error));
	};

	const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);

		if (timer) {
			clearTimeout(timer);
		}
		setTimer(setTimeout(() => getAge(), 3000));
	};

	const onHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (timer) {
			clearTimeout(timer);
		}

		getAge();
	};

	return (
		<div className={classNames(cls.GetAge, {}, [className])}>
			<form className={cls.form}>
				<input
					value={name}
					onChange={onHandleChange}
				/>
				<Button onClick={onHandleClick}>
					Узнать возраст
				</Button>
				<div>{loading && !error && 'Загрузка...'}</div>
			</form>
		</div>
	);
};
