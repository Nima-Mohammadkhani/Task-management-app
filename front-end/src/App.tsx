import { BrowserRouter, useRoutes } from "react-router-dom";
import PWABadge from "./PWABadge.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/errorFallback.tsx";
import routes from "virtual:generated-pages-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Onboarding from "./components/onboarding/Onboarding.tsx";

function AppRoutes() {
  return useRoutes(routes);
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
