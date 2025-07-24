import {AxiosResponse} from 'axios';
import HttpService from './http-service';
import {Task} from "../models/Task";
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
}

export default TaskManagerService;
