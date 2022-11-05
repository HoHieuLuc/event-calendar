import { useMantineTheme } from '@mantine/core';
import { isSameDate } from '@mantine/dates';
import { CSSProperties, useCallback, useMemo, useState } from 'react';
import { View, Views } from 'react-big-calendar';

import taskHook from '../task/task.hook';
import { Task } from '../task/task.type';
import EventCalendarToolbar from './components/EventCalendarToolbar';
import EventCell from './components/EventCell';
import EventCellHeader from './components/EventCellHeader';
import EventFourDaysView from './components/EventFourDaysView';

const useCalendarProps = () => {
    const [view, setView] = useState<View>(
        ['month', 'week', 'day', 'agenda'].includes(
            localStorage.getItem('calendar-view') || ''
        )
            ? (localStorage.getItem('calendar-view') as View)
            : Views.MONTH
    );
    const [date, setDate] = useState(new Date());
    const theme = useMantineTheme();

    const onView = useCallback(
        (newView: View) => {
            setView(newView);
            localStorage.setItem('calendar-view', newView);
        },
        [setView]
    );
    const onNavigate = useCallback(
        (newDate: Date) => setDate(newDate),
        [setDate]
    );
    const onDrillDown = useCallback(
        (newDate: Date) => {
            setDate(newDate);
            setView(Views.DAY);
        },
        [setView]
    );

    const openUpdateModal = taskHook.useUpdateModal();
    const onSelectEvent = useCallback(
        (task: Task) => openUpdateModal(task),
        []
    );

    const eventPropGetter = useCallback(
        (task: Task) => ({
            style: {
                backgroundColor: task.color,
                fontSize: 13,
                border: '1px solid #ddd',
            },
        }),
        []
    );

    const slotGroupPropGetter = useCallback(
        () => ({
            style: {
                border: 'none',
            },
        }),
        []
    );

    const dayPropGetter = useCallback(
        (_date: Date) => {
            const style: CSSProperties = {};
            if (isSameDate(_date, new Date())) {
                style.backgroundColor =
                    theme.colorScheme === 'dark'
                        ? theme.colors.violet[9]
                        : theme.colors.teal[2];
            }
            return {
                style,
            };
        },
        [theme]
    );

    const { components, views } = useMemo(
        () => ({
            components: {
                month: {
                    dateHeader: EventCellHeader,
                },
                event: EventCell,
                toolbar: EventCalendarToolbar,
            },
            views: {
                week: true,
                day: true,
                month: true,
                agenda: EventFourDaysView,
            },
        }),
        []
    );

    return {
        components,
        views,
        view,
        date,
        onView,
        onNavigate,
        onDrillDown,
        onSelectEvent,
        dayPropGetter,
        eventPropGetter,
        slotGroupPropGetter,
    };
};

const useCalendarEvents = () => {
    const { data } = taskHook.useAll();

    const events = useMemo(() => {
        return data?.map<Task>((task) => ({
            ...task,
            start: new Date(task.start),
            end: new Date(task.end),
        }));
    }, [data]);

    return events;
};

export default {
    useCalendarProps,
    useCalendarEvents,
};
