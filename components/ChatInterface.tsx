import { Message } from "ai";
import React from "react";
import Markdown from "react-markdown";
import meralco_svg from "@/assets/meralco.svg";
import Image from "next/image";

const ChatInterface = ({ messages, append }: { messages: Message[] }) => {
  const WelcomeScreen = () => (
    <div className="flex flex-col items-center pt-36">
      {/* Header Text */}
      <div className="text-4xl font-bold bg-gradient-to-b from-orange-500 via-orange-700 to-orange-900 bg-clip-text text-transparent mb-4">
        Hey there!
      </div>
      <div className="text-4xl font-bold bg-gradient-to-b from-orange-900 to-black bg-clip-text text-transparent">
        What's the buzz?
      </div>

      {/* Introduction Text */}
      <div className="text-gray-600 text-lg font-light mt-2 text-center">
        <p>
          The name's <span className="text-orange-400">Airene</span>! Your
          bright,
        </p>
        <p>powerful, and electrifying AI assistant,</p>
        <p>
          here to energize your Meralco experience. What can I do to help you
          with?
        </p>
      </div>

      {/* Quick Action Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16 mt-8 px-4">
        {[
          { id: 1, text: "Check my bill and consumption" },
          { id: 2, text: "How to report an outage" },
          { id: 3, text: "Get energy-saving tips" },
        ].map((box) => (
          <div
            key={box.id}
            className="w-full max-w-80 bg-white border-2 border-orange-500 p-8 rounded-lg shadow-md cursor-pointer hover:bg-orange-50 transition-all"
            onClick={() => {
              append({ role: "user", content: box.text });
            }}
          >
            <p className="text-center text-gray-700">{box.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  function getMessage(message: string) {
    console.log(message);
    return message;
  }

  const ChatMessages = () => (
    <div className="flex justify-center items-end pt-20">
      <div className="w-[1000px] overflow-y-auto flex flex-col justify-end items-center px-4 py-2">
        {messages.slice(2).map((message, index) => (
          <div key={index} className="w-[800px] flex flex-col items-center">
            <div className="w-[800px] max-w-3xl flex flex-col gap-2">
              <div
                className={`w-[800px] flex gap-2 items-start ${
                  message.role === "user" ? "flex-row-reverse pt-2" : ""
                }`}
              >
                <div className="relative">
                  {/* Placeholder image for Airene */}
                  {message.role !== "user" && (
                    <Image
                      src={meralco_svg}
                      alt="Airene logo"
                      width={40}
                      height={40}
                      className="rounded-full absolute right-[100%] transition-all"
                    />
                  )}
                  <span
                    className={`pl-4 pb-1 font-medium ${
                      message.role === "user" ? "self-end" : "self-start"
                    }`}
                  >
                    {message.role === "user" ? "You" : "Airene"}
                  </span>
                  <div
                    className={`
                  w-full max-w-75%
                  px-4 py-3 
                  rounded-lg 
                  whitespace-pre-wrap 
                  ${
                    message.role === "user"
                      ? "bg-orange-500/80 self-end text-white"
                      : "self-start text-black"
                  }
                `}
                  >
                    <Markdown>{message.content}</Markdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return messages.length <= 2 ? <WelcomeScreen /> : <ChatMessages />;
};

export default ChatInterface;
