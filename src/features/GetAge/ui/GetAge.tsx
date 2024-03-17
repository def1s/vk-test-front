import cls from './GetAge.module.scss';
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

export const GetAge = () => {
	// используем useRer, потому что он не вызывает рендер при изменении значения
	const timerRef = useRef(null);

	const {
		handleSubmit,
		watch,
		control,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(formValidationSchema),
		defaultValues: { name: '' }
	});

	const { request } = useHttp();

	const client = useQueryClient();

	// логику можно вынести в model, но в данном случае по большей части будет лишний код, а не декомпозиция
	const { refetch, data, error, isFetching } = useQuery<AgeData>(
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

	const onHandleSubmit = async (formData: FormValues) => {
		// если данные совпадают и нет ошибок, то не отправляем запрос
		if (data?.name === formData.name && !error) {
			return;
		}

		// отменяем все запросы, которые еще не завершились
		// cancelQueries всегда завершается без ошибки и переходит в then
		client.cancelQueries({ queryKey: ['age'] })
			.then(() => {
				// очищаем таймер, чтобы избежать лишних запросов
				if (timerRef.current) {
					clearTimeout(timerRef.current);
				}
				// отправляем запрос
				return refetch();
			})
			.then((refetchResult) => {
				if (refetchResult.error) {
					console.error(refetchResult.error);
				}
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onHandleSubmit)}
		>
			<FormLayoutGroup mode={'horizontal'} className={cls.formLayoutWrapper}>
				{/*
					Controller - это обертка для инпута,
					позволяющая использовать react-hook-form с компонентами, которые не являются input
				*/}
				<Controller
					control={control}
					name='name'
					rules={{ required: true }}
					render={({ field }) => {
						return (
							<FormItem
								top={'Введите имя'}
								htmlFor={'name'}
								status={errors.name || error ? 'error' : 'default'}
								bottom={
									errors.name && errors.name.message
									|| isFetching && 'Загрузка...'
									|| error && !isFetching && `Произошла ошибка: ${error.message}`
								}
							>
								<Input
									getRef={field.ref}
									value={field.value}
									onInput={field.onChange}
									onBlur={field.onBlur}
								/>
							</FormItem>
						);
					}}
				/>

				<Button
					size={'l'}
					type={'submit'}
				>
					Узнать возраст
				</Button>
			</FormLayoutGroup>
		</form>
	);
};
