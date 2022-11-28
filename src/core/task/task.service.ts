import { dbPromise } from '~/lib/db';

import { CreateTaskVars, UpdateTaskVars } from './task.type';

const getAll = async () => {
    const db = await dbPromise;
    const tasks = db.getAll('task');
    return tasks;
};

const create = async (payload: CreateTaskVars) => {
    const db = await dbPromise;
    const newTaskId = await db.add('task', payload);
    const newTask = await db.get('task', newTaskId);
    if (!newTask) {
        throw new Error(`Create task failed`);
    }
    return newTask;
};

const update = async (payload: UpdateTaskVars) => {
    const db = await dbPromise;
    const updatedTaskId = await db.put('task', payload);
    const updatedTask = await db.get('task', updatedTaskId);
    if (!updatedTask) {
        throw new Error(`Update task with id ${payload.id} failed`);
    }
    return updatedTask;
};

const remove = async (id: number) => {
    const db = await dbPromise;
    const deletedTask = await db.get('task', id);
    if (!deletedTask) {
        throw new Error(`Task with id ${id} not found`);
    }
    await db.delete('task', id);
    return deletedTask;
};

export default {
    create,
    getAll,
    update,
    remove,
};
