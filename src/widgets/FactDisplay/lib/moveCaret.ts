import { FactData } from 'features/GetFact';
import React from 'react';

// этот файл содержит функцию moveCaret, которая перемещает каретку в текстовом поле после первого слова
export const moveCaret = (data: FactData, textAreaRef: React.MutableRefObject<HTMLTextAreaElement>) => {
	if (data && textAreaRef.current) {
		const index = data.fact.indexOf(' ');
		if (index !== -1) {
			textAreaRef.current.focus();
			textAreaRef.current.setSelectionRange(index,  index);
		}
	}
};
