import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import socketIO from "socket.io-client";
import { axiosServerInstance } from "../../../server.js";
import SellerMessageList from "./SellerMessageList.jsx";
import SellerMessageInbox from "./SellerMessageInbox.jsx";

// Socket connection
const ENDPOINT = "http://localhost:8000";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const ShopInbox = () => {
  // State Management
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

  //  Socket: Listen for incoming messages
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

  //  Add arrival message to messages list
  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  //  Fetch all conversations for this seller
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

  // Socket: Register seller as online
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

  //  Check if a user is online
  const isUserOnline = (chat) => {
    if (!chat?.members || !seller?._id) return false;
    const otherMember = chat.members.find((member) => member !== seller._id);
    return onlineUsers.some((user) => user.userId === otherMember);
  };

  //  Fetch messages for selected chat
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

  //  Send message handler
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

    // Emit to socket for real-time delivery
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

      // Update last message in conversation
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

  //  Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages(file);
    }
  };

  //  Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //  Handle chat selection from list
  const handleChatSelect = (chat, user) => {
    setSelectedConversationId(chat?._id);
    setCurrentChat(chat);
    setUserData(user);
    setOpenChatWindow(true);
    navigate(`/dashboard-messages?conversation=${chat._id}`, { replace: true });
  };

  const isCurrentChatActive = currentChat ? isUserOnline(currentChat) : false;
  // console.log("seler:" , seller?._id);
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded shadow-lg">
      {!openChatWindow ? (
        //  Conversations List View
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins font-semibold text-gray-700">
            All Messages
          </h1>
          <div className="divide-y divide-gray-100">
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
              <div className="text-center py-10 text-gray-500">
                <p className="text-lg">No conversations yet.</p>
                <p className="text-sm">Start chatting with your customers!</p>
              </div>
            )}
          </div>
        </>
      ) : (
        // Chat Window View
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
