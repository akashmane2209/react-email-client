import { cn } from "@/utils/helpers";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-300", className)}
      {...props}
    />
  );
}

export default Skeleton;
