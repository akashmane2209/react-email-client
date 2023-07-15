import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="flex items-center justify-center h-screen p-12 bg-gray-200">
        <div className="rounded-md bg-background  text-foreground w-full max-h-[calc(100vh-6rem)] overflow-hidden">
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default MainLayout;
