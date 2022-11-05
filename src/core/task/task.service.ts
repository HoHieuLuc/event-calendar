import { CreateTaskVars, Task, UpdateTaskVars } from './task.type';

const getAll = () => {
    return new Promise<Array<Task>>((resolve) => {
        const data = JSON.parse(
            localStorage.getItem('tasks') || '[]'
        ) as Array<Task>;
        resolve(data);
    });
};

const create = (payload: CreateTaskVars) => {
    return new Promise<Task>((resolve) => {
        const newTask: Task = {
            ...payload,
            id: new Date().getTime(),
        };
        const tasks = JSON.parse(
            localStorage.getItem('tasks') || '[]'
        ) as Array<Task>;
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
        resolve(newTask);
    });
};

const update = (payload: UpdateTaskVars) => {
    return new Promise<Task>((resolve) => {
        const data = JSON.parse(
            localStorage.getItem('tasks') || '[]'
        ) as Array<Task>;
        const newData = data.map<Task>((task) => {
            return task.id === payload.id ? payload : task;
        });
        localStorage.setItem('tasks', JSON.stringify(newData));
        resolve(payload);
    });
};

const remove = (id: number) => {
    return new Promise<void>((resolve) => {
        const data = JSON.parse(
            localStorage.getItem('tasks') || '[]'
        ) as Array<Task>;
        const newData = data.filter((task) => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(newData));
        resolve();
    });
};

export default {
    create,
    getAll,
    update,
    remove,
};
