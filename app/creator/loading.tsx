import Loader from "@/components/app/ui/Loader";

function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Loader size={60} />
    </div>
  );
}

export default Loading;
