import { cn } from "@/lib/utils";

const skeleton = "bg-gray-200 animate-pulse rounded-lg";

const SearchBarFallback = () => {
  return (
    <div className="flex border border-gray-200 rounded-lg animate-pulse py-3 px-4 gap-4 items-center justify-start w-1/4">
      <div className={cn(skeleton, "h-5 w-5")}></div>
      <div className={cn(skeleton, "h-5 w-full")}></div>
    </div>
  );
};

export default SearchBarFallback;
