import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

const AIChat = () => {

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([
      {
        sender: "ai",
        text:
          "Hello 👋 I am your AI Support Assistant. Describe your issue.",
      },
    ]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    let aiText =
      "We are analyzing your issue. Please try restarting the system and checking your network connection.";

    if (
      message.toLowerCase().includes(
        "payment"
      )
    ) {

      aiText =
        "Payment issues are usually caused by failed gateway verification. Please verify transaction ID and retry.";
    }

    if (
      message.toLowerCase().includes(
        "login"
      )
    ) {

      aiText =
        "Please reset your password and ensure your email is verified.";
    }

    if (
      message.toLowerCase().includes(
        "network"
      )
    ) {

      aiText =
        "Please restart your router and check internet connectivity.";
    }

    const aiReply = {
      sender: "ai",
      text: aiText,
    };

    setChat((prev) => [
      ...prev,
      userMessage,
      aiReply,
    ]);

    setMessage("");
  };

  return (

    <DashboardLayout>

      <div className="text-white">

        <h1 className="text-5xl font-bold mb-3">
          AI Support Assistant 🤖
        </h1>

        <p className="text-gray-400 mb-8">
          Smart AI powered support system
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 h-[75vh] flex flex-col justify-between shadow-2xl">

          <div className="overflow-y-auto flex flex-col gap-5 pr-2">

            {chat.map((msg, index) => (

              <div
                key={index}
                className={`p-4 rounded-2xl max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 self-end"
                    : "bg-gray-800 self-start"
                }`}
              >

                {msg.text}

              </div>
            ))}

          </div>

          <div className="flex gap-4 mt-6">

            <input
              type="text"
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              className="flex-1 p-4 rounded-2xl bg-black border border-gray-700 outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 rounded-2xl font-bold hover:scale-105 transition-all"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default AIChat;