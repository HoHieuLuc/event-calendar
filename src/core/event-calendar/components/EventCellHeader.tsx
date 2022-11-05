import { Box, Button, Center } from '@mantine/core';
import { DateHeaderProps } from 'react-big-calendar';

import useStyles from './EventCellHeader.style';

const EventCellHeader = ({ label, date, onDrillDown }: DateHeaderProps) => {
    const { classes } = useStyles({ date });

    return (
        <Box p={2}>
            <Center>
                <Button
                    className={classes.dateCellWrapperButton}
                    radius='xl'
                    variant='subtle'
                    compact
                    onClick={onDrillDown}
                >
                    {Number(label)}
                </Button>
            </Center>
        </Box>
    );
};

export default EventCellHeader;
