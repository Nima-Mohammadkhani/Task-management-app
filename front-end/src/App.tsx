import PWABadge from "./PWABadge.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/errorFallback.tsx";
function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
      <PWABadge />
    </>
  );
}

export default App;
