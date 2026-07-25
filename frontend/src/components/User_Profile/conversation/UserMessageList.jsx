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
      className={`w-full flex p-3 px-4 items-center cursor-pointer transition-colors ${
        isSelected ? "bg-surface" : "hover:bg-surface"
      }`}
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <img
          src={
            shopInfo?.avatar?.url
              ? `${backend_url}${shopInfo.avatar.url}`
              : `https://ui-avatars.com/api/?name=${shopInfo?.name || "S"}&background=2F5FF6&color=fff`
          }
          alt={shopInfo?.name || "Shop"}
          className="w-[50px] h-[50px] rounded-full object-cover border-2 border-divider"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${shopInfo?.name || "S"}&background=2F5FF6&color=fff`;
          }}
        />
        {isOnline && (
          <div className="w-[12px] h-[12px] bg-stock rounded-full absolute bottom-0 right-0 border-2 border-white" />
        )}
      </div>

      <div className="pl-3 flex-1 min-w-0">
        <h1 className="text-[16px] font-body font-semibold text-ink truncate">
          {shopInfo?.name || "Unknown Shop"}
        </h1>
        <p className="text-[14px] font-body text-ink/50 truncate">
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