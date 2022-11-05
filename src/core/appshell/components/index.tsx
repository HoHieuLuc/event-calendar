import { Box, Overlay, useMantineTheme } from '@mantine/core';
import { useClickOutside, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

import AppContent from './AppContent/AppContent';
import AppHeader from './Header/AppHeader';
import useStyles from './index.style';
import AppNavbar from './Navbar/AppNavbar';

export default function MainAppShell() {
    const [opened, setOpened] = useState(true);
    const theme = useMantineTheme();

    const smallerThanMd = useMediaQuery(
        `(max-width: ${theme.breakpoints.md + 1}px)`
    );
    const navbarRef = useClickOutside(() => smallerThanMd && setOpened(false));

    const { classes } = useStyles({ opened });

    return (
        <Box className={classes.main}>
            <Box p={0} className={classes.navbar} ref={navbarRef}>
                <AppNavbar />
            </Box>
            <Box ml='auto' className={classes.content}>
                <AppHeader onBurgerClick={() => setOpened(!opened)} />
                <AppContent />
                {smallerThanMd && opened && (
                    <Overlay
                        opacity={0.6}
                        zIndex={theme.other.appShell.overlayZindex}
                        color='#000'
                    />
                )}
            </Box>
        </Box>
    );
}
