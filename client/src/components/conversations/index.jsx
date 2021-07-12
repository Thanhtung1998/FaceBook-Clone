import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./conversations.css"

function Conversations({ conversations, currentUser }) {

    const [user, setUser] = useState(null);

    // console.log(conversations)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversations.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await axios("/users?userId=" + friendId);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversations]);

    return (
        <div className="conversation">
            <img className="conversationImg" src={
                user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/1.jpeg"
            } alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}

export default Conversations
