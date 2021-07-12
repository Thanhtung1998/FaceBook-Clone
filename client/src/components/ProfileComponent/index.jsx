import Post2 from "../Post/Post2";
import InputBox from "../InputBox/index";
import "./Profle.css";
// import { Posts } from "../../dummyData";
import { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";

export default function ProfileComponent({ username }) {
    const [posts, setPosts] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get("/posts/profile/" + username)
                : await axios.get("posts/timeline/" + user._id);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, [username, user._id]);
    return (
        <div className="flex-grow h-screen pb-44 pt-6" style={{ flex: 5.5 }}>
            <div className="ScreenProfile">
                {(!username || username === user.username) && <InputBox />}
                {posts.map((post) => (
                    <Post2 key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}
