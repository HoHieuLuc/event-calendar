import { DBSchema, openDB } from 'idb';

import { Task } from '~/core/task/task.type';

interface EventCalendarDB extends DBSchema {
    'task': {
        key: number;
        value: Task;
    }
}

export const dbPromise = openDB<EventCalendarDB>('event-calendar', 1, {
    upgrade(db) {
        !db.objectStoreNames.contains('task') && db.createObjectStore(
            'task',
            {
                autoIncrement: true,
                keyPath: 'id',
            }
        );
    }
});
