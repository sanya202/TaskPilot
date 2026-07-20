import { useState } from "react";
import api from "../services/api";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await api.post("/agent", {
        message,
      });

      const aiMessage = {
        role: "assistant",
        content: res.data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="h-full">
      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        TaskPilot AI Assistant
      </h1>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-6
        h-[500px]
        flex
        flex-col
      "
      >
        <div
          className="
          flex-1
          overflow-y-auto
          space-y-4
          mb-4
        "
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`
                  p-3
                  rounded-lg
                  max-w-[80%]
                  ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-gray-100 text-gray-800"
                  }
                `}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <form
          onSubmit={sendMessage}
          className="
            flex
            gap-3
          "
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask TaskPilot anything..."
            className="
              flex-1
              border
              rounded-lg
              px-4
              py-3
              outline-none
            "
          />

          <button
            className="
              bg-blue-600
              text-white
              px-6
              rounded-lg
            "
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
