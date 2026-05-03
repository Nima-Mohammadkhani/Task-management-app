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
      className="h-dvh flex flex-col justify-center items-center w-full px-4 bg-base-200"
    >
      <div className="flex flex-col justify-center w-full max-w-2xl">
        <TaskForm />

        <TaskList />
      </div>
    </motion.div>
  );
}

export default HomePage;
