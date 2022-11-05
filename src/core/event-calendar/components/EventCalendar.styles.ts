import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    '& .rbc-off-range-bg': {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.gray[7]
                : theme.colors.gray[3],
    },
    '& .rbc-day-slot.rbc-time-column': {
        '& .rbc-time-slot': {
            borderTop:
                theme.colorScheme === 'dark'
                    ? `1px solid ${theme.colors.gray[7]}`
                    : '1px solid #f7f7f7',
        },
    },
    '& .rbc-time-view, & .rbc-time-header.rbc-overflowing': {
        border:
            theme.colorScheme === 'dark'
                ? `1px solid ${theme.colors.gray[7]}`
                : '1px solid #f7f7f7',
    },
}));