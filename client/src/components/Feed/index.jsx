
import Stories from './Stories'
import InputBox from '../InputBox/index'
import Post from '../Post/Post2'
import { Posts } from '../../dummyData'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import { useState, useEffect, useContext } from 'react'


function Feed({ userName }) {

    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = userName
                ? await axios.get("/posts/profile/" + userName)
                : await axios.get("/posts/timeline/" + user._id);
            setPosts(res.data);
        }
        fetchPosts();
    }, [userName, user._id]);
    return (
        <div className=" flex-grow h-screen pb-44 pt-6  overflow-y-auto scrollbar-hide">
            <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
                <Stories />
                <InputBox />
                {Posts.map((p) => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    )
}

export default Feed