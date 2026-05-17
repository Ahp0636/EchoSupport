import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

function ChatBot() {

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const [open, setOpen] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/ai/history`);
      if (res.data.chats && res.data.chats.length > 0) {
        const history = [];
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
    if (open && chat.length === 0) {
      fetchHistory();
    }
  }, [open]);

  const sendMessage = async () => {

    if (!message) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);
    
    const currentMessage = message;
    setMessage("");

    try {

      const res = await axios.post(`${API_BASE_URL}/api/ai`, {
        issue: currentMessage,
      });

      const aiMessage = {
        sender: "ai",
        text: res.data.chat.aiMessage,
      };

      setChat((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.log(error);
      const errorReply = {
        sender: "ai",
        text: "Sorry, I am having trouble connecting to the server.",
      };
      setChat((prev) => [...prev, errorReply]);
    }
  };

  return (
    <>

      {/* FLOATING BUTTON */}
      <button
        onClick={() =>
          setOpen(!open)
        }

        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
          color: "white",
          fontSize: "30px",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          zIndex: 999,
        }}
      >
       🤖 
      </button>

      {/* CHAT WINDOW */}
      {open && (

        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "320px",
            background: "#1e293b",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            color: "white",
            zIndex: 999,
          }}
        >

          <h2 style={{ marginBottom: "15px" }}>
            AI Support Chat 🤖
          </h2>

          <div
            style={{
              height: "250px",
              overflowY: "auto",
              marginBottom: "15px",
              background: "#0f172a",
              padding: "10px",
              borderRadius: "12px",
            }}
          >

            {chat.map((msg, index) => (

              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >

                <span
                  style={{
                    display: "inline-block",
                    padding: "10px",
                    borderRadius: "12px",
                    background: msg.sender === "user" ? "#3b82f6" : "#8b5cf6",
                  }}
                >
                  {msg.text}
                </span>

              </div>

            ))}

          </div>

          <div style={{ display: "flex", gap: "10px" }}>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
                border: "none",
                color: "white",
                padding: "12px 16px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Send
            </button>

          </div>

        </div>

      )}

    </>
  );
}

export default ChatBot;
