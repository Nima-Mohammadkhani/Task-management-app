import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return (
    <div className="p-4 bg-red-100 text-red-700 shadow rounded">
      <h2 className="font-bold text-lg">مشکلی در اجرای برنامه پیش آمد!</h2>
      <p className="mt-2">
        لطفاً در صورتی که مشکل ادامه داشت، با پشتیبانی تماس بگیرید.
      </p>
      <p className="mt-3 text-xs text-gray-600">
        کد خطا: <span className="font-mono">{errorMessage}</span>
      </p>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          تلاش مجدد
        </button>
      )}
    </div>
  );
};

export default ErrorFallback;
