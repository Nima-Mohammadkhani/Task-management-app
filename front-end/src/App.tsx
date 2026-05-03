import { BrowserRouter, useRoutes } from "react-router-dom";
import PWABadge from "./PWABadge.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/errorFallback.tsx";
import routes from "virtual:generated-pages-react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Onboarding from "./components/onboarding/Onboarding.tsx";
import { Sun, Moon } from "lucide-react";

function AppRoutes() {
  return useRoutes(routes);
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "pastel";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "pastel" ? "pastel-dark" : "pastel");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 z-50 btn btn-sm btn-circle shadow-lg backdrop-blur-sm bg-base-100/80"
      aria-label="تغییر تم"
    >
      {theme === "pastel" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const hasSeen = localStorage.getItem("hasSeenOnboarding");
    return !hasSeen;
  });

  const handleGetStarted = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  return (
    <BrowserRouter>
      <ThemeToggle />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AnimatePresence mode="wait">
          {showOnboarding ? (
            <Onboarding key="onboarding" onGetStarted={handleGetStarted} />
          ) : (
            <AppRoutes />
          )}
        </AnimatePresence>
      </ErrorBoundary>
      <PWABadge />
    </BrowserRouter>
  );
}

export default App;
