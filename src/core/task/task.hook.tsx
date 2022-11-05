import { openModal } from '@mantine/modals';
import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import Update from './components/Update';
import taskService from './task.service';
import { CreateTaskVars, Task, UpdateTaskVars } from './task.type';

const QUERY_KEYS = {
    list: ['task', 'list'],
};

const sharedOptions = (queryClient: QueryClient) => ({
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.list),
    onError: () => localStorage.removeItem('tasks'),
});

const useAll = () => {
    return useQuery<Array<Task>>(QUERY_KEYS.list, taskService.getAll, {
        onError: () => localStorage.removeItem('tasks'),
    });
};

const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, Error, CreateTaskVars>(taskService.create, {
        ...sharedOptions(queryClient),
    });
};

const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, Error, UpdateTaskVars>(taskService.update, {
        ...sharedOptions(queryClient),
    });
};

const useRemove = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, number>(taskService.remove, {
        ...sharedOptions(queryClient),
    });
};

const useUpdateModal = () => {
    return (task: Task) =>
        openModal({
            title: 'Update task',
            children: <Update data={task} />,
            overlayBlur: 1,
            centered: true,
        });
};

export default {
    useAll,
    useCreate,
    useUpdate,
    useRemove,
    useUpdateModal,
};
