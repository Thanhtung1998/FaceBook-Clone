
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid"
import { useContext, useRef, useState } from 'react';
import { Users } from "../../dummyData"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"


function InputBox() {

    const { user } = useContext(AuthContext);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const desc = useRef()

    const handleSendPost = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        try {
            await axios.post("/posts", newPost)
        } catch (err) {
            console.log(err);
        }
    }

    const [file, setFile] = useState(null)

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <img className="rounded-full"
                    alt="avatar"
                    src={user.profilePicture ?
                        PF + user.profilePicture
                        : PF + "/person/1.jpeg"}
                    width={40}
                    height={40}
                    layout="fixed"
                />
                <form className="flex flex-1">
                    <input className="rounded-full 
                    h-12 bg-gray-100 flex-grow px-5 
                    focus:outline-none"
                        type="text"
                        ref={desc}
                        placeholder={`What's on your mind, ${user.username}?`} />
                    <button hidden onClick={handleSendPost} type="submit" >Submit</button>
                </form>
            </div>
            <div className='flex justify-evenly p-3 border-t'>
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <label htmlFor="file" className="inputIcon">
                    <CameraIcon className="h-7 text-green-400" />
                    <p className="text-xs sm:text-sm xl:text-base" >Photo/Video</p>
                    <input type='file' id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} hidden />
                </label>
                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base" >Felling/Activity</p>
                    <input type='file' hidden />
                </div>
            </div>
        </div>
    )
}

export default InputBox
