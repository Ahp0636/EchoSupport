import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const MyTickets = () => {

  const [tickets, setTickets] =
    useState([]);

  const fetchTickets = async () => {

    try {

      const res = await axios.get(
        "https://echo-support-backend.onrender.com/api/tickets"
      );

      setTickets(res.data.tickets);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchTickets();

  }, []);

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-10">
        My Tickets 🎫
      </h1>

      <div className="flex flex-col gap-5">

        {tickets.map((ticket) => (

          <div
            key={ticket._id}
            className="bg-gray-900 border border-gray-700 p-6 rounded-2xl"
          >

            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                {ticket.userIssue}
              </h2>

              <span className="bg-blue-500 px-4 py-1 rounded-full">
                {ticket.priority}
              </span>

            </div>

            <p className="text-gray-300 mt-4">
              {ticket.summary}
            </p>

            <div className="flex justify-between items-center mt-5">

              <p className="text-sm text-gray-400">
                Category: {ticket.category}
              </p>

              <span className="bg-green-600 px-4 py-1 rounded-full">
                {ticket.status}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>

    </DashboardLayout>
  );
};

export default MyTickets;