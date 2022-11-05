import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import router from '~/router/router';

import ReactQueryProvider from './ReactQueryProvider';
import ThemeProvider from './ThemeProvider';

const Provider = () => {
    return (
        <ReactQueryProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
            <ReactQueryDevtools />
        </ReactQueryProvider>
    );
};

export default Provider;
