import "./Message.css"
import { format } from 'timeago.js'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Message({ conversations, currentUser, message, own }) {

    const [user, setUser] = useState(null);
    const [user2, setUser2] = useState(null);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {

        let a;
        [a] = conversations;

        // console.log(a);

        const friendId = a.members.find((m) => m === currentUser._id);

        const getUser = async () => {
            try {
                const res = await axios("/users?userId=" + friendId);
                setUser(res.data);
                // console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser._id, conversations]);

    useEffect(() => {

        let a;
        [a] = conversations;

        // console.log(a);

        const friendId = a.members.find((m) => m !== currentUser._id);

        const getUser2 = async () => {
            try {
                const res = await axios("/users?userId=" + friendId);
                setUser2(res.data);
                // console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        getUser2();
    }, [currentUser._id, conversations]);



    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {own ?
                    <img src={
                        user?.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/1.jpeg"
                    } alt="" className="messageImg" />
                    : <img src={
                        user2?.profilePicture
                            ? PF + user2.profilePicture
                            : PF + "person/1.jpeg"
                    }
                        alt="" className="messageImg" />}
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>

        </div>

    )
}

export default Message
