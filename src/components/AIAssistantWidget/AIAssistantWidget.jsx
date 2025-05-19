import React, { useState, useRef, useEffect } from "react";
import {
  BotIcon,
  Maximize2,
  X,
  Mic,
  SendHorizontal,
} from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChatBotMutation } from "../../API/Query/query";

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef(null);
  const chartData = {}; // Replace with actual chart data if needed
  const [expandedMessages, setExpandedMessages] = useState({});
  const [uuid, setUuid] = useState(Math.random().toString(36).substring(2, 15));

  const { mutateAsync, isPending, isError } = useChatBotMutation();

  const toggleExpanded = (index) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const chatBotResponse = async (query, agent = "prompt") => {
    setLoading(true);

    try {
      const botResponse = await mutateAsync({
        query,
        agent,
        chartData,
        uuid,
      });
      console.log("data: ", botResponse);
      // const message = await getChatBotResponse();

      const botMessage = {
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setError(true);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Failed to fetch response.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    await chatBotResponse(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  // -----------------
  // Speech Recognition
  // -----------------
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const handleMicClick = () => {
  if (!browserSupportsSpeechRecognition) {
    alert("Browser does not support speech recognition.");
    return;
  }

  if (listening) {
    SpeechRecognition.stopListening();
  } else {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: false,
      language: "en-IN",
    });
  }
};

useEffect(() => {
  if (listening) {
    setInput(transcript);
  }
}, [transcript, listening]);


  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {isOpen ? (
        <div className="w-80 h-[32rem] bg-white shadow-xl rounded-xl p-4 border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              <BotIcon className="text-purple-600 w-5 h-5" />
              <div>
                <span className="font-semibold text-gray-800">al-Dhakī</span>
                <p className="text-sm text-gray-500">Your AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto scroll-smooth space-y-2 mb-3 text-sm pr-1 scrollbar-custom"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-right ml-auto"
                    : "bg-gray-100 text-left mr-auto"
                }`}
              >

                <div >
                  <ReactMarkdown remarkPlugins={[remarkGfm]} >
                    {expandedMessages[index] || msg.text.length <= 300
                      ? msg.text
                      : msg.text.slice(0, 300) + "..."}
                  </ReactMarkdown>
                  {msg.text.length > 300 && (
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="text-blue-600 text-xs mt-1 underline focus:outline-none cursor-pointer"
                    >
                      {expandedMessages[index] ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>

                {msg.timestamp && (
                  <div
                    className="text-xs text-gray-400 mt-1"
                    title={new Date(msg.timestamp).toLocaleString()}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-400 italic">Typing...</div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 items-center mt-auto">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              className="p-2 rounded bg-blue-100 hover:bg-blue-200 cursor-pointer"
              aria-label="Brain icon"
              onClick={handleMicClick}
            >
              <Mic className="w-5 h-5 text-blue-700" />
            </button>
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-2 rounded bg-blue-700 hover:bg-blue-800 text-white disabled:opacity-50 cursor-pointer"
              aria-label="Send message"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-white px-4 py-3 rounded shadow-md border border-gray-200 hover:shadow-lg cursor-pointer"
          aria-label="Open AI Assistant"
        >
          <BotIcon className="text-[#5047e5] w-5 h-5" />
          <span className="text-md font-medium">al-Dhakī</span>
          <Maximize2 className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}
