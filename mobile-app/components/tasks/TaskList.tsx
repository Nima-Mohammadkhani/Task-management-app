import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { useGetTasksQuery } from "@/redux/service/tasks";
import TaskItem from './TaskItem';

function TaskList() {
  const { data: tasks = [], isLoading, isError, refetch } = useGetTasksQuery();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center py-12">
        <ActivityIndicator size="large" color="#FDE047" />
      </View>
    );
  }

  if (isError) {
    return (
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 300 }}
        className="card bg-error/10 rounded-xl p-6 items-center"
      >
        <Text className="text-error mb-3">خطا در دریافت اطلاعات</Text>
        <TouchableOpacity onPress={refetch} className="btn btn-primary btn-sm px-4 py-2 rounded-lg">
          <Text className="text-primary-content">تلاش مجدد</Text>
        </TouchableOpacity>
      </MotiView>
    );
  }

  if (tasks.length === 0) {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 300 }}
        className="card bg-base-100 shadow-xl rounded-xl p-8 items-center"
      >
        <MotiView
          animate={{ translateY: [0, -5, 0] }}
          transition={{ type: 'timing', duration: 2000, repeat: Infinity }}
        >
          <Text className="text-5xl mb-3">✨</Text>
        </MotiView>
        <Text className="font-medium text-base-content mb-1">
          هیچ تسکی وجود نداره
        </Text>
        <Text className="text-sm text-neutral">اولین تسکت رو اضافه کن!</Text>
      </MotiView>
    );
  }

  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-semibold text-base-content">لیست تسک‌ها</Text>
        <Text className="text-sm text-neutral">{tasks.length} مورد</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

export default TaskList;