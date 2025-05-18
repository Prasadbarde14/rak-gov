import { useState } from "react";
import { MessageCircle, BotIcon, Maximize2, MessageSquare, Brain, X } from "lucide-react"; // Using lucide-react icons

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 bg-white shadow-xl rounded-xl p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <BotIcon className="text-purple-600" />
              <div >
                <span className="font-semibold text-gray-800">al-Dhakī</span>
                <p className="text-sm text-gray-500 mb-3">Your AI Assistant</p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-lg"
                aria-label="Close assistant"
              >
                <X className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end space-x-2">
                <button
                className="p-2 rounded bg-blue-100 hover:bg-blue-200"
                aria-label="Brain icon"
                >
                <Brain className="w-5 h-5 text-blue-700" />
                </button>
                <button
                className="p-2 rounded bg-blue-700 hover:bg-blue-800 text-white"
                aria-label="Send message"
                >
                <MessageSquare className="w-5 h-5" />
                </button>
            </div>

          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-white px-4 py-3 rounded shadow-md border border-gray-200 hover:shadow-lg cursor-pointer"
        >
          <BotIcon className="text-[#5047e5] w-5 h-6 " />
          <span className="text-md font-medium font-sans">al-Dhakī</span>
          <Maximize2 className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}
