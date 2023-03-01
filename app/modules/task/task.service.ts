import request from '~/helpers/request';

interface Task {
  id: string;
  isCompleted: boolean;
  task: string;
  created: string;
  updated: string;
}

interface ApiResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Task[];
}

// create new task
const newTaskService = async (task: { task: string }) => {
  return await request.post(task);
};

// select tasks
const selectTasksService = async (): Promise<ApiResponse> => {
  return await request.get();
};

// update task
const updateTaskService = async (id: string, task: { isCompleted: boolean }) => {
  return await request.patch(id, task);
};

// delete task
const deleteTaskService = async (id: string) => {
  return await request.delete(id);
};

const TaskService = {
  newTaskService,
  selectTasksService,
  updateTaskService,
  deleteTaskService,
};

export default TaskService;
