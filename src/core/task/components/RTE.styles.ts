import { createStyles } from '@mantine/core';

export default createStyles(() => ({
    rte: {
        '.ProseMirror': {
            img: {
                height: 'auto',
                maxWidth: '100%',
                '&.ProseMirror-selectednode': {
                    border: '3px solid #68cef8',
                }
            }
        }
    }
}));