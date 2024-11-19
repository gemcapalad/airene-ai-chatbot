"use client";

import React from "react";
import { handleLogout } from "../actions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import meralcoImage from "@/assets/meralco.svg";
import bell from "@/assets/bell.svg";
import logout from "@/assets/log-out.svg";

export default function Home() {
  const notifications = [
    "Power interruption scheduled for tomorrow.",
    "Your bill for November is now available.",
    "Report an outage using our new mobile app.",
    "Reminder: Check your Meralco online account for updates.",
  ];
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen py-10 px-5">
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-20">
            <div className="flex-shrink-0">
              <button onClick={() => router.push("/")}>
                <Image src={meralcoImage} alt="Logo" width={32} height={32} />
              </button>
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
      <h1 className="text-3xl font-bold text-orange text-center mb-8">
        Meralco Notifications
      </h1>
      <div className="max-w-4xl mx-auto grid gap-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="border border-orange-700 rounded-lg shadow-md p-4 bg-white"
          >
            <p className="text-gray-800">{notification}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
