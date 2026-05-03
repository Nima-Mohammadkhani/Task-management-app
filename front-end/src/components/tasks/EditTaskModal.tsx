import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useUpdateTaskMutation } from "../../redux/service/tasks";
import { Task } from "../../types/task";
import Modal from "../ui/Modal";
import BottomSheet from "../ui/BottomSheet";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface EditTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

function EditTask({ isOpen, onClose, task }: EditTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (task && isOpen) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task, isOpen]);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSave = useCallback(async () => {
    if (!title.trim()) {
      toast.error("عنوان تسک نمی‌تواند خالی باشد");
      titleInputRef.current?.focus();
      return;
    }

    try {
      await updateTask({
        id: task!.id,
        title: title.trim(),
        description: description.trim() || undefined,
      }).unwrap();
      toast.success("تسک با موفقیت ویرایش شد");
      onClose();
    } catch {
      toast.error("خطا در ویرایش تسک");
    }
  }, [title, description, updateTask, task, onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
    },
    [handleSave],
  );

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
    },
    [],
  );

  const FormContent = (
    <div
      className="space-y-4"
      onKeyDown={handleKeyDown}
      onClick={handleModalClick}
    >
      <Input
        ref={titleInputRef}
        label="عنوان تسک *"
        value={title}
        onChange={handleTitleChange}
        placeholder="مثال: یادگیری Next.js"
        containerClassName="w-full"
        inputClassName="rounded-xl"
      />

      <Input
        ref={descriptionInputRef}
        label="توضیحات (اختیاری)"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="توضیحات بیشتر درباره تسک..."
        multiline
        rows={4}
        containerClassName="w-full"
        inputClassName="rounded-xl resize-none"
      />

      <div className="flex gap-3 pt-2">
        <Button
          title="انصراف"
          onClick={onClose}
          className="btn btn-ghost flex-1 rounded-xl"
        />
        <Button
          title={isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          onClick={handleSave}
          disabled={isLoading}
          className="btn btn-primary flex-1 rounded-xl"
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        <div className="px-4 pb-6 pt-2">{FormContent}</div>
      </BottomSheet>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-base-content">
              ✏️ ویرایش تسک
            </h2>
            <button
              onClick={onClose}
              className="btn btn-sm btn-ghost btn-circle"
            >
              ✕
            </button>
          </div>
          {FormContent}
        </motion.div>
      </div>
    </Modal>
  );
}

export default EditTask;
