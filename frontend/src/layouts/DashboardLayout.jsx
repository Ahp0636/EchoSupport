import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

const DashboardLayout = ({
  children,
}) => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logoutHandler = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  const activeClass =
    "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl";

  const normalClass =
    "bg-gray-900 hover:bg-gray-800 text-gray-300";

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white flex">

      <div className="w-[320px] shrink-0 bg-black/40 backdrop-blur-xl border-r border-gray-800 px-7 py-6 flex flex-col justify-between shadow-2xl">

        <div>

          <div className="mb-10">

            <h1 className="text-[2.35rem] leading-tight font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent whitespace-nowrap">

              EchoSupport

            </h1>

            <p className="text-gray-400 mt-2 text-[0.95rem] leading-relaxed">
              AI Powered Support Platform
            </p>

          </div>

          <div className="flex flex-col gap-4">

            {user?.role ===
            "admin" ? (

              <>

                <Link
                  to="/admin"
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    location.pathname ===
                    "/admin"
                      ? activeClass
                      : normalClass
                  }`}
                >
                  👨‍💻 Admin Dashboard
                </Link>

              </>

            ) : (

              <>

                <Link
                  to="/dashboard"
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    location.pathname ===
                    "/dashboard"
                      ? activeClass
                      : normalClass
                  }`}
                >
                  🏠 Dashboard
                </Link>

                <Link
                  to="/create-ticket"
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    location.pathname ===
                    "/create-ticket"
                      ? activeClass
                      : normalClass
                  }`}
                >
                  🎫 Create Ticket
                </Link>

                <Link
                  to="/my-tickets"
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    location.pathname ===
                    "/my-tickets"
                      ? activeClass
                      : normalClass
                  }`}
                >
                  📋 My Tickets
                </Link>

                <Link
                  to="/ai-chat"
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    location.pathname ===
                    "/ai-chat"
                      ? activeClass
                      : normalClass
                  }`}
                >
                  🤖 AI Assistant
                </Link>

              </>
            )}

            <Link
              to="/profile"
              className={`p-4 rounded-2xl transition-all duration-300 ${
                location.pathname ===
                "/profile"
                  ? activeClass
                  : normalClass
              }`}
            >
              👤 Profile
            </Link>

          </div>

        </div>

        <div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-5">

            <p className="text-sm text-gray-400">
              Logged in as
            </p>

            <h2 className="text-lg font-bold mt-1">
              {user?.name}
            </h2>

            <span className="inline-block mt-3 bg-blue-600 px-4 py-1 rounded-full text-sm uppercase">

              {user?.role}

            </span>

          </div>

          <button
            onClick={logoutHandler}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 p-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="flex-1 p-10 overflow-y-auto">

        {children}

      </div>

    </div>
  );
};

export default DashboardLayout;
