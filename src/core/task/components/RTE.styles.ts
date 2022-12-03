import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    rte: {
        '.ProseMirror': {
            img: {
                height: 'auto',
                maxWidth: '100%',
                '&.ProseMirror-selectednode': {
                    border: '3px solid #68cef8',
                },
            },
        },
        '.mantine-RichTextEditor-toolbar': {
            [theme.fn.smallerThan('sm')]: {
                display: 'none',
            },
        },
    }
}));