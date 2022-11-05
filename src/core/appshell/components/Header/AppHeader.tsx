import { ActionIcon, Box, Group,useMantineColorScheme } from '@mantine/core';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons';

interface Props {
    onBurgerClick: () => void;
}

const AppHeader = ({ onBurgerClick }: Props) => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Box
            p={7}
            sx={(theme) => ({
                backgroundColor: theme.colors.blue[5],
                position: 'sticky',
                top: 0,
                zIndex: 100,
                width: '100%',
                height: theme.other.headerHeight,
            })}
        >
            <Group
                sx={{
                    height: '100%',
                }}
                align='center'
            >
                <ActionIcon
                    mr='xl'
                    radius='xl'
                    variant='transparent'
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                    size='xl'
                    onClick={onBurgerClick}
                >
                    <IconMenu2 color='white' />
                </ActionIcon>
                <ActionIcon
                    onClick={() => toggleColorScheme()}
                    sx={(theme) => ({
                        backgroundColor:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0],
                        color:
                            theme.colorScheme === 'dark'
                                ? theme.colors.yellow[4]
                                : theme.colors.blue[6],
                    })}
                    aria-label='toggle color scheme'
                    ml='auto'
                >
                    {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
                </ActionIcon>
            </Group>
        </Box>
    );
};
export default AppHeader;
