import { motion } from 'framer-motion';
interface TaskItemProps {
  task: TaskProps;
  onCompleted: Function;
  onDelete: Function;
}

export const TaskItem = ({ task, onCompleted, onDelete }: TaskItemProps) => (
  <motion.div
    initial={{ opacity: 0, translateX: -100 }}
    animate={{ opacity: 1, translateX: 0 }}
    exit={{ opacity: 0, translateX: 100 }}
    className="flex justify-between gap-2 py-4 border-b-[1px]"
  >
    <div>
      <p className="text-xs text-gray-400">{task?.created}</p>
      <p className="tex-lg">{task?.task}</p>
    </div>

    {task?.isCompleted && <i className="text-green-600 ri-check-fill"></i>}

    {!task?.isCompleted && (
      <div className="flex items-center gap-3">
        <button onClick={() => onCompleted(task?.id)} className="p-3 w-[6em] text-sm text-white bg-green-600 rounded">
          Done
        </button>
        <button onClick={() => onDelete(task?.id)} className="p-3 w-[6em] text-sm text-white bg-red-600 rounded">
          Delete
        </button>
      </div>
    )}
  </motion.div>
);
