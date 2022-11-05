import { ActionIcon, Card, Grid, Group, Text, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconPencil, IconX } from '@tabler/icons';

import taskHook from '../task.hook';
import { Task } from '../task.type';

const Item = ({ data }: { data: Task }) => {
    const { mutate } = taskHook.useRemove();
    const openUpdateModal = taskHook.useUpdateModal();

    const removeTask = () => {
        mutate(data.id, {
            onSuccess: () =>
                showNotification({
                    title: 'Info',
                    message: `Task ${data.title} deleted`,
                }),
        });
    };

    return (
        <Card withBorder radius='sm'>
            <Card.Section
                sx={{
                    backgroundColor: data.color,
                    height: 30,
                }}
                withBorder
            >
                <Group
                    position='apart'
                    align='center'
                    sx={{
                        height: '100%',
                    }}
                >
                    <Group pl={3}>
                        <Text
                            size='xs'
                            color='white'
                            sx={(theme) => ({
                                textShadow: theme.other.textShadow,
                            })}
                            strikethrough={data.done}
                        >
                            {new Date(data.start).toLocaleString('en-US')}
                            {' - '}
                            {new Date(data.end).toLocaleString('en-US')}
                        </Text>
                    </Group>
                    <Group spacing={2}>
                        <ActionIcon
                            color='gray.0'
                            variant='filled'
                            size='sm'
                            mr={3}
                            onClick={() => openUpdateModal(data)}
                        >
                            <IconPencil color='black' />
                        </ActionIcon>
                        <ActionIcon
                            color='gray.0'
                            variant='filled'
                            size='sm'
                            mr={3}
                            onClick={removeTask}
                        >
                            <IconX color='black' />
                        </ActionIcon>
                    </Group>
                </Group>
            </Card.Section>
            <Card.Section p={5}>
                <Text lineClamp={1} sx={{ wordBreak: 'break-word' }}>
                    {data.title}
                </Text>
            </Card.Section>
        </Card>
    );
};

const List = () => {
    const { data } = taskHook.useAll();
    const [search, setSearch] = useInputState('');

    const _data = data?.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <TextInput
                label='Search'
                placeholder='Search'
                value={search}
                onChange={setSearch}
                mb={'xs'}
            />
            <Grid gutter={10}>
                {_data &&
                    _data.map((task) => (
                        <Grid.Col key={task.id} span={12} xs={12} sm={6} xl={4}>
                            <Item data={task} />
                        </Grid.Col>
                    ))}
            </Grid>
        </>
    );
};
export default List;
