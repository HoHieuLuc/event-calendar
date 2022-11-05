import { Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';

const AppContent = () => {
    return (
        <Container size='xl' p={10} pt={10}>
            <Outlet />
        </Container>
    );
};

export default AppContent;
