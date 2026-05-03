import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MotiView } from "moti";
import Toast from 'react-native-toast-message';
import { useUpdateTaskMutation } from "@/redux/service/tasks";
import { Task } from "../../types/task";
import { X } from "lucide-react-native";

interface EditTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

function EditTask({ isOpen, onClose, task }: EditTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  useEffect(() => {
    if (task && isOpen) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task, isOpen]);

  const handleSave = useCallback(async () => {
    if (!title.trim()) {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "عنوان تسک نمی‌تواند خالی باشد",
      });
      return;
    }

    try {
      await updateTask({
        id: task!.id,
        title: title.trim(),
        description: description.trim() || undefined,
      }).unwrap();
      Toast.show({
        type: "success",
        text1: "موفق",
        text2: "تسک با موفقیت ویرایش شد",
      });
      onClose();
    } catch {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "خطا در ویرایش تسک",
      });
    }
  }, [title, description, updateTask, task, onClose]);

  const FormContent = () => (
    <View className="space-y-4">
      <View>
        <Text className="text-sm font-medium text-base-content mb-2">
          عنوان تسک *
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="مثال: یادگیری Next.js"
          placeholderTextColor="#9CA3AF"
          className="border border-gray-200 rounded-xl px-4 py-3 bg-base-100 text-base-content"
          style={{ textAlign: "right" }}
          autoFocus
        />
      </View>

      <View>
        <Text className="text-sm font-medium text-base-content mb-2">
          توضیحات (اختیاری)
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="توضیحات بیشتر درباره تسک..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          className="border border-gray-200 rounded-xl px-4 py-3 bg-base-100 text-base-content"
          style={{ textAlign: "right", textAlignVertical: "top" }}
        />
      </View>

      <View className="flex-row gap-3 pt-2">
        <TouchableOpacity
          onPress={onClose}
          className="flex-1 rounded-xl py-3 border border-gray-200 items-center"
        >
          <Text className="text-base-content">انصراف</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          className={`flex-1 bg-primary rounded-xl py-3 items-center ${isLoading ? "opacity-50" : ""}`}
        >
          <Text className="text-primary-content font-medium">
            {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-black/50 justify-end md:justify-center"
      >
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />

        <MotiView
          from={{ translateY: 100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: 100, opacity: 0 }}
          transition={{ type: "timing", duration: 300 }}
          className="bg-base-100 rounded-t-2xl md:rounded-2xl md:mx-4 md:mb-4 overflow-hidden"
        >
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <Text className="text-xl font-bold text-base-content">
              ✏️ ویرایش تسک
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
            <FormContent />
          </ScrollView>
        </MotiView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default EditTask;