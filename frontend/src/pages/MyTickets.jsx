import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/tickets`);
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
        <div className="flex items-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-2xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
          >
            Back
          </button>

          <h1 className="text-4xl font-bold">
            My Tickets
          </h1>
        </div>

        <div className="flex flex-col gap-5">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-gray-900 border border-gray-700 p-6 rounded-2xl"
            >
              <div className="flex justify-between items-center gap-4">
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

              <div className="flex justify-between items-center mt-5 gap-4">
                <div className="text-sm text-gray-400">
                  <p>Category: {ticket.category}</p>
                  <p>Product: {ticket.productName || "Not provided"}</p>
                  <p>Company: {ticket.companyName || "Not provided"}</p>
                  <p>Company phone: {ticket.companyPhone || "Not provided"}</p>
                  <p>Company WhatsApp: {ticket.companyWhatsApp || "Not provided"}</p>
                </div>

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
