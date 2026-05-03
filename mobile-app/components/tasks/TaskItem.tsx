import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MotiView } from "moti";
import { Trash2, Circle, CheckCircle, Pencil } from "lucide-react-native";
import { Task } from "../../types/task";
import Toast from "react-native-toast-message";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/service/tasksApi";
import EditTask from "./EditTaskModal";

interface TaskItemProps {
  task: Task;
  index: number;
}

function TaskItem({ task, index }: TaskItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const handleToggle = async () => {
    try {
      await updateTask({ id: task.id, isDone: !task.isDone }).unwrap();
    } catch {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "خطا در بروزرسانی",
      });
    }
  };

  const handleDelete = () => {
    Alert.alert("حذف تسک", "آیا از حذف این تسک مطمئن هستی؟", [
      { text: "انصراف", style: "cancel" },
      {
        text: "حذف",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(task.id).unwrap();
            Toast.show({
              type: "success",
              text1: "موفق",
              text2: "تسک حذف شد",
            });
          } catch {
            Toast.show({
              type: "error",
              text1: "خطا",
              text2: "خطا در حذف تسک",
            });
          }
        },
      },
    ]);
  };

  return (
    <>
      <MotiView
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: 20 }}
        transition={{
          delay: index * 50,
          type: "timing",
          duration: 200,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsEditModalOpen(true)}
          className="card bg-base-100 shadow-sm rounded-xl mb-3 overflow-hidden"
        >
          <View className="p-4">
            <View className="flex-row items-start gap-3">
              <TouchableOpacity
                onPress={handleToggle}
                disabled={isUpdating}
                className="mt-0.5"
                activeOpacity={0.7}
              >
                {task.isDone ? (
                  <CheckCircle size={22} color="#86EFAC" />
                ) : (
                  <Circle size={22} color="#FDE047" />
                )}
              </TouchableOpacity>

              <View className="flex-1">
                <Text
                  className={`font-medium ${
                    task.isDone
                      ? "line-through text-neutral"
                      : "text-base-content"
                  }`}
                >
                  {task.title}
                </Text>
                {task.description && (
                  <Text className="text-sm text-neutral mt-1">
                    {task.description}
                  </Text>
                )}
              </View>

              <View className="flex-row gap-1">
                <TouchableOpacity
                  onPress={() => setIsEditModalOpen(true)}
                  className="p-1"
                  activeOpacity={0.7}
                >
                  <Pencil size={18} color="#60A5FA" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDelete}
                  disabled={isDeleting}
                  className="p-1"
                  activeOpacity={0.7}
                >
                  <Trash2 size={18} color="#FCA5A5" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </MotiView>

      <EditTask
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />
    </>
  );
}

export default TaskItem;
