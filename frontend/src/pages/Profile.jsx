import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logoutHandler = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <DashboardLayout>

    <div className="min-h-screen bg-black text-white flex justify-center items-center p-8">

      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-10 w-full max-w-lg shadow-2xl">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">

            {user?.name?.charAt(0)}

          </div>

          <h1 className="text-4xl font-bold mt-6">
            {user?.name}
          </h1>

          <p className="text-gray-400 mt-2">
            {user?.email}
          </p>

          <span className="mt-4 bg-blue-600 px-5 py-2 rounded-full text-sm uppercase">
            {user?.role}
          </span>

        </div>

        <div className="mt-10 flex flex-col gap-4">

          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl font-bold"
          >
            Edit Profile
          </button>

          <button
            onClick={logoutHandler}
            className="bg-red-600 p-4 rounded-xl font-bold"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
    </DashboardLayout>

  );
};

export default Profile;