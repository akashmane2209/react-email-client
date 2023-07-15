import Skeleton from "../Skeleton";

const Loader = () => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="mt-10 space-y-2">
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
      </div>
      <div className="mt-10 space-y-2">
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
        <Skeleton className="w-full h-2" />
      </div>
    </div>
  );
};

export default Loader;
