import { Button, Group } from '@mantine/core';

import taskHook from '../task.hook';
import { Task } from '../task.type';
import Form from './Form';

interface Props {
    data: Task;
}

const Update = ({ data }: Props) => {
    const { mutate: updateTask, isLoading: updateLoading } = taskHook.useUpdate();
    const { mutate: removeTask, isLoading: removeLoading } = taskHook.useRemove();

    const handleUpdate = (values: Omit<Task, 'id'>) => {
        updateTask({
            id: data.id as number,
            ...values,
        });
    };

    return (
        <Form
            onSubmit={handleUpdate}
            initialValues={{
                ...data,
                startDate: new Date(data.start),
                startTime: new Date(data.start),
                finishDate: new Date(data.end),
                finishTime: new Date(data.end),
            }}
            formBottomSection={
                <Group align='center' position='center'>
                    <Button
                        type='button'
                        uppercase
                        color='red'
                        onClick={() => removeTask(data.id as number)}
                        loading={removeLoading}
                    >
                        Delete
                    </Button>
                    <Button type='submit' uppercase loading={updateLoading}>
                        Submit
                    </Button>
                </Group>
            }
        />
    );
};
export default Update;
