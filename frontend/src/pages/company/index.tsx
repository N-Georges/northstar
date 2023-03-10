import Sidebar from "@/components/common/navigation/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex w-full items-center justify-center bg-gray-50">
        <p className="text-5xl">Dashboard company</p>
      </div>
    </div>
  );
};

export default Dashboard;
