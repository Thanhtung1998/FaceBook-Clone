import Stories from './Stories'
import InputBox from '../InputBox/index'
import { useState, useEffect, useContext } from 'react'
import Post2 from '../Post/Post2'
// import { Posts } from '../../dummyData'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'


function Feed({ username }) {

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
        <div className=" flex-grow h-screen pb-44 pt-6  overflow-y-auto scrollbar-hide">
            <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
                <Stories />
                <InputBox />
                {posts.map((post) => (
                    <Post2 key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Feed