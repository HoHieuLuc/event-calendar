import { showNotification } from '@mantine/notifications';

import taskHook from '../task.hook';
import { Task } from '../task.type';
import Form from './Form';

const Create = () => {
    const { mutate, isLoading } = taskHook.useCreate();

    const handleCreate = (values: Omit<Task, 'id'>, callback?: () => void) => {
        mutate(values, {
            onSuccess: (data) => {
                callback?.();
                showNotification({
                    title: 'Info',
                    message: `Task ${data.title} created`,
                });
            },
        });
    };

    return <Form onSubmit={handleCreate} loading={isLoading} />;
};

export default Create;
