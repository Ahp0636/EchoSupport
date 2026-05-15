import ChatBot from "../components/ChatBot";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

function Dashboard() {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {

    try {

      const res = await axios.get(
        `${API_BASE_URL}/api/tickets`
      );

      setTickets(res.data.tickets);
      setAllTickets(res.data.tickets);
      setLoading(false);

    } catch (error) {

      console.log(error);
    }
  };

  const handleSearch = (e) => {

    const search =
      e.target.value.toLowerCase();

    const filtered =
      allTickets.filter((ticket) =>
        ticket.summary
          ?.toLowerCase()
          .includes(search)
      );

    setTickets(filtered);
  };

  const totalTickets = tickets.length;

  const highPriority =
    tickets.filter(
      (ticket) =>
        ticket.priority === "High"
    ).length;

  const solvedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Solved"
    ).length;

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(to right top, #0f172a, #111827, #1e1b4b)",
          padding: "30px",
          color: "white",
          fontFamily: "Arial",
        }}
      >

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          Admin Dashboard 📊
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search tickets..."
          onChange={handleSearch}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "14px",
            border: "none",
            marginBottom: "30px",
            background: "#1e293b",
            color: "white",
            fontSize: "16px",
          }}
        />

        {/* ANALYTICS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >

          <AnalyticsCard
            title="Total Tickets"
            value={totalTickets}
            color="#3b82f6"
          />

          <AnalyticsCard
            title="High Priority"
            value={highPriority}
            color="#ef4444"
          />

          <AnalyticsCard
            title="Solved Tickets"
            value={solvedTickets}
            color="#22c55e"
          />

        </div>

       {
  loading && (
    <h2
      style={{
        color: "white",
        marginBottom: "20px",
      }}
    >
      Loading Tickets...
    </h2>
  )
} 

        {/* TICKETS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >

          {tickets.length === 0 ? (

  <h2
    style={{
      color: "#94a3b8",
    }}
  >
    No tickets found
  </h2>

) : tickets.map((ticket) => (

            <div
              key={ticket._id}
              style={{
                background:
                  "rgba(255,255,255,0.08)",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                padding: "25px",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
              }}
            >

              {/* BADGES */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  marginBottom: "15px",
                }}
              >

                <span
                  style={{
                    background: "#8b5cf6",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "14px",
                  }}
                >
                  {ticket.category}
                </span>

                <span
                  style={{
                    background:
                      ticket.priority === "High"
                        ? "#ef4444"
                        : ticket.priority ===
                          "Medium"
                        ? "#f59e0b"
                        : "#3b82f6",

                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "14px",
                  }}
                >
                  {ticket.priority}
                </span>

              </div>

              {/* SUMMARY */}
              <h3>Summary</h3>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.7",
                }}
              >
                {ticket.summary}
              </p>

              {/* SOLUTION */}
              <h3
                style={{
                  marginTop: "20px",
                }}
              >
                Suggested Solution
              </h3>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.7",
                }}
              >
                {ticket.solution}
              </p>

              {/* FEEDBACK */}
              <textarea
                placeholder="Customer feedback..."

                onBlur={async (e) => {

                  try {

                    await axios.put(
                      `${API_BASE_URL}/api/tickets/feedback/${ticket._id}`,
                      {
                        feedback:
                          e.target.value,
                        rating: 5,
                      }
                    );

                  } catch (error) {

                    console.log(error);
                  }
                }}

                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#334155",
                  color: "white",
                }}
              />

              {/* STATUS */}
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                }}
              >

                <span
                  style={{
                    color: "#94a3b8",
                    fontWeight: "bold",
                  }}
                >
                  Status:
                </span>

                <select
                  value={ticket.status}

                  onChange={async (e) => {

                    try {

                      await axios.put(
                        `${API_BASE_URL}/api/tickets/${ticket._id}`,
                        {
                          status:
                            e.target.value,
                        }
                      );

                      fetchTickets();

                    } catch (error) {

                      console.log(error);
                    }
                  }}

                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",

                    background:
                      ticket.status ===
                      "Solved"
                        ? "#22c55e"
                        : ticket.status ===
                          "Ongoing"
                        ? "#f59e0b"
                        : "#ef4444",

                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Ongoing">
                    Ongoing
                  </option>

                  <option value="Solved">
                    Solved
                  </option>

                </select>

              </div>

            </div>

          )) }

        </div>

      </div>

      <ChatBot />

    </>
  );
}

function AnalyticsCard({
  title,
  value,
  color,
}) {

  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.08)",
        padding: "25px",
        borderRadius: "20px",
        border:
          "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
      }}
    >

      <h3
        style={{
          color: "#cbd5e1",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "15px",
          color,
          fontSize: "42px",
        }}
      >
        {value}
      </h1>

    </div>
  );
}

export default Dashboard;
