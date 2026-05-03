import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface OnboardingProps {
  onGetStarted: () => void;
}

function Onboarding({ onGetStarted }: OnboardingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 bg-base-200"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-primary-content" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold mb-3 text-primary-content"
        >
          بیا شروع کنیم!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 text-neutral"
        >
          مدیریت تسک‌ها رو شروع کن. <br />
          همه کارهات رو مرتب کن و بهشون برس!
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
          className="px-8 py-3 rounded-xl font-medium transition-all btn btn-primary"
        >
          شروع کن
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Onboarding;
