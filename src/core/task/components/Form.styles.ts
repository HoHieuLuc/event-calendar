import { createStyles } from '@mantine/core';

export default createStyles(() => ({
    rteImage: {
        '.ProseMirror': {
            img: {
                height: 'auto',
                maxWidth: '100%',
                '&.ProseMirror-selectednode': {
                    outline: '3px solid #68cef8',
                }
            }
        }
    }
}));