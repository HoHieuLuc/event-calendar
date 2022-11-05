import { Text } from '@mantine/core';
import { EventProps } from 'react-big-calendar';

import { Task } from '~/core/task/task.type';

const EventCell = ({ event }: EventProps<Task>) => {
    return (
        <Text
            sx={(theme) => ({
                height: '100%',
                textShadow: theme.other.textShadow,
                cursor: 'pointer',
            })}
        >
            {event.done && '[COMPLETED]'}{' '}
            {event.start.toLocaleString('en-US', {
                hour: 'numeric',
                hour12: true,
            })}{' '}
            {event.title}
        </Text>
    );
};

export default EventCell;
