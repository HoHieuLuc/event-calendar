import { createStyles } from '@mantine/core';
import dayjs from 'dayjs';

interface Params {
    date: Date;
}

export default createStyles((theme, { date }: Params) => {
    const isSameDate = dayjs(date).isSame(new Date(), 'day');
    return {
        dateCellWrapperButton: {
            backgroundColor: isSameDate ? theme.colors.blue[5] : 'transparent',
            color: isSameDate ? 'white' : 'unset',
            width: 35,
            height: 35,
            ['&:hover']: {
                backgroundColor: isSameDate
                    ? theme.colors.blue[6]
                    : theme.colors.gray[4],
                color: theme.colorScheme === 'dark' ? 'black' : 'white',
            },
        },
    };
});
