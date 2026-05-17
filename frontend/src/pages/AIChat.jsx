import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";

const welcomeMessage = {
  sender: "ai",
  text: "Hello. I am your AI Support Assistant. Describe your issue and I will give practical steps you can try.",
};

const AIChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([welcomeMessage]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/ai/history`);

      if (res.data.chats && res.data.chats.length > 0) {
        const history = [welcomeMessage];

        res.data.chats.forEach((c) => {
          history.push({ sender: "user", text: c.userMessage });
          history.push({ sender: "ai", text: c.aiMessage });
        });

        setChat(history);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const currentMessage = message.trim();

    setChat((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/ai`, {
        issue: currentMessage,
      });

      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.chat.aiMessage,
        },
      ]);
    } catch (error) {
      console.log(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I am having trouble connecting to the server. Please create a ticket with your issue details so support can help you.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="text-white">
        <div className="flex items-center gap-4 mb-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-2xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
          >
            Back
          </button>

          <h1 className="text-5xl font-bold">
            AI Support Assistant
          </h1>
        </div>

        <p className="text-gray-400 mb-8">
          Smart AI powered support system
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 h-[75vh] flex flex-col justify-between shadow-2xl">
          <div className="overflow-y-auto flex flex-col gap-5 pr-2">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl max-w-[75%] whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 self-end"
                    : "bg-gray-800 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div>
            <div className="mt-4 text-sm text-gray-400">
              If the steps do not solve your issue,{" "}
              <Link
                to="/create-ticket"
                className="text-cyan-300 hover:text-cyan-200 font-semibold"
              >
                create a ticket
              </Link>
              {" "}with your product and company details.
            </div>

            <div className="flex gap-4 mt-6">
              <input
                type="text"
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                className="flex-1 p-4 rounded-2xl bg-black border border-gray-700 outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 rounded-2xl font-bold hover:scale-105 transition-all disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIChat;
