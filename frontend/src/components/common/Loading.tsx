import { Loader2 } from "tabler-icons-react";
const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 strokeWidth={2} className="mr-2 inline h-4 w-4 animate-spin text-white" />
      <span>Loading</span>
    </div>
  );
};

export default Loading;
