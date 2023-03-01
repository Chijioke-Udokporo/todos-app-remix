import dayjs from 'dayjs';
import TaskService from './task.service';

const getTasks = async () => {
  try {
    const tasks = await TaskService.selectTasksService();

    tasks.items = tasks.items.map((task: any) => {
      task.created = dayjs(task.created).format('MMM DD, YYYY');
      task.updated = dayjs(task.updated).format('MMM DD,YYYY');
      return task;
    });
    return { tasks };
  } catch (error: any) {
    return { error: error.message as string };
  }
};

const newTask = async (task: string) => {
  try {
    await TaskService.newTaskService({ task });
    return { message: 'Successfully created a new task' };
  } catch (error: any) {
    return { error: error.message as string };
  }
};

const updateTask = async (id: string) => {
  try {
    await TaskService.updateTaskService(id, { isCompleted: true });
    return { message: 'Successfully updated task' };
  } catch (error: any) {
    return { error: error.message as string };
  }
};

const deleteTask = async (id: string) => {
  try {
    await TaskService.deleteTaskService(id);
    return { message: 'Successfully deleted task' };
  } catch (error: any) {
    return { error: error.message as string };
  }
};

const TaskController = {
  getTasks,
  newTask,
  updateTask,
  deleteTask,
};

export default TaskController;
