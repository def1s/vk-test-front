import { useState } from 'react';

type Method = 'GET' | 'POST' | 'UPGRADE';

export const useHttp = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const clearError = () => {
		setError(false);
	};

	async function request(
		url: string,
		signal: AbortSignal = null,
		method: Method = 'GET',
		headers: Record<string, string> = { 'Content-Type': 'application/json' },
		body: string = null,
	) {
		setLoading(true);

		try {
			const response = await fetch(url, { method, headers, body, signal });
			const data = await response.json();

			if (!response.ok) {
				throw new Error('Something went wrong with status ' + response.status);
			}

			return data;
		} catch (e) {
			setError(true);
			throw e;
		} finally {
			setLoading(false);
		}
	}

	return { loading, error, request, clearError };
};
