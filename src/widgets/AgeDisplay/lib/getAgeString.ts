// функция для корректного отображения возраста в виджете (лет/года/год)
export const getAgeString = (age: number): string => {
	const lastDigit = age % 10;
	const lastTwoDigits = age % 100;

	if (lastDigit === 1 && lastTwoDigits !== 11) {
		return `${age} год`;
	} else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
		return `${age} года`;
	} else {
		return `${age} лет`;
	}
};
