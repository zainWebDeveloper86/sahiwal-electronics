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

  useEffect(() => {
    const clientID = conversation.members?.find(
      (memberID) => memberID !== sellerId,
    );
    if (!clientID) return;

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
      className={`w-full flex p-3 px-4 items-center cursor-pointer transition-colors ${
        isSelected ? "bg-surface" : "hover:bg-surface"
      }`}
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <img
          src={
            clientInfo?.avatar?.url
              ? `${backend_url}${clientInfo.avatar.url}`
              : `https://ui-avatars.com/api/?name=${clientInfo?.name || "U"}&background=2F5FF6&color=fff`
          }
          alt={clientInfo?.name || "User"}
          className="w-[50px] h-[50px] rounded-full object-cover border-2 border-divider"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${clientInfo?.name || "U"}&background=2F5FF6&color=fff`;
          }}
        />
        {isOnline && (
          <div className="w-[12px] h-[12px] bg-stock rounded-full absolute bottom-0 right-0 border-2 border-white" />
        )}
      </div>

      <div className="pl-3 flex-1 min-w-0">
        <h1 className="text-[16px] font-body font-semibold text-ink truncate">
          {clientInfo?.name || "Unknown User"}
        </h1>
        <p className="text-[14px] font-body text-ink/50 truncate">
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