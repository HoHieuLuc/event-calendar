export interface Task {
    id?: number;
    title: string;
    content: string;
    start: Date;
    end: Date;
    done: boolean;
    color: string;
}

export interface TaskForm {
    title: string;
    content: string;
    startDate: Date;
    startTime: Date;
    finishDate: Date;
    finishTime: Date;
    done: boolean;
    color: string;
}

export type CreateTaskVars = Omit<Task, 'id'>;

export interface UpdateTaskVars extends Task {
    id: number;
};
