import TopBar from '../../components/TopBar/index'
import "./Messenger.css"
import { Search } from '@material-ui/icons'
import Conversations from '../../components/conversations'
import Message from '../../components/Message'
import ChatOnline from '../../components/ChatOnline'
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { io } from "socket.io-client";

function Messenger() {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

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

    // set userOnline
    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.followings.filter((f) => users.some((u) => u.userId === f))
            );
            console.log("user")
        });
    }, [user]);

    // realtime Message
    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    // call conversations

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id)
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getConversations();
    }, [user._id])

    // call messages

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currentChat._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currentChat])

    // handel send Messages

    const handleSendMessages = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });


        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }

    // scroll auto 

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <TopBar />
            <div className=" Hello flex overflow-hidden">
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <div className="chatOnlineHead">
                            <h1 className="fontChat">Chat</h1>
                            {/* <Message /> */}
                        </div>
                        <div className="flex my-3 justify-center items-center rounded-full bg-gray-100">
                            <Search className="h-6 text-gray-600 " />
                            <input className="ChatSearch" type='text' placeholder="Search FaceBook" />
                        </div>
                        {
                            conversations.map((c) => (
                                <div onClick={() => setCurrentChat(c)}>
                                    <Conversations conversations={c} currentUser={user} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop">
                                        {messages.map((m) => (
                                            <div ref={scrollRef}>
                                                < Message currentUser={user} conversations={conversations} message={m} own={m.sender === user._id} />
                                            </div>
                                        ))
                                        }
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea
                                            className="chatMessageInput"
                                            placeholder="write something..."
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                        ></textarea>
                                        <button onClick={handleSendMessages} className="chatSubmitButton">Send</button>
                                    </div></> : <span className="noConversations">Loading Conversations ...</span>}
                    </div>
                </div>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Messenger
