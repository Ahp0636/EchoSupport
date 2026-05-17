import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <DashboardLayout>

      <div className="max-w-3xl">

        <h1 className="text-5xl font-bold text-white">
          Welcome,
          {" "}
          {user?.name} 👋
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          AI Powered Customer Support Dashboard
        </p>

        <div className="flex flex-col gap-5 mt-10">

          <button
            type="button"
            onClick={() => navigate("/create-ticket")}
            className="w-full text-left bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl shadow-2xl hover:translate-x-1 hover:scale-[1.01] transition-all"
          >

            <h2 className="text-2xl font-bold">
              Create Complaint
            </h2>

            <p className="mt-3 text-gray-200">
              Submit support request
            </p>

          </button>

          <button
            type="button"
            onClick={() => navigate("/my-tickets")}
            className="w-full text-left bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-3xl shadow-2xl hover:translate-x-1 hover:scale-[1.01] transition-all"
          >

            <h2 className="text-2xl font-bold">
              Track Tickets
            </h2>

            <p className="mt-3 text-gray-200">
              Monitor issue progress
            </p>

          </button>

          <button
            type="button"
            onClick={() => navigate("/ai-chat")}
            className="w-full text-left bg-gradient-to-r from-pink-600 to-rose-600 p-8 rounded-3xl shadow-2xl hover:translate-x-1 hover:scale-[1.01] transition-all"
          >

            <h2 className="text-2xl font-bold">
              AI Support
            </h2>

            <p className="mt-3 text-gray-200">
              Get smart assistance
            </p>

          </button>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default UserDashboard;
