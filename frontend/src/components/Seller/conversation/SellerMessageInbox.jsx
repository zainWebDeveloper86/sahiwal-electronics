import React from "react";
import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import { backend_url } from "../../../server.js";
import styles from "../../../styles/styles.js";

const SellerMessageInbox = ({
  setOpenChatWindow,
  setConversationID,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  sellerData,
  isActive,
  scrollRef,
  handleImageUpload,
  images,
  setImages,
  isSending,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between h-[85vh]">
      {/* Header */}
      <div className="w-full flex p-3 items-center gap-4 bg-gray-100 border-b border-gray-200 flex-shrink-0">
        <AiOutlineArrowLeft
          size={22}
          className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
          onClick={() => {
            setOpenChatWindow(false);
            setConversationID(null);
          }}
        />
        <div className="flex items-center">
          <img
            src={
              userData?.avatar?.url
                ? `${backend_url}${userData.avatar.url}`
                : `https://ui-avatars.com/api/?name=${userData?.name || "U"}&background=random`
            }
            alt={userData?.name || "User"}
            className="w-[50px] h-[50px] rounded-full object-cover border-2 border-white"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${userData?.name || "U"}&background=random`;
            }}
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-semibold text-gray-800">
              {userData?.name || "Unknown"}
            </h1>
            <h1 className="text-[14px] text-green-500">
              {isActive ? "🟢 Active Now" : "Offline"}
            </h1>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 px-4 py-3 overflow-y-scroll bg-gray-50">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => {
            const isMine = message.sender === sellerId;
            // console.log(index,messages.length);
            return (
              <div
                key={index}
                className={`flex w-full my-3 ${isMine ? "justify-end" : "justify-start"}`}
                ref={index === messages.length - 1 ? scrollRef : null}
              >
                {/* Avatar (only for the other user) */}
                {!isMine && (
                  <img
                    src={
                      userData?.avatar?.url
                        ? `${backend_url}${userData.avatar.url}`
                        : `https://ui-avatars.com/api/?name=${userData?.name || "U"}&background=random`
                    }
                    className="w-[35px] h-[35px] rounded-full object-cover mr-2 flex-shrink-0"
                    alt=""
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${userData?.name || "U"}&background=random`;
                    }}
                  />
                )}

                <div className="max-w-[70%]">
                  {/* Image Message */}
                  {message.images && message.images.length > 0 && (
                    <img
                      src={`${backend_url}${message.images[0]?.url}`}
                      alt="Message attachment"
                      className="max-w-[250px] max-h-[250px] object-cover rounded-[10px] mb-1"
                    />
                  )}
                  {/* Text Message */}
                  {message.text && message.text !== "" && (
                    <div
                      className={`p-3 rounded-[12px] ${
                        isMine
                          ? "bg-[#3957db] text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100"
                      }`}
                    >
                      <p className="text-[15px] break-words">{message.text}</p>
                    </div>
                  )}
                  <p className="text-[11px] text-gray-400 mt-1">
                    {format(message.createdAt)}
                  </p>
                </div>

                {/* Avatar for seller (own messages) — on the right */}
                {isMine && (
                  <img
                    src={
                      sellerData?.avatar?.url
                        ? `${backend_url}${sellerData.avatar.url}`
                        : `https://ui-avatars.com/api/?name=${sellerData?.name || "S"}&background=random`
                    }
                    className="w-[35px] h-[35px] rounded-full object-cover ml-2 flex-shrink-0"
                    alt=""
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${sellerData?.name || "S"}&background=random`;
                    }}
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/*  Input Area */}
      <form
        className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 flex-shrink-0"
        onSubmit={sendMessageHandler}
      >
        {/* Image Upload */}
        <div className="flex-shrink-0">
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="image"
            className="cursor-pointer hover:text-[#3957db] transition-colors"
          >
            <TfiGallery
              size={22}
              className="text-gray-500 hover:text-[#3957db]"
            />
          </label>
        </div>

        {/* Message Input */}
        <div className="flex-1 flex items-center gap-2 relative">
          {/* Image Preview */}
          {images && (
            <div className="absolute bottom-full left-0 mb-2 bg-gray-100 p-2 rounded-lg border border-gray-200">
              <img
                src={URL.createObjectURL(images)}
                alt="Preview"
                className="w-[60px] h-[60px] object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-[18px] h-[18px] text-[10px] flex items-center justify-center cursor-pointer"
                onClick={() => setImages(null)}
              >
                x
              </button>
            </div>
          )}

          <input
            type="text"
            required
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input} !h-[42px] flex-1`}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={isSending || (!newMessage.trim() && !images)}
            className={`${styles.button} !h-[42px] !w-[42px] !rounded-full !p-0 flex items-center justify-center ${
              isSending || (!newMessage.trim() && !images)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <AiOutlineSend size={20} className="text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerMessageInbox;
