import { closeAllModals, openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Update from './components/Update';
import taskService from './task.service';
import { CreateTaskVars, Task, UpdateTaskVars } from './task.type';

const QUERY_KEYS = {
    list: ['task', 'list'],
};

const sharedOptions = () => ({
    onError: (error: Error) =>
        showNotification({
            title: 'Error',
            color: 'red',
            message: error.message,
        }),
});

const useAll = () => {
    return useQuery<Array<Task>>(QUERY_KEYS.list, taskService.getAll);
};

const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, Error, CreateTaskVars>(taskService.create, {
        ...sharedOptions(),
        onSuccess: (data) => {
            showNotification({
                title: 'Info',
                message: `Task ${data.title} created`,
            });
            return queryClient.invalidateQueries(QUERY_KEYS.list);
        },
    });
};

const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, Error, UpdateTaskVars>(taskService.update, {
        ...sharedOptions(),
        onSuccess: (data) => {
            showNotification({
                title: 'Info',
                message: `Task ${data.title} updated`,
            });
            return queryClient.invalidateQueries(QUERY_KEYS.list);
        },
    });
};

const useRemove = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, Error, number>(taskService.remove, {
        ...sharedOptions(),
        onSuccess: (data) => {
            showNotification({
                title: 'Info',
                message: `Task ${data.title} deleted`,
            });
            closeAllModals();
            return queryClient.invalidateQueries(QUERY_KEYS.list);
        },
    });
};

const useUpdateModal = () => {
    return (task: Task) =>
        openModal({
            title: 'Update task',
            children: <Update data={task} />,
            overlayBlur: 1,
            centered: true,
            styles: (theme) => ({
                modal: {
                    width: '60%',
                    [theme.fn.smallerThan('md')]: {
                        width: '100%',
                    },
                },
            }),
        });
};

export default {
    useAll,
    useCreate,
    useUpdate,
    useRemove,
    useUpdateModal,
};
