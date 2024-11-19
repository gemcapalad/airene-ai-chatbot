"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import meralcoImage from "@/assets/meralco.svg";
import Link from "next/link";
import bell from "@/assets/bell.svg";
import logout from "@/assets/log-out.svg";
import { useChat } from "ai/react";
import ChatInterface from "@/components/ChatInterface";
import { handleLogout } from "./actions";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";

const Convo = () => {
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Fetch initial context when component mounts
  useEffect(() => {
    const fetchInitialContext = async () => {
      try {
        // Get the auth token from cookies
        const response = await fetch(
          "https://j69peucuxb.execute-api.ap-southeast-1.amazonaws.com/account/verify",
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " + btoa(`meralcocustomer8@gmail.com:Meralco@2024`),
            },
          }
        );

        const token = (await response.json()).data.idToken;
        // Fetch billing data
        const billingResponse = await fetch(
          `https://j69peucuxb.execute-api.ap-southeast-1.amazonaws.com/billing?sin=SIN0008&year=2024`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const billingJson = await billingResponse.json();

        // Fetch meter data
        const meterResponse = await fetch(
          "https://j69peucuxb.execute-api.ap-southeast-1.amazonaws.com/meter/latest?meterId=MTR0008",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const meterJson = await meterResponse.json();

        // Prepare context message
        const contextMessage = {
          id: "initial-context",
          role: "system",
          content: `Initial context for our conversation:
                Meter Data: ${JSON.stringify(meterJson)}
                Billing Data: ${JSON.stringify(billingJson)}
                You can use this information to provide context-aware responses about electricity usage and billing.`,
        };
        // Append the context message to the chat
        // append(contextMessage);

        // Set client-side rendering flag
        setIsClient(true);
      } catch (error) {
        console.error("Error fetching initial context:", error);
        // Optionally, you could append an error message to the chat
        append({
          id: "error-message",
          role: "system",
          content: "Failed to load initial context. Please try again later.",
        });
      }
    };

    fetchInitialContext();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-20">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src={meralcoImage} alt="Logo" width={32} height={32} />
              </Link>
            </div>
            <div className="flex text-base pl-2">Chat with Airene!</div>
            <div className="ml-auto flex space-x-6 pr-4">
              <button
                className="p-2 hover:bg-gray-200 rounded-full"
                aria-label="Notifications"
                onClick={() => {
                  router.push("/notifications");
                }}
              >
                <Image src={bell} alt="bell" width={24} height={24} />
              </button>
              <button
                className="p-2 hover:bg-gray-200 rounded-full"
                aria-label="Logout"
                onClick={() => {
                  handleLogout();
                }} // Trigger the handleLogout function
              >
                <Image src={logout} alt="logout" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <ChatInterface messages={messages} append={append}></ChatInterface>

      <footer className="bg-white fixed bottom-0 w-full shadow-md py-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-end space-x-4 chatbox-wrapper">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                if (textareaRef.current) {
                  textareaRef.current.style.height = "auto";
                  textareaRef.current.style.height = `${Math.min(
                    textareaRef.current.scrollHeight,
                    120
                  )}px`; // Limit max height
                }
                handleInputChange(e);
              }}
              placeholder="Type your message..."
              className="w-full p-3 border-2 border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none overflow-hidden"
              rows={1}
              style={{ maxHeight: "120px" }}
            />
            <button className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
              Send
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Convo;
