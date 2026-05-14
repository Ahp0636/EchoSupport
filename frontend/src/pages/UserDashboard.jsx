import DashboardLayout from "../layouts/DashboardLayout";

const UserDashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <DashboardLayout>

      <div>

        <h1 className="text-5xl font-bold text-white">
          Welcome,
          {" "}
          {user?.name} 👋
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          AI Powered Customer Support Dashboard
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl shadow-2xl">

            <h2 className="text-2xl font-bold">
              Create Complaint
            </h2>

            <p className="mt-3 text-gray-200">
              Submit support request
            </p>

          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-3xl shadow-2xl">

            <h2 className="text-2xl font-bold">
              Track Tickets
            </h2>

            <p className="mt-3 text-gray-200">
              Monitor issue progress
            </p>

          </div>

          <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-8 rounded-3xl shadow-2xl">

            <h2 className="text-2xl font-bold">
              AI Support
            </h2>

            <p className="mt-3 text-gray-200">
              Get smart assistance
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default UserDashboard;