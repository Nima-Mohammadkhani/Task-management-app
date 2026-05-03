import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { Plus } from "lucide-react-native";
import { useCreateTaskMutation } from "../../redux/service/tasksApi";
import Toast from "react-native-toast-message";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleSubmit = async () => {
    if (!title.trim()) {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "عنوان تسک نمی‌تواند خالی باشد",
      });
      return;
    }

    try {
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
      }).unwrap();
      setTitle("");
      setDescription("");
      Toast.show({
        type: "success",
        text1: "موفق",
        text2: "تسک با موفقیت اضافه شد",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "خطا در ایجاد تسک",
      });
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300 }}
    >
      <View className="card bg-base-100 shadow-xl mb-6 rounded-2xl overflow-hidden">
        <View className="p-5">
          <Text className="card-title text-base-content mb-3 text-lg font-semibold">
            تسک جدید
          </Text>

          <TextInput
            placeholder="عنوان تسک (اجباری)"
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
            editable={!isLoading}
            className="input input-bordered w-full bg-base-100 rounded-xl mb-3 px-4 py-3"
            style={{ textAlign: "right" }}
          />

          <TextInput
            placeholder="توضیحات (اختیاری)"
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            editable={!isLoading}
            multiline
            numberOfLines={3}
            className="textarea textarea-bordered w-full bg-base-100 rounded-xl mb-4 px-4 py-3"
            style={{ textAlign: "right", textAlignVertical: "top" }}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            className={`btn btn-primary rounded-xl flex-row items-center justify-center gap-2 py-3 ${isLoading ? "opacity-50" : ""}`}
            activeOpacity={0.8}
          >
            <Plus size={18} color="#FFFFFF" />
            <Text className="text-primary-content font-medium">
              {isLoading ? "در حال افزودن..." : "افزودن تسک"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </MotiView>
  );
}

export default TaskForm;
