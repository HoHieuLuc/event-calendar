import { showNotification } from '@mantine/notifications';

import taskHook from '../task.hook';
import { Task } from '../task.type';
import Form from './Form';

interface Props {
    data: Task;
}

const Update = ({ data }: Props) => {
    const { mutate, isLoading } = taskHook.useUpdate();

    const handleUpdate = (values: Omit<Task, 'id'>) => {
        mutate(
            {
                id: data.id,
                ...values,
            },
            {
                onSuccess: (data) => showNotification({
                    title: 'Info',
                    message: `Task ${data.title} updated`
                }),
            }
        );
    };

    return (
        <Form
            onSubmit={handleUpdate}
            loading={isLoading}
            initialValues={{
                ...data,
                startDate: new Date(data.start),
                startTime: new Date(data.start),
                finishDate: new Date(data.end),
                finishTime: new Date(data.end),
            }}
        />
    );
};
export default Update;
