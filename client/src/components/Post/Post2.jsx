// import Image from "next/image"
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline"
import { MoreVert } from '@material-ui/icons'
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

function Post({ post }) {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const { user: currentUser } = useContext(AuthContext)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])


    const handleLike = (e) => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        }
        catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);
    return (
        <>
            <div className="flex flex-col">
                <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className='flex space-x-2'>
                            <Link to={`profile/${user.username}`}>
                                <img className="rounded-full" src={user.profilePicture ? PF + user.profilePicture : PF + "person/1.jpeg"} width={40} height={40} alt="avatar" />
                            </Link>
                            <div>
                                <p className="font-medium">{user.username}</p>
                                <p className="text-xs font-light">{format(post.createdAt)}</p>
                            </div>
                        </div>

                        <div className="cursor-pointer">
                            <MoreVert />
                        </div>
                    </div>
                    <p className="pt-4">{post?.desc}</p>
                </div>
                {post.img && <div className='relative flex justify-center h-96 md:h-[500px] bg-white' style={{ paddingBottom: 8 }}>
                    <img className="" src={PF + post.img} style={{ width: "100%", height: "100%" }} alt="" layout='fill' />
                    {/* <video src={post.photo} style={{ height: 672 }} controls /> */}
                </div>}

                <div className="bg-white flex items-center justify-between" style={{ paddingBottom: 8 }} >
                    <div className="flex space-x-2 items-center font-medium">
                        <img alt="Like" src={`${PF}like.png`} style={{ marginLeft: 8 }} width={32} height={32} />
                        <img alt="Like" src={`${PF}heart.png`} width={32} height={32} />
                        <span>{like} people like it </span>
                    </div>
                    <div className="space-x-2 font-medium" style={{ marginRight: 8 }}>
                        <span>{post.comment} comment</span>
                    </div>
                </div>

                <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
                    <div onClick={handleLike} className="inputIcon rounded-none rounded-bl-2xl">
                        <ThumbUpIcon className='h-4' />
                        <p className='text-xs sm:text-base'>Like</p>
                    </div>
                    <div className="inputIcon rounded-none">
                        <ChatAltIcon className="h-4" />
                        <p className='text-xs sm:text-base'>Comment</p>
                    </div>
                    <div className="inputIcon rounded-none rounded-br-2xl">
                        <ShareIcon className='h-4' />
                        <p className='text-xs sm:text-base'>Share</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post