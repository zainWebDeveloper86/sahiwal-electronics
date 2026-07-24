import React, { useState, useEffect } from "react";
import { axiosServerInstance, backend_url } from "../../../server.js";

const UserMessageList = ({
  conversation,
  isSelected,
  userId,
  isOnline,
  isLoading,
  onSelectChat,
}) => {
  const [shopInfo, setShopInfo] = useState(null);

  // 🏪 Fetch shop details
  useEffect(() => {
    const shopId = conversation.members?.find((member) => member !== userId);
    if (!shopId) return;

    const fetchShop = async () => {
      try {
        const { data } = await axiosServerInstance.get(
          `/shop/get-shop-info/${shopId}`
        );
        setShopInfo(data.shop);
      } catch (error) {
        console.error("Failed to fetch shop:", error);
      }
    };
    fetchShop();
  }, [userId, conversation]);

  const handleClick = () => {
    if (shopInfo) {
      onSelectChat(conversation, shopInfo);
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
            shopInfo?.avatar?.url
              ? `${backend_url}${shopInfo.avatar.url}`
              : `https://ui-avatars.com/api/?name=${shopInfo?.name || "S"}&background=random`
          }
          alt={shopInfo?.name || "Shop"}
          className="w-[50px] h-[50px] rounded-full object-cover border-2 border-gray-200"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${shopInfo?.name || "S"}&background=random`;
          }}
        />
        {isOnline && (
          <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
        )}
      </div>

      {/* Shop Info */}
      <div className="pl-3 flex-1 min-w-0">
        <h1 className="text-[16px] font-semibold text-gray-800 truncate">
          {shopInfo?.name || "Unknown Shop"}
        </h1>
        <p className="text-[14px] text-gray-500 truncate">
          {!isLoading &&
          conversation?.lastMessageId !== shopInfo?._id &&
          conversation?.lastMessage
            ? `You: ${conversation.lastMessage}`
            : conversation?.lastMessage || "No messages yet"}
        </p>
      </div>
    </div>
  );
};

export default UserMessageList;