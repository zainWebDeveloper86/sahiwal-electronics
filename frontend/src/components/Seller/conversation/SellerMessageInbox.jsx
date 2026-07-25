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
      <div className="w-full flex p-3 items-center gap-4 bg-white border-b border-divider flex-shrink-0">
        <AiOutlineArrowLeft
          size={22}
          className="cursor-pointer text-ink/50 hover:text-ink transition-colors"
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
                : `https://ui-avatars.com/api/?name=${userData?.name || "U"}&background=2F5FF6&color=fff`
            }
            alt={userData?.name || "User"}
            className="w-[50px] h-[50px] rounded-full object-cover border-2 border-divider"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${userData?.name || "U"}&background=2F5FF6&color=fff`;
            }}
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-body font-semibold text-ink">
              {userData?.name || "Unknown"}
            </h1>
            <h1 className={`text-[14px] font-body font-medium ${isActive ? "text-stock" : "text-ink/40"}`}>
              {isActive ? "Active Now" : "Offline"}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-3 overflow-y-scroll bg-surface">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => {
            const isMine = message.sender === sellerId;
            return (
              <div
                key={index}
                className={`flex w-full my-3 ${isMine ? "justify-end" : "justify-start"}`}
                ref={index === messages.length - 1 ? scrollRef : null}
              >
                {!isMine && (
                  <img
                    src={
                      userData?.avatar?.url
                        ? `${backend_url}${userData.avatar.url}`
                        : `https://ui-avatars.com/api/?name=${userData?.name || "U"}&background=2F5FF6&color=fff`
                    }
                    className="w-[35px] h-[35px] rounded-full object-cover mr-2 flex-shrink-0 border border-divider"
                    alt=""
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${userData?.name || "U"}&background=2F5FF6&color=fff`;
                    }}
                  />
                )}

                <div className="max-w-[70%]">
                  {message.images && message.images.length > 0 && (
                    <img
                      src={`${backend_url}${message.images[0]?.url}`}
                      alt="Message attachment"
                      className="max-w-[250px] max-h-[250px] object-cover rounded-[10px] mb-1 border border-divider"
                    />
                  )}
                  {message.text && message.text !== "" && (
                    <div
                      className={`p-3 rounded-[12px] ${
                        isMine
                          ? "bg-voltage text-white rounded-br-none"
                          : "bg-white text-ink rounded-bl-none border border-divider"
                      }`}
                    >
                      <p className="text-[15px] font-body break-words">{message.text}</p>
                    </div>
                  )}
                  <p className="text-[11px] font-body text-ink/40 mt-1">
                    {format(message.createdAt)}
                  </p>
                </div>

                {isMine && (
                  <img
                    src={
                      sellerData?.avatar?.url
                        ? `${backend_url}${sellerData.avatar.url}`
                        : `https://ui-avatars.com/api/?name=${sellerData?.name || "S"}&background=2F5FF6&color=fff`
                    }
                    className="w-[35px] h-[35px] rounded-full object-cover ml-2 flex-shrink-0 border border-divider"
                    alt=""
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${sellerData?.name || "S"}&background=2F5FF6&color=fff`;
                    }}
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-ink/40 font-body">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      <form
        className="p-3 bg-white border-t border-divider flex items-center gap-2 flex-shrink-0"
        onSubmit={sendMessageHandler}
      >
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
            className="cursor-pointer hover:text-voltage transition-colors"
          >
            <TfiGallery
              size={22}
              className="text-ink/50 hover:text-voltage transition-colors"
            />
          </label>
        </div>

        <div className="flex-1 flex items-center gap-2 relative">
          {images && (
            <div className="absolute bottom-full left-0 mb-2 bg-white p-2 rounded-lg border border-divider shadow-sm">
              <img
                src={URL.createObjectURL(images)}
                alt="Preview"
                className="w-[60px] h-[60px] object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute -top-1 -right-1 bg-copper text-white rounded-full w-[18px] h-[18px] text-[10px] flex items-center justify-center cursor-pointer hover:opacity-80"
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