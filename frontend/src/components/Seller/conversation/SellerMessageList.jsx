import React, { useState, useEffect } from "react";
import { axiosServerInstance, backend_url } from "../../../server.js";

const SellerMessageList = ({
  conversation,
  isSelected,
  sellerId,
  isOnline,
  isLoading,
  onSelectChat,
}) => {
  const [clientInfo, setClientInfo] = useState(null);

  //  Fetch other user's details
  useEffect(() => {
    const clientID = conversation.members?.find(
      (memberID) => memberID !== sellerId,
    );
    if (!clientID) return;
    // console.log(conversation);
    // console.log(clientID);

    const fetchUser = async () => {
      try {
        const { data } = await axiosServerInstance.get(
          `/user/user-info/${clientID}`,
        );
        setClientInfo(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [sellerId, conversation]);

  const handleClick = () => {
    if (clientInfo) {
      onSelectChat(conversation, clientInfo);
    }
  };

  return (
    <div
      className={`w-full flex p-3 px-4 items-center cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? "bg-[#00000008]" : "bg-transparent"
      }`}
      onClick={handleClick}
    >
      {/* Avatar with Online Status Dot */}
      <div className="relative flex-shrink-0">
        <img
          src={
            clientInfo?.avatar?.url
              ? `${backend_url}${clientInfo.avatar.url}`
              : `https://ui-avatars.com/api/?name=${clientInfo?.name || "U"}&background=random`
          }
          alt={clientInfo?.name || "User"}
          className="w-[50px] h-[50px] rounded-full object-cover border-2 border-gray-200"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${clientInfo?.name || "U"}&background=random`;
          }}
        />
        {isOnline && (
          <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
        )}
      </div>

      {/* User Info */}
      <div className="pl-3 flex-1 min-w-0">
        <h1 className="text-[16px] font-semibold text-gray-800 truncate">
          {clientInfo?.name || "Unknown User"}
        </h1>
        <p className="text-[14px] text-gray-500 truncate">
          {!isLoading &&
          conversation?.lastMessageId !== clientInfo?._id &&
          conversation?.lastMessage
            ? `You: ${conversation.lastMessage}`
            : conversation?.lastMessage || "No messages yet"}
        </p>
      </div>
    </div>
  );
};

export default SellerMessageList;
