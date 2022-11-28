import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
    MantineThemeOverride,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';

declare module '@mantine/core' {
    export interface MantineThemeOther {
        headerHeight: string | number;
        textShadow: string;
        appShell: {
            navbarZIndex: number;
            overlayZindex: number;
        };
    }
}

const theme: MantineThemeOverride = {
    other: {
        headerHeight: 40,
        textShadow:
            '0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black',
        appShell: {
            navbarZIndex: 101,
            overlayZindex: 100,
        },
    },
};

interface Props {
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: false,
    });

    const toggleColorScheme = (value: ColorScheme) => {
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{
                    ...theme,
                    colorScheme,
                }}
                withGlobalStyles
                withNormalizeCSS
            >
                <NotificationsProvider>
                    <ModalsProvider>{children}</ModalsProvider>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default ThemeProvider;
