import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [escalationDrafts, setEscalationDrafts] = useState({});

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

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/api/tickets/${id}`, { status });
      fetchTickets();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tickets/${id}`);
      fetchTickets();
    } catch (error) {
      console.log(error);
    }
  };

  const normalizePhone = (phone) =>
    (phone || "").replace(/[^\d+]/g, "");

  const addEscalationUpdate = async (id) => {
    const note = escalationDrafts[id];

    if (!note || !note.trim()) {
      return alert("Please write an escalation update first.");
    }

    try {
      await axios.put(`${API_BASE_URL}/api/tickets/escalation/${id}`, {
        note,
        status: "Company Follow-up",
      });

      setEscalationDrafts({
        ...escalationDrafts,
        [id]: "",
      });

      fetchTickets();
    } catch (error) {
      console.log(error);
      alert("Could not save escalation update");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const searchText = [
      ticket.userIssue,
      ticket.summary,
      ticket.category,
      ticket.companyName,
      ticket.productName,
      ticket.companyPhone,
      ticket.companyWhatsApp,
      ticket.user?.name,
      ticket.user?.email,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  const totalTickets = tickets.length;
  const completedTickets = tickets.filter(
    (ticket) =>
      ticket.status === "Completed Successfully" ||
      ticket.status === "Solved"
  ).length;
  const highPriority = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  const statusButtonClass = {
    Pending: "bg-yellow-500",
    "In Progress": "bg-blue-500",
    "Completed Successfully": "bg-green-600",
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-2xl border border-gray-700 bg-gray-900 px-4 py-2 text-gray-200 hover:bg-gray-800"
          >
            Back
          </button>

          <div>
            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              AI Powered Support System
            </p>
          </div>
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
          <h2 className="text-2xl font-bold">Total Tickets</h2>
          <p className="text-5xl mt-4 font-bold">{totalTickets}</p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-pink-600 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold">High Priority</h2>
          <p className="text-5xl mt-4 font-bold">{highPriority}</p>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold">Completed Tickets</h2>
          <p className="text-5xl mt-4 font-bold">{completedTickets}</p>
        </div>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search complaints, users, products, or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700 outline-none"
        />
      </div>

      <div className="flex flex-col gap-5">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-xl"
          >
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div className="max-w-4xl">
                <h2 className="text-2xl font-bold">
                  {ticket.userIssue}
                </h2>

                <p className="text-gray-300 mt-3">
                  {ticket.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 text-sm text-gray-300">
                  <p>
                    Created by:{" "}
                    <span className="text-white font-semibold">
                      {ticket.user?.name || "Unknown user"}
                    </span>
                  </p>

                  <p>
                    User email:{" "}
                    <span className="text-white font-semibold">
                      {ticket.user?.email || "Not available"}
                    </span>
                  </p>

                  <p>Category: {ticket.category}</p>
                  <p>Product: {ticket.productName || "Not provided"}</p>
                  <p>Company: {ticket.companyName || "Not provided"}</p>
                  <p>Company email: {ticket.companyEmail || "Not provided"}</p>
                  <p>Company phone: {ticket.companyPhone || "Not provided"}</p>
                  <p>Company WhatsApp: {ticket.companyWhatsApp || "Not provided"}</p>
                </div>
              </div>

              <span className="bg-blue-500 px-4 py-2 rounded-full">
                {ticket.priority}
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-800 bg-black/30 p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h3 className="text-lg font-bold">
                  Company Escalation Timeline
                </h3>

                <span className="text-sm text-gray-400">
                  {ticket.escalationUpdates?.length || 0} updates
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {ticket.escalationUpdates?.length ? (
                  ticket.escalationUpdates.map((update, index) => (
                    <div
                      key={`${ticket._id}-${index}`}
                      className="border-l-4 border-cyan-500 bg-gray-950/80 px-4 py-3 rounded-r-xl"
                    >
                      <div className="flex justify-between gap-3 flex-wrap text-sm text-gray-400">
                        <span>{update.status}</span>
                        <span>
                          {update.createdAt
                            ? new Date(update.createdAt).toLocaleString()
                            : ""}
                        </span>
                      </div>

                      <p className="mt-2 text-gray-100">
                        {update.note}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No company follow-up added yet.
                  </p>
                )}
              </div>

              <div className="mt-4 flex gap-3 flex-col md:flex-row">
                <input
                  type="text"
                  placeholder="Add company follow-up note..."
                  value={escalationDrafts[ticket._id] || ""}
                  onChange={(e) =>
                    setEscalationDrafts({
                      ...escalationDrafts,
                      [ticket._id]: e.target.value,
                    })
                  }
                  className="flex-1 rounded-xl bg-gray-950 border border-gray-700 px-4 py-3 outline-none focus:border-cyan-500"
                />

                <button
                  type="button"
                  onClick={() => addEscalationUpdate(ticket._id)}
                  className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold hover:bg-cyan-500"
                >
                  Add Update
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
              <div className="flex gap-3 flex-wrap">
                {["Pending", "In Progress", "Completed Successfully"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(ticket._id, status)}
                      className={`${statusButtonClass[status]} px-4 py-2 rounded-xl`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>

              <div className="flex gap-3 flex-wrap">
                {ticket.companyPhone && (
                  <a
                    href={`tel:${normalizePhone(ticket.companyPhone)}`}
                    className="bg-emerald-600 px-4 py-2 rounded-xl"
                  >
                    Call Company
                  </a>
                )}

                {ticket.companyWhatsApp && (
                  <a
                    href={`https://wa.me/${normalizePhone(ticket.companyWhatsApp).replace("+", "")}?text=${encodeURIComponent(`Hello ${ticket.companyName || "Support Team"}, a customer is facing this issue: ${ticket.summary}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 px-4 py-2 rounded-xl"
                  >
                    WhatsApp Company
                  </a>
                )}

                {ticket.companyEmail && (
                  <a
                    href={`mailto:${ticket.companyEmail}?subject=Customer issue: ${encodeURIComponent(ticket.userIssue)}&body=${encodeURIComponent(`Hello ${ticket.companyName || "Support Team"},\n\nA customer is facing this issue:\n${ticket.summary}\n\nCustomer: ${ticket.user?.name || "Unknown"}\nTicket status: ${ticket.status}\n\nPlease check and share the next steps.`)}`}
                    className="bg-cyan-600 px-4 py-2 rounded-xl"
                  >
                    Contact Company
                  </a>
                )}

                {ticket.user?.email && (
                  <a
                    href={`mailto:${ticket.user.email}?subject=Payment request for completed support ticket&body=${encodeURIComponent(`Hello ${ticket.user?.name || ""},\n\nYour ticket "${ticket.userIssue}" has been completed successfully. Please proceed with the required payment as shared by support.\n\nThank you.`)}`}
                    className="bg-purple-600 px-4 py-2 rounded-xl"
                  >
                    Payment Request
                  </a>
                )}

                <span className="bg-gray-700 px-4 py-2 rounded-full">
                  {ticket.status}
                </span>

                <button
                  onClick={() => deleteTicket(ticket._id)}
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
