import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient();

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};
