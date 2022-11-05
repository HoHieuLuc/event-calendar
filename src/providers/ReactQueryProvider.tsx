import { QueryClientProvider } from '@tanstack/react-query';

import queryClient from '~/lib/query-client';

interface Props {
    children: React.ReactNode | Array<React.ReactNode>;
}

const ReactQueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
