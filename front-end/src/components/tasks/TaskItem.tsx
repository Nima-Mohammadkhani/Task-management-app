import { motion } from "framer-motion";
import { Trash2, Circle, CheckCircle } from "lucide-react";

import { Task } from "../../types/task";
import { toast } from "react-toastify";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/service/tasks";

interface TaskItemProps {
  task: Task;
  index: number;
}

function TaskItem({ task, index }: TaskItemProps) {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const handleToggle = async () => {
    try {
      await updateTask({ id: task.id, isDone: !task.isDone }).unwrap();
    } catch {
      toast.error("خطا در بروزرسانی");
    }
  };

  const handleDelete = async () => {
    if (confirm("آیا از حذف این تسک مطمئن هستی؟")) {
      try {
        await deleteTask(task.id).unwrap();
        toast.success("تسک حذف شد");
      } catch {
        toast.error("خطا در حذف تسک");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      whileHover={{ scale: 1.01 }}
      className="card bg-base-100 shadow-sm rounded-xl mb-3 hover:shadow-md transition-all"
    >
      <div className="card-body p-4">
        <div className="flex items-start gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggle}
            disabled={isUpdating}
            className="mt-0.5"
          >
            {task.isDone ? (
              <CheckCircle size={22} className="text-success" />
            ) : (
              <Circle size={22} className="text-warning" />
            )}
          </motion.button>

          <div className="flex-1">
            <h3
              className={`font-medium ${task.isDone ? "line-through text-neutral" : "text-base-content"}`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-neutral mt-1">{task.description}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-error hover:text-error/80 transition-colors"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
