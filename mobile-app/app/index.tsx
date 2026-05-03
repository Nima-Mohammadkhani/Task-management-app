import { View, SafeAreaView, ScrollView } from "react-native";
import { MotiView } from "moti";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-base-200">
      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="flex-grow justify-center items-center"
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "timing", duration: 300 }}
          className="flex-1 justify-center w-full"
        >
          <View className="justify-center w-full max-w-2xl">
            <TaskForm />
            <TaskList />
          </View>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomePage;
