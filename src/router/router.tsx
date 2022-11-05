import { TablerIcon } from '@tabler/icons';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

import App from '~/App';
import eventCalendarRoute from '~/core/event-calendar/event-calendar.route';
import taskRoute from '~/core/task/task.route';

export type AppRoute = {
    icon?: TablerIcon;
    label?: string;
    path: string;
} & RouteObject;

export const navbarRoutes = [...eventCalendarRoute, ...taskRoute];

const routes: Array<AppRoute> = [
    {
        path: '/',
        element: <App />,
        children: [...navbarRoutes],
    },
    {
        path: '/*',
        element: <Navigate replace to='/' />,
    },
];

export default createBrowserRouter(routes);
