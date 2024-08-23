export interface TaskModel {
    userId: number|null,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    state: string
}