import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Button from "../ui/Button";

interface OnboardingProps {
  onGetStarted: () => void;
}

const Onboarding = ({ onGetStarted }: OnboardingProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-dvh flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-base-100 to-base-200"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          <motion.div
            variants={imageVariants}
            className="flex-1 flex justify-center"
          >
            <img
              src="/image/onboarding.png"
              alt="Task Management App"
              className="w-64 sm:w-80 md:w-full max-w-sm lg:max-w-md object-contain"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-1 text-center md:text-right"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 justify-center md:justify-start mb-4"
            >
              <CheckCircle className="text-primary w-8 h-8" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content">
                اپ مدیریت تسک ها
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base-content/70 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8"
            >
              این ابزار کارآمد به گونه‌ای طراحی شده است که به شما کمک کند وظایف
              خود را به راحتی و در سطح پروژه مدیریت کنید!
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                title="شروع کنید"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Onboarding;
