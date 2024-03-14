import { object, string } from 'yup';

export const formValidationSchema = object().shape({
	name: string()
		.required('Имя не должно быть пустым')
		.matches(/^[A-Za-z]+$/, 'Имя должно содержать только английские буквы'),
});
