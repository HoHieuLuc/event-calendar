import {
    Button,
    Center,
    Checkbox,
    ColorInput,
    SimpleGrid,
    Stack,
    TextInput,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { getExactHour, mergeDateAndTime } from '~/lib/common';

import { Task, TaskForm } from '../task.type';

interface Props {
    onSubmit: (values: Omit<Task, 'id'>, callback?: () => void) => void;
    loading: boolean;
    initialValues?: TaskForm;
}

const Form = ({ onSubmit, initialValues, loading }: Props) => {
    const taskForm = useForm<TaskForm, (values: TaskForm) => Omit<Task, 'id'>>({
        initialValues: initialValues || {
            title: '',
            startDate: new Date(),
            startTime: getExactHour(8),
            finishDate: new Date(),
            finishTime: getExactHour(9),
            color: '',
            done: false,
        },
        validate: {
            title: (value) => (value ? null : 'Title is required'),
            color: (value) => (value ? null : 'Color is required'),
            startTime: (value) => (value ? null : 'Start time is required'),
            finishTime: (value) => (value ? null : 'Finish time is required'),
        },
        transformValues: (values) => ({
            title: values.title,
            color: values.color,
            done: values.done,
            start: mergeDateAndTime(values.startDate, values.startTime),
            end: mergeDateAndTime(values.finishDate, values.finishTime),
        }),
    });

    const submit = (values: Omit<Task, 'id'>) => {
        if (values.start.getTime() >= values.end.getTime()) {
            return showNotification({
                title: 'Error',
                color: 'red',
                message: 'Start time must be before end time',
            });
        }        

        onSubmit(values, () => taskForm.reset());
    };

    return (
        <form onSubmit={taskForm.onSubmit(submit)}>
            <Stack>
                <TextInput
                    label='Title'
                    placeholder='Title'
                    {...taskForm.getInputProps('title')}
                />
                <ColorInput
                    format='rgb'
                    placeholder='Pick a Color'
                    disallowInput
                    withinPortal
                    {...taskForm.getInputProps('color')}
                />
                <SimpleGrid cols={2}>
                    <DatePicker
                        label='Start Date'
                        firstDayOfWeek='sunday'
                        clearable={false}
                        maxDate={
                            taskForm.values.finishDate
                                ? taskForm.values.finishDate
                                : undefined
                        }
                        withinPortal
                        {...taskForm.getInputProps('startDate')}
                    />
                    <TimeInput
                        label='Start Time'
                        format='12'
                        {...taskForm.getInputProps('startTime')}
                    />
                    <DatePicker
                        label='Finish Date'
                        firstDayOfWeek='sunday'
                        clearable={false}
                        minDate={
                            taskForm.values.startDate
                                ? taskForm.values.startDate
                                : undefined
                        }
                        withinPortal
                        {...taskForm.getInputProps('finishDate')}
                    />
                    <TimeInput
                        label='Finish Time'
                        format='12'
                        {...taskForm.getInputProps('finishTime')}
                    />
                    <Checkbox
                        label='Mark as Completed'
                        checked={taskForm.values.done}
                        {...taskForm.getInputProps('done')}
                    />
                </SimpleGrid>
                <Center>
                    <Button type='submit' uppercase loading={loading}>
                        Submit
                    </Button>
                </Center>
            </Stack>
        </form>
    );
};
export default Form;
