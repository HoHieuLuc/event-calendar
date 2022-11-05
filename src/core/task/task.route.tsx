import { IconListCheck, IconPlus } from '@tabler/icons';

import { AppRoute } from '~/router/router';

import Task from './components';

const routes: Array<AppRoute> = [
    {
        icon: IconListCheck,
        label: 'Tasks',
        path: '/task',
        element: <Task.List />,
    },
    {
        icon: IconPlus,
        label: 'New Task',
        path: '/task/new',
        element: <Task.Create />,
    },
];

export default routes;
