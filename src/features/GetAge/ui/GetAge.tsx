import cls from './GetAge.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useHttp } from 'shared/hooks/useHttp/useHttp';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formValidationSchema } from '../model/formValidationSchema';
import { Button, FormItem, FormLayoutGroup, Input } from '@vkontakte/vkui';


interface FormValues {
	name: string
}

export interface AgeData {
	count: number,
	name: string,
	age: number | null
}

interface GetAgeProps {
    className?: string
}

export const GetAge = ({ className }: GetAgeProps) => {
	// используем useRer, потому что он не вызывает рендер при изменении значения
	const timerRef = useRef(null);

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(formValidationSchema),
		defaultValues: { name: '' }
	});

	const { request, loading, error, clearError } = useHttp();

	const client = useQueryClient();

	// логику можно вынести в model, но в данном случае по большей части будет лишний код, а не декомпозиция
	const { refetch, data } = useQuery<AgeData>(
		{
			queryKey: ['age'],
			queryFn: ({ signal }) => {
				return request(`https://api.agify.io?name=${watch('name')}`, signal);
			},
			enabled: false
		});

	// useEffect отслеживает изменение поля name в форме и каждый раз обновляет таймер на отправку данных
	useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		const name = watch('name');
		// на пустое имя ничего не будет навешиваться
		if (name.length !== 0) {
			timerRef.current = setTimeout(() => {
				handleSubmit(onHandleSubmit)();
			}, 3000);
		}

		return () => { // очистка, чтобы избежать утечек памяти
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [watch('name')]);

	const onHandleSubmit = (formData: FormValues) => {
		// если данные совпадают и нет ошибок, то не отправляем запрос
		if (data?.name === formData.name && !error) {
			return;
		}

		// очищаем ошибку, если она была
		clearError();

		client.cancelQueries({ queryKey: ['age'] }); // отменяем все запросы, которые были отправлены до этого
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		// подумать над обработкой или достаточно useHttp error?
		refetch()
			.catch(error => console.log(error));
	};

	return (
		<div className={classNames(cls.GetAge, {}, [className])}>
			<FormLayoutGroup onSubmit={handleSubmit(onHandleSubmit)} mode={'horizontal'}>
				{/*<Input*/}
				{/*	{ ...register('name', { required: true }) }*/}
				{/*/>*/}

				{/*<FormItem top={'Введите имя'} htmlFor={'name'}>*/}
				{/*	<Input*/}
				{/*		{ ...register('name', { required: true }) }*/}
				{/*		id={'name'}*/}
				{/*		type={'text'}*/}
				{/*		placeholder={'Имя'}*/}
				{/*	/>*/}
				{/*</FormItem>*/}

				{/*<Controller*/}
				{/*	control={control}*/}
				{/*	name="name"*/}
				{/*	rules={{ required: true }}*/}
				{/*	render={({ field }) =>*/}
				{/*		<Input*/}
				{/*			getRef={field.ref}*/}
				{/*			value={field.value}*/}
				{/*			onInput={field.onChange}*/}
				{/*			onBlur={field.onBlur}*/}
				{/*		/>*/}
				{/*	}*/}
				{/*/>*/}

				<FormItem top={'Введите имя'} htmlFor={'name'}>
					<input
						{ ...register('name', { required: true }) }
						placeholder={'Имя'}
					/>
				</FormItem>
				{errors.name && <div>{errors.name.message}</div>}
				<Button
					onClick={handleSubmit(onHandleSubmit)}
				>
					Узнать возраст
				</Button>
				<div>{loading && !error && 'Загрузка...'}</div>
				<div>{error && 'Произошла ошибка...'}</div>
			</FormLayoutGroup>
		</div>
	);
};
