import { motion } from "framer-motion";
import { useGetTasksQuery } from "../redux/service/tasks";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

function HomePage() {
  const { data: tasks = [] } = useGetTasksQuery();
  const doneCount = tasks.filter((t) => t.isDone).length;
  const totalCount = tasks.length;
  const percent =
    totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 bg-base-200"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card bg-primary rounded-2xl p-5 mb-6 shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold mb-1 text-primary-content">
                سلام! 👋
              </h1>
              <p className="text-sm text-primary-content/80">
                از {totalCount} تسک، {doneCount} تاش تموم شده
              </p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-right"
            >
              <span className="text-2xl font-bold text-primary-content">
                {percent}%
              </span>
            </motion.div>
          </div>

          <div className="w-full bg-primary-content/20 rounded-full h-2 mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-2 rounded-full bg-primary-content"
            />
          </div>
        </motion.div>

        <TaskForm />

        <TaskList />
      </div>
    </motion.div>
  );
}

export default HomePage;
