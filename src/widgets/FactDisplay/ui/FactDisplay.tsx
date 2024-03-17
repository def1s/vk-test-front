import { FactData, GetFact } from 'features/GetFact';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Div, Group, Spacing, Textarea } from '@vkontakte/vkui';
import { moveCaret } from '../lib/moveCaret';

export const FactDisplay = () => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const { data, error } = useQuery<FactData>(
		{
			queryKey: ['fact'],
			enabled: false // отключаю автоматическое выполнение запроса
		});

	// при изменении факта будет происходить перемещение каретки после первого слова
	useEffect(() => {
		moveCaret(data, textAreaRef);
	}, [data]);

	return (
		<Group>
			<Div>
				<Textarea
					status={error ? 'error' : 'default'}
					value={data ? data.fact : ''}
					getRef={textAreaRef}
				/>
				<Spacing/>
				<GetFact/>
			</Div>
		</Group>
	);
};
