import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCreateTaskMutation } from "../../redux/service/tasks";
import { toast } from "react-toastify";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("عنوان تسک نمی‌تواند خالی باشد");
      return;
    }

    try {
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
      }).unwrap();
      setTitle("");
      setDescription("");
      toast.success("تسک با موفقیت اضافه شد");
    } catch {
      toast.error("خطا در ایجاد تسک");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card bg-base-100 shadow-xl mb-6 rounded-2xl">
        <div className="card-body p-5">
          <h2 className="card-title text-base-content mb-2 text-lg">
           تسک جدید
          </h2>

          <input
            type="text"
            placeholder="عنوان تسک (اجباری)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            className="input input-bordered w-full bg-base-100 rounded-xl mb-3"
          />

          <textarea
            placeholder="توضیحات (اختیاری)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            rows={3}
            className="textarea textarea-bordered w-full bg-base-100 rounded-xl mb-4 resize-none"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn btn-primary rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            {isLoading ? "در حال افزودن..." : "افزودن تسک"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskForm;
