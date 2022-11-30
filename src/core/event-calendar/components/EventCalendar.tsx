import 'react-big-calendar/lib/css/react-big-calendar.css';

import { AspectRatio, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import dashboardHook from '../event-calendar.hook';
import useStyles from './EventCalendar.styles';

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
    const theme = useMantineTheme();
    const smallerThanSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm + 1}px)`);
    const { classes } = useStyles();

    const events = dashboardHook.useCalendarEvents();

    const calendarProps = dashboardHook.useCalendarProps();

    return (
        <AspectRatio ratio={smallerThanSm ? 1 / 1.2 : 16 / 10} sx={classes}>
            <Calendar
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
