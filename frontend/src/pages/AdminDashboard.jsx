import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [tickets, setTickets] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchTickets = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tickets"
      );

      setTickets(res.data.tickets);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchTickets();

  }, []);

  const logoutHandler = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(

        `http://localhost:5000/api/tickets/${id}`,

        { status }
      );

      fetchTickets();

    } catch (error) {

      console.log(error);
    }
  };

  const deleteTicket = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/tickets/${id}`
      );

      fetchTickets();

    } catch (error) {

      console.log(error);
    }
  };

  const filteredTickets =
    tickets.filter((ticket) =>

      ticket.userIssue
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalTickets =
    tickets.length;

  const solvedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Solved"
    ).length;

  const highPriority =
    tickets.filter(
      (ticket) =>
        ticket.priority === "High"
    ).length;

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Admin Dashboard 👨‍💻
          </h1>

          <p className="text-gray-400 mt-2">
            AI Powered Support System
          </p>

        </div>

        <button
          onClick={logoutHandler}
          className="bg-red-500 px-5 py-2 rounded-xl"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold">
            Total Tickets
          </h2>

          <p className="text-5xl mt-4 font-bold">
            {totalTickets}
          </p>

        </div>

        <div className="bg-gradient-to-r from-red-600 to-pink-600 p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold">
            High Priority
          </h2>

          <p className="text-5xl mt-4 font-bold">
            {highPriority}
          </p>

        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold">
            Solved Tickets
          </h2>

          <p className="text-5xl mt-4 font-bold">
            {solvedTickets}
          </p>

        </div>

      </div>

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700 outline-none"
        />

      </div>

      <div className="flex flex-col gap-5">

        {filteredTickets.map((ticket) => (

          <div
            key={ticket._id}
            className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-xl"
          >

            <div className="flex justify-between items-center flex-wrap gap-4">

              <div>

                <h2 className="text-2xl font-bold">
                  {ticket.userIssue}
                </h2>

                <p className="text-gray-300 mt-2">
                  {ticket.summary}
                </p>

              </div>

              <span className="bg-blue-500 px-4 py-2 rounded-full">
                {ticket.priority}
              </span>

            </div>

            <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

              <div className="flex gap-3 flex-wrap">

                <button
                  onClick={() =>
                    updateStatus(
                      ticket._id,
                      "Pending"
                    )
                  }
                  className="bg-yellow-500 px-4 py-2 rounded-xl"
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      ticket._id,
                      "In Progress"
                    )
                  }
                  className="bg-blue-500 px-4 py-2 rounded-xl"
                >
                  In Progress
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      ticket._id,
                      "Solved"
                    )
                  }
                  className="bg-green-600 px-4 py-2 rounded-xl"
                >
                  Solved
                </button>

              </div>

              <div className="flex gap-3">

                <span className="bg-purple-600 px-4 py-2 rounded-full">
                  {ticket.status}
                </span>

                <button
                  onClick={() =>
                    deleteTicket(
                      ticket._id
                    )
                  }
                  className="bg-red-600 px-4 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminDashboard;