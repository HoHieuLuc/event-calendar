import { Box } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { IconPhotoPlus } from '@tabler/icons';
import { Editor } from '@tiptap/react';
import { useRef } from 'react';

import useStyles from './RTE.styles';

const RTEControls = () => {
    return (
        <>
            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
                <RichTextEditor.ColorPicker
                    colors={[
                        '#25262b',
                        '#868e96',
                        '#fa5252',
                        '#e64980',
                        '#be4bdb',
                        '#7950f2',
                        '#4c6ef5',
                        '#228be6',
                        '#15aabf',
                        '#12b886',
                        '#40c057',
                        '#82c91e',
                        '#fab005',
                        '#fd7e14',
                    ]}
                />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
                <InsertImageControl />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
        </>
    );
};

const imageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
    });
};

const InsertImageControl = () => {
    const { editor } = useRichTextEditorContext();
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        imageInputRef.current?.click();
    };

    const onImageInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (!file) {
            return;
        }
        const base64 = await imageUpload(file);
        editor?.commands.setImage({ src: base64, alt: file.name });
    };

    return (
        <RichTextEditor.Control
            onClick={handleUpload}
            aria-label='Insert image'
            title='Insert image'
        >
            <IconPhotoPlus stroke={1.5} size={16} />
            <input
                type='file'
                accept='image/png,image/jpeg'
                style={{ display: 'none' }}
                ref={imageInputRef}
                onChange={(e) => void onImageInputChange(e)}
            />
        </RichTextEditor.Control>
    );
};

interface Props {
    editor: Editor | null;
}

const RTE = ({ editor }: Props) => {
    const { classes } = useStyles();

    return (
        <Box className={classes.rte}>
            <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar>
                    <RTEControls />
                </RichTextEditor.Toolbar>
                
                <RichTextEditor.Content />
            </RichTextEditor>
        </Box>
    );
};

export default RTE;
