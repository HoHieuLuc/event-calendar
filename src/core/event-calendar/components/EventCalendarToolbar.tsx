import { ActionIcon, Box, Button, Select, Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { ToolbarProps } from 'react-big-calendar';

import { Task } from '~/core/task/task.type';

const EventCalendarToolbar = (toolbar: ToolbarProps<Task>) => {
    const goToBack = () => {
        toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
        toolbar.onNavigate('TODAY');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
            }}
            p={10}
        >
            <Button
                uppercase
                variant='outline'
                color='gray'
                onClick={() => goToCurrent()}
            >
                Today
            </Button>
            <ActionIcon onClick={() => goToBack()}>
                <IconChevronLeft />
            </ActionIcon>
            <ActionIcon onClick={() => goToNext()}>
                <IconChevronRight />
            </ActionIcon>
            <Text weight={500} size='lg' lineClamp={1}>
                {toolbar.label}
            </Text>
            <Select
                ml='auto'
                data={[
                    {
                        label: 'Day',
                        value: 'day',
                    },
                    {
                        label: 'Week',
                        value: 'week',
                    },
                    {
                        label: 'Month',
                        value: 'month',
                    },
                    {
                        label: '4 days',
                        value: 'agenda',
                    },
                ]}
                value={toolbar.view}
                onChange={toolbar.onView}
                defaultValue={'month'}
                withinPortal
            />
        </Box>
    );
};

export default EventCalendarToolbar;
