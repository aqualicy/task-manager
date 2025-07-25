import {AxiosResponse} from 'axios';
import HttpService from './http-service';
import {Task, TaskStatus} from "../models/Task";
/**
 * A RESTful HTTP service
 */
class TaskManagerService {
  private service: HttpService;

  /**
   * Constructs a TaskManagerService object
   */
  constructor() {
    this.service = new HttpService();
  }

  /**
   * Get tasks
   * @returns {Promise<AxiosResponse>} a promise object that can be subscribed to
   */
  async GetTasks(): Promise<AxiosResponse<Task[]>> {
    return this.service.get(``, {
      logProps: { name: 'GetTasks' },
    });
  }

  /**
   * Add task
   * @returns {Promise<AxiosResponse>} a promise object that can be subscribed to
   */
  async AddTask(
    task: Task,
  ): Promise<AxiosResponse<Task>> {
    return this.service.post(``, task, {
      logProps: {
        name: 'AddTask',
        metadata: { task },
      },
    });
  }

  /**
   * Delete task
   * @returns {Promise<AxiosResponse>} a promise object that can be subscribed to
   */
  async DeleteTask(
      id: string,
  ): Promise<AxiosResponse<Task>> {
    return this.service.delete(`/${id}`, {
      logProps: {
        name: 'DeleteTask',
        metadata: { id },
      },
    });
  }

  /**
   * Update task
   * @returns {Promise<AxiosResponse>} a promise object that can be subscribed to
   */
  async UpdateTask(
      task: Task,
  ): Promise<AxiosResponse<Task>> {
    return this.service.put(`/${task.id}`, task, {
      logProps: {
        name: 'UpdateTask',
        metadata: { task },
      },
    });
  }

  /**
   * Update task
   * @returns {Promise<AxiosResponse>} a promise object that can be subscribed to
   */
  async UpdateTaskStatus(
      id: string,
      status: string,
  ): Promise<AxiosResponse<Task>> {
    return this.service.patch(`/${id}/status`, {status: status}, {
      logProps: {
        name: 'UpdateTaskStatus',
        metadata: { id, status },
      },
    });
  }
}

export default TaskManagerService;
