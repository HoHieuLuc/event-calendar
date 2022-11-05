import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Navigate } from 'react-big-calendar';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

interface Props {
    date: Date;
    max?: Date;
    min?: Date;
    scrollToTime?: Date;
}

function EventFourDaysView({
    date,
    max = dayjs(new Date()).endOf('day').toDate(),
    min = dayjs(new Date()).startOf('day').toDate(),
    scrollToTime = dayjs(new Date()).startOf('day').toDate(),
    ...props
}: Props) {
    const currRange = useMemo(() => EventFourDaysView.range(date), [date]);

    return (
        <TimeGrid
            max={max}
            min={min}
            range={currRange}
            scrollToTime={scrollToTime}
            {...props}
        />
    );
}

EventFourDaysView.range = (date: Date) => {
    const start = dayjs(date).startOf('day').toDate();
    const end = dayjs(start).add(3, 'day');

    let current = start;
    const range = [];

    while (
        dayjs(current).startOf('day').isBefore(end, 'day') ||
        dayjs(current).endOf('day').isSame(end, 'day')
    ) {
        range.push(current);
        current = dayjs(current).add(1, 'day').toDate();
    }

    return range;
};

EventFourDaysView.navigate = (date: Date, action: string) => {
    switch (action) {
        case Navigate.PREVIOUS:
            return dayjs(date).add(-4, 'day').toDate();
        case Navigate.NEXT:
            return dayjs(date).add(4, 'day').toDate();
        default:
            return date;
    }
};

EventFourDaysView.title = (date: Date) => {
    const from = date.toLocaleDateString('default', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    const to = dayjs(date)
        .add(3, 'day')
        .toDate()
        .toLocaleDateString('default', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    return `${from} - ${to}`;
};

export default EventFourDaysView;
