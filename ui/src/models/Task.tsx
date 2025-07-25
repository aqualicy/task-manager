export enum TaskStatus {
    TODO,
    IN_PROGRESS,
    DONE
}

export class Task {
    id!: string;

    title!: string;

    description?: string | null;

    status?: TaskStatus;
}