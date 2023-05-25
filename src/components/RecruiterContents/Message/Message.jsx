import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getconverreqsation } from "../../../apis/message";
import Conversation from "./Conversation";
import axios from "../../../axios/axios";
import MesageText from "./MesageText";
import Navbar from "../../Navbar/Reqnav";
import Footer from "../../UserContents/findjob/FooterDiv/Footer";
import { io } from "socket.io-client";

const Message = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentchat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [Newmessage, setNewMessages] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef(io("ws://localhost:8900"));
  const scrollRef = useRef();

  const { recuiter } = useSelector((state) => state.recuiterLogin);

  const token = localStorage.getItem("recruiterToken");

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", recuiter);
    socket.current.on("getUsers", (users) => {});
  }, [recuiter]);

  useEffect(() => {
    (async function invoke() {
      await getconverreqsation(token).then((res) => {
        setConversation(res.data);
      });
    })();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios(
          `/message/getmessages?messagesId=${currentChat._id}`
        );

        setMessages(res.data);
      } catch (err) {}
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        Newmessage === null ||
        Newmessage === undefined ||
        Newmessage === ""
      ) {
        Newmessage(null);
      } else {
        const message = {
          sender: recuiter,
          text: Newmessage,
          conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
          (members) => members !== recuiter
        );

        socket.current.emit("sendMessage", {
          senderId: recuiter,
          receiverId,
          text: Newmessage,
        });

        const result = await axios({
          url: "/message/newmessage",
          method: "post",
          data: { message },
        });
        setMessages([...messages, result.data]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <Navbar />
      <>
        {/* component */}
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">QuickChat</div>
              </div>

              <div className="flex flex-col mt-8">
                {/* <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                4
                </span>
            </div> */}
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                  {conversation.map((c,i) => (
                    <div key={i} onClick={() => setCurrentchat(c)}>
                      <Conversation
                        conversation={c}
                        currentreqdata={recuiter}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-auto h-full p-6">
              {currentChat ? (
                <>
                  <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                      <div className="flex flex-col h-full">
                        {messages?.map((m,c) => (
                          <div key={c} ref={scrollRef}>
                            <MesageText
                              message={m}
                              own={m.sender === recuiter}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                      <div>
                        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-grow ml-4">
                        <div className="relative w-full">
                          <input
                            type="text"
                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            onChange={(e) => setNewMessages(e.target.value)}
                            value={Newmessage}
                          />
                          <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button
                          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                          onClick={handleSubmit}
                        >
                          <span>Send</span>
                          <span className="ml-2">
                            <svg
                              className="w-4 h-4 transform rotate-45 -mt-px"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <span className=" m-auto text-gray-600 cursor-default">
                  Open conversation to start a chat
                </span>
              )}
            </div>
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
};

export default Message;
