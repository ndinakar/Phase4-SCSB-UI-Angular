export class ScheduleJobsForm {
    jobId: number;
    jobName: string;
    jobDescription: string;
    cronExpression: string;
    scheduleType: string;
    message: string;
    errorMessage: string;
    jobEntities: string;
}