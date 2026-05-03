import { motion } from "framer-motion";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

function HomePage() {
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
