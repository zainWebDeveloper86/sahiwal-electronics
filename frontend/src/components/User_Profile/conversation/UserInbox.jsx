import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import socketIO from "socket.io-client";
import { axiosServerInstance } from "../../../server.js";
import UserMessageList from "./UserMessageList.jsx";
import UserChatInbox from "./UserChatInbox.jsx";

const ENDPOINT = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

const socket = socketIO(ENDPOINT, {
  path: "/socket.io",
  transports: ["websocket"],
});

const UserInbox = () => {
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [shopData, setShopData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [images, setImages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [openChatWindow, setOpenChatWindow] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);

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
      if (!user?._id) return;
      try {
        const { data } = await axiosServerInstance.get(
          `/conversation/get-all-conversation-user/${user._id}`,
        );
        setConversations(data.conversations || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load conversations",
        );
      }
    };
    fetchConversations();
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user._id);
      socket.on("getUsers", (data) => {
        setOnlineUsers(data || []);
      });
    }
    return () => {
      socket.off("getUsers");
    };
  }, [user?._id]);

  const isUserOnline = (chat) => {
    if (!chat?.members || !user?._id) return false;
    const otherMember = chat.members.find((member) => member !== user._id);
    return onlineUsers.some((u) => u.userId === otherMember);
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
    if (!currentChat?._id || !user?._id) {
      toast.error("No active conversation");
      return;
    }

    setIsSending(true);

    const receiverId = currentChat.members.find(
      (member) => member !== user._id,
    );

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
      images: images,
    });

    try {
      const formData = new FormData();
      formData.append("conversationId", currentChat._id);
      formData.append("sender", user._id);
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
          lastMessageId: user._id,
        },
      );

      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === currentChat._id
            ? { ...conv, lastMessage: newMessage, lastMessageId: user._id }
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

  const handleChatSelect = (chat, shop) => {
    setSelectedConversationId(chat?._id);
    setCurrentChat(chat);
    setShopData(shop);
    setOpenChatWindow(true);
    navigate(`/inbox?conversation=${chat._id}`, { replace: true });
  };

  const isCurrentChatActive = currentChat ? isUserOnline(currentChat) : false;

  return (
    <div className="w-full">
      {!openChatWindow ? (
        <>
          <h1 className="text-center text-[26px] py-4 font-display font-[600] text-ink border-b border-divider">
            All Messages
          </h1>
          <div className="w-full bg-white border border-divider rounded-lg divide-y divide-divider mt-4">
            {conversations && conversations.length > 0 ? (
              conversations.map((conversation) => (
                <UserMessageList
                  key={conversation._id}
                  conversation={conversation}
                  isSelected={conversation._id === selectedConversationId}
                  userId={user?._id}
                  isOnline={isUserOnline(conversation)}
                  isLoading={loading}
                  onSelectChat={handleChatSelect}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-body text-ink/60">
                  No conversations yet.
                </p>
                <p className="text-sm font-body text-ink/40 mt-1">
                  Start chatting with sellers!
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <UserChatInbox
          setOpenChatWindow={setOpenChatWindow}
          setConversationID={setSelectedConversationId}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          userId={user?._id}
          shopData={shopData}
          clientData={user}
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

export default UserInbox;
