import PWABadge from "./PWABadge.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/errorFallback.tsx";
import { useRoutes } from "react-router-dom";
import routes from "virtual:generated-pages-react";
function App() {
  function AppRoutes() {
    const element = useRoutes(routes);
    return element;
  }
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRoutes />
      </ErrorBoundary>
      <PWABadge />
    </>
  );
}

export default App;
