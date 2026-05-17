import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";

const welcomeMessage = {
  sender: "ai",
  text: "Hello. I am your AI Support Assistant. Start a new chat by describing your issue.",
};

const AIChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [chat, setChat] = useState([welcomeMessage]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/ai/history`);
      setHistory(res.data.chats || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const startNewChat = () => {
    setChat([welcomeMessage]);
    setMessage("");
  };

  const loadHistoryItem = (item) => {
    setChat([
      welcomeMessage,
      {
        sender: "user",
        text: item.userMessage,
      },
      {
        sender: "ai",
        text: item.aiMessage,
      },
    ]);
  };

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

      fetchHistory();
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
        <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-2xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
            >
              Back
            </button>

            <div>
              <h1 className="text-5xl font-bold">
                AI Support Assistant
              </h1>

              <p className="text-gray-400 mt-3">
                New chat starts clean. Previous answers stay in history.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={startNewChat}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-bold hover:scale-[1.02] transition-all"
          >
            New Chat
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6 mt-8">
          <aside className="bg-gray-900 border border-gray-800 rounded-3xl p-5 h-[75vh] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  Chat History
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {history.length} saved conversations
                </p>
              </div>
            </div>

            <div className="overflow-y-auto flex flex-col gap-3 pr-1">
              {history.length ? (
                history.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => loadHistoryItem(item)}
                    className="text-left rounded-2xl border border-gray-800 bg-black/30 p-4 hover:border-blue-500 hover:bg-gray-800 transition-all"
                  >
                    <p className="font-semibold truncate">
                      {item.userMessage}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-700 p-5 text-sm text-gray-400">
                  No chat history yet. Send your first support question to save it here.
                </div>
              )}
            </div>
          </aside>

          <section className="bg-gray-900 border border-gray-800 rounded-3xl p-6 h-[75vh] flex flex-col justify-between shadow-2xl">
            <div className="overflow-y-auto flex flex-col gap-5 pr-2">
              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-2xl max-w-[82%] whitespace-pre-line ${
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
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIChat;
