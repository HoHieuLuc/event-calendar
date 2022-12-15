import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

import { AspectRatio, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { Task } from '~/core/task/task.type';

import dashboardHook from '../event-calendar.hook';
import useStyles from './EventCalendar.styles';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop<Task>(Calendar);

const EventCalendar = () => {
    const theme = useMantineTheme();
    const smallerThanSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm + 1}px)`);
    const { classes } = useStyles();

    const events = dashboardHook.useCalendarEvents();

    const calendarProps = dashboardHook.useCalendarProps();

    return (
        <AspectRatio ratio={smallerThanSm ? 1 / 1.2 : 16 / 10} sx={classes}>
            <DragAndDropCalendar
                {...calendarProps}
                localizer={localizer}
                events={events}
                formats={{
                    eventTimeRangeFormat: () => '',
                }}
                showMultiDayTimes
                showAllEvents
            />
        </AspectRatio>
    );
};
export default EventCalendar;
