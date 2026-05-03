import { View, Text, Image, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { CheckCircle } from "lucide-react-native";

interface OnboardingProps {
  onGetStarted: () => void;
}

const Onboarding = ({ onGetStarted }: OnboardingProps) => {
  return (
    <View className="flex-1 items-center justify-center px-4 md:px-8 bg-gradient-to-br from-base-100 to-base-200">
      <View className="w-full max-w-6xl">
        <View className="items-center gap-8 md:gap-12 lg:gap-16">
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 600 }}
            className="items-center"
          >
            <Image
              source={require("../assets/images/onboarding.png")}
              className="w-64 sm:w-80 md:w-full max-w-sm lg:max-w-md"
              style={{ width: 256, height: 256, resizeMode: "contain" }}
            />
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500, delay: 200 }}
            className="items-center md:items-end"
          >
            <MotiView
              from={{ opacity: 0, translateY:10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 400 }}
              className="flex-row items-center gap-2 mb-4"
            >
              <CheckCircle size={32} color="#FDE047" />
              <Text className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content">
                اپ مدیریت تسک ها
              </Text>
            </MotiView>

            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 600 }}
            >
              <Text className="text-base-content/70 text-sm md:text-base lg:text-lg text-center md:text-right leading-relaxed mb-6 md:mb-8">
                این ابزار کارآمد به گونه‌ای طراحی شده است که به شما کمک کند
                وظایف خود را به راحتی و در سطح پروژه مدیریت کنید!
              </Text>
            </MotiView>

            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 800, type: "spring" }}
            >
              <TouchableOpacity
                onPress={onGetStarted}
                className="bg-primary px-6 py-3 rounded-lg shadow-md"
                activeOpacity={0.8}
              >
                <Text className="text-black/80 font-semibold text-center">
                  شروع کنید
                </Text>
              </TouchableOpacity>
            </MotiView>
          </MotiView>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
