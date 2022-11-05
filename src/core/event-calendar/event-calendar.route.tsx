import { IconCalendarEvent } from '@tabler/icons';

import { AppRoute } from '~/router/router';

import Dashboard from './components';

const routes: Array<AppRoute> = [
    {
        icon: IconCalendarEvent,
        label: 'Calendar',
        path: '/',
        element: <Dashboard />,
    },
];

export default routes;
