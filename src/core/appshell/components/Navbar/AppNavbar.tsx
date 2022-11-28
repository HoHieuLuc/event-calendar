import { Box, Center, NavLink, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

import { navbarRoutes } from '~/router/router';

import useStyles from './AppNavbar.style';

const AppNavbar = () => {
    const location = useLocation();
    const { classes } = useStyles();

    const navLinkElements = navbarRoutes.map((item) => (
        <NavLink
            key={item.label}
            active={location.pathname === item.path}
            label={item.label}
            icon={item.icon && <item.icon size={16} stroke={1.5} />}
            component={Link}
            to={item.path}
            className={classes.navlink}
        />
    ));

    return (
        <Box>
            <Center
                sx={(theme) => ({
                    justifyContent: 'start',
                    height: theme.other.headerHeight,
                    borderBottom:
                        theme.colorScheme === 'light'
                            ? `1px solid ${theme.colors.gray[3]}`
                            : `1px solid ${theme.colors.gray[7]}`,
                })}
            >
                <Text pl='sm' lineClamp={1} weight={500} size='md'>
                    Event Calendar
                </Text>
            </Center>
            <Box>{navLinkElements}</Box>
        </Box>
    );
};

export default AppNavbar;
