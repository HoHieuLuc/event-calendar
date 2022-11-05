import dayjs from 'dayjs';

export const getExactHour = (hour: number) => {
    return dayjs().hour(hour).minute(0).second(0).millisecond(0).toDate();
};

export const mergeDateAndTime = (date: Date, time: Date) => {
    return dayjs(date)
        .hour(time.getHours())
        .minute(time.getMinutes())
        .second(0)
        .millisecond(0)
        .toDate();
};
