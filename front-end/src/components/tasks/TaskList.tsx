import { motion, AnimatePresence } from "framer-motion";
import { useGetTasksQuery } from "../../redux/service/tasks";
import TaskItem from "./TaskItem";

function TaskList() {
  const { data: tasks = [], isLoading, isError, refetch } = useGetTasksQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card bg-error/10 rounded-xl p-6 text-center"
      >
        <p className="text-error mb-3">خطا در دریافت اطلاعات</p>
        <button onClick={refetch} className="btn btn-primary btn-sm">
          تلاش مجدد
        </button>
      </motion.div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 shadow-xl rounded-xl p-8 text-center"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-3"
        >
          ✨
        </motion.div>
        <h3 className="font-medium text-base-content mb-1">
          هیچ تسکی وجود نداره
        </h3>
        <p className="text-sm text-neutral">اولین تسکت رو اضافه کن!</p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-base-content">لیست تسک‌ها</h2>
        <span className="text-sm text-neutral">{tasks.length} مورد</span>
      </div>

      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;
