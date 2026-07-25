import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import socketIO from "socket.io-client";
import { axiosServerInstance } from "../../../server.js";
import SellerMessageList from "./SellerMessageList.jsx";
import SellerMessageInbox from "./SellerMessageInbox.jsx";

const ENDPOINT = "http://localhost:8000";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const ShopInbox = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [images, setImages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [openChatWindow, setOpenChatWindow] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { seller, loading } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  const scrollRef = useRef(null);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        images: data.images,
        createdAt: Date.now(),
      });
    });

    socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === currentChat?._id
            ? { ...conv, lastMessage, lastMessageId }
            : conv,
        ),
      );
    });

    return () => {
      socket.off("getMessage");
      socket.off("updateLastMessage");
    };
  }, [currentChat]);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!seller?._id) return;
      try {
        const { data } = await axiosServerInstance.get(
          `/conversation/get-all-conversation-seller/${seller._id}`,
        );
        setConversations(data.conversations || []);
        setSellerData(seller);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load conversations",
        );
      }
    };
    fetchConversations();
  }, [seller?._id]);

  useEffect(() => {
    if (seller?._id) {
      socket.emit("addUser", seller._id);
      socket.on("getUsers", (data) => {
        setOnlineUsers(data || []);
      });
    }
    return () => {
      socket.off("getUsers");
    };
  }, [seller?._id]);

  const isUserOnline = (chat) => {
    if (!chat?.members || !seller?._id) return false;
    const otherMember = chat.members.find((member) => member !== seller._id);
    return onlineUsers.some((user) => user.userId === otherMember);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentChat?._id) return;
      try {
        const { data } = await axiosServerInstance.get(
          `/message/get-all-messages/${currentChat._id}`,
        );
        setMessages(data.messages || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load messages");
      }
    };
    fetchMessages();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !images) return;
    if (!currentChat?._id || !seller?._id) {
      toast.error("No active conversation");
      return;
    }

    setIsSending(true);

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id,
    );

    socket.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
      images: images,
    });

    try {
      const formData = new FormData();
      formData.append("conversationId", currentChat._id);
      formData.append("sender", seller._id);
      formData.append("text", newMessage);
      if (images) {
        formData.append("images", images);
      }

      const { data } = await axiosServerInstance.post(
        "/message/create-new-message",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setMessages((prev) => [...prev, data.message]);

      await axiosServerInstance.put(
        `/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: seller._id,
        },
      );

      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === currentChat._id
            ? { ...conv, lastMessage: newMessage, lastMessageId: seller._id }
            : conv,
        ),
      );

      setNewMessage("");
      setImages(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages(file);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatSelect = (chat, user) => {
    setSelectedConversationId(chat?._id);
    setCurrentChat(chat);
    setUserData(user);
    setOpenChatWindow(true);
    navigate(`/dashboard-messages?conversation=${chat._id}`, { replace: true });
  };

  const isCurrentChatActive = currentChat ? isUserOnline(currentChat) : false;

  return (
    <div className="w-[90%] bg-white border border-divider m-5 h-[85vh] overflow-y-scroll rounded-lg shadow-sm">
      {!openChatWindow ? (
        <>
          <h1 className="text-center text-[26px] py-4 font-display font-[600] text-ink border-b border-divider">
            All Messages
          </h1>
          <div className="divide-y divide-divider">
            {conversations && conversations.length > 0 ? (
              conversations.map((conversation, index) => (
                <SellerMessageList
                  key={conversation._id || index}
                  conversation={conversation}
                  isSelected={conversation._id === selectedConversationId}
                  sellerId={seller?._id}
                  isOnline={isUserOnline(conversation)}
                  isLoading={loading}
                  onSelectChat={handleChatSelect}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-body text-ink/60">No conversations yet.</p>
                <p className="text-sm font-body text-ink/40 mt-1">Start chatting with your customers!</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <SellerMessageInbox
          setOpenChatWindow={setOpenChatWindow}
          setConversationID={setSelectedConversationId}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller?._id}
          userData={userData}
          sellerData={sellerData}
          isActive={isCurrentChatActive}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
          images={images}
          setImages={setImages}
          isSending={isSending}
        />
      )}
    </div>
  );
};

export default ShopInbox;