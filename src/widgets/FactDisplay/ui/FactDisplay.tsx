import cls from './FactDisplay.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { FactData, GetFact } from 'features/GetFact';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

interface FactDisplayProps {
    className?: string
}

export const FactDisplay = ({ className }: FactDisplayProps) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const { data } = useQuery<FactData>(
		{
			queryKey: ['fact'],
			enabled: false // отключаю автоматическое выполнение запроса
		});

	useEffect(() => {
		moveCaret();
	}, [data]);

	const moveCaret = () => {
		if (data && textAreaRef.current) {
			const index = data.fact.indexOf(' ');
			if (index !== -1) {
				textAreaRef.current.focus();
				textAreaRef.current.setSelectionRange(index,  index);
			}
		}
	};

	return (
		<div className={classNames(cls.FactDisplay, {}, [className])}>
			<textarea
				value={data ? data.fact : ''}
				ref={textAreaRef}
			/>
			<GetFact/>
		</div>
	);
};
