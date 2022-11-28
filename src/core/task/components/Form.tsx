import {
    Box,
    Checkbox,
    ColorInput,
    Group,
    Input,
    Paper,
    SimpleGrid,
    Stack,
    Switch,
    TextInput,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Link } from '@mantine/tiptap';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import { getExactHour, mergeDateAndTime } from '~/lib/dates';

import { Task, TaskForm } from '../task.type';
import RTE from './RTE';

interface Props {
    onSubmit: (values: Omit<Task, 'id'>, callback?: () => void) => void;
    initialValues?: TaskForm;
    formBottomSection: React.ReactNode;
}

const Form = ({ onSubmit, initialValues, formBottomSection }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextStyle,
            Color,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Content' }),
        ],
        content: initialValues?.content || '<p></p>',
    });

    const taskForm = useForm<TaskForm, (values: TaskForm) => Omit<Task, 'id'>>({
        initialValues: initialValues || {
            title: '',
            startDate: new Date(),
            startTime: getExactHour(8),
            finishDate: new Date(),
            finishTime: getExactHour(9),
            color: '',
            done: false,
            content: '',
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
            content: editor?.getHTML() || '',
        }),
    });

    const [previewMode, setPreviewMode] = useState(false);

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
                <TextInput label='Title' placeholder='Title' {...taskForm.getInputProps('title')} />
                <Input.Wrapper>
                    <Input.Label mb='xs'>
                        <Group align='center'>
                            <Box>Content</Box>
                            <Switch
                                label='Preview'
                                checked={previewMode}
                                onChange={(event) => {
                                    setPreviewMode(event.currentTarget.checked);
                                }}
                                sx={{
                                    display: 'flex',
                                }}
                            />
                        </Group>
                    </Input.Label>
                    <Paper
                        dangerouslySetInnerHTML={{
                            __html: editor?.getHTML() || '',
                        }}
                        withBorder
                        p={15}
                        display={previewMode ? 'block' : 'none'}
                    />
                    <Box display={previewMode ? 'none' : 'block'}>
                        <RTE editor={editor} />
                    </Box>
                </Input.Wrapper>
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
                            taskForm.values.finishDate ? taskForm.values.finishDate : undefined
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
                        minDate={taskForm.values.startDate ? taskForm.values.startDate : undefined}
                        withinPortal
                        {...taskForm.getInputProps('finishDate')}
                    />
                    <TimeInput
                        label='Finish Time'
                        format='12'
                        {...taskForm.getInputProps('finishTime')}
                    />
                </SimpleGrid>
                <Checkbox
                    label='Mark as Completed'
                    checked={taskForm.values.done}
                    {...taskForm.getInputProps('done')}
                />
                {formBottomSection}
            </Stack>
        </form>
    );
};

export default Form;
