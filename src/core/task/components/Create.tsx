import { Button, Center } from '@mantine/core';

import taskHook from '../task.hook';
import { Task } from '../task.type';
import Form from './Form';

const Create = () => {
    const { mutate, isLoading } = taskHook.useCreate();

    const handleCreate = (values: Omit<Task, 'id'>, callback?: () => void) => {
        mutate(values, {
            onSuccess: callback
        });
    };

    return (
        <Form
            onSubmit={handleCreate}
            formBottomSection={
                <Center>
                    <Button type='submit' uppercase loading={isLoading}>
                        Submit
                    </Button>
                </Center>
            }
        />
    );
};

export default Create;
