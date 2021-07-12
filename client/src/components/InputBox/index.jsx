import "./share.css";
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) { }
    };

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                    />
                    <form className="flex flex-1" >
                        <input
                            placeholder={"What's in your mind " + user.username + "?"}
                            className="rounded-full 
                    h-12 bg-gray-100 flex-grow px-5
                    focus: outline-none"
                            ref={desc}
                        />

                        <button className="shareButton" hidden type="submit" onClick={submitHandler}>
                            Share
                        </button>
                    </form>
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" >
                    <div className='flex flex-1 justify-evenly'>
                        <label htmlFor="file" className="inputIcon">
                            <PermMedia htmlColor="tomato" className="h-7" />
                            <span className="text-xs sm:text-sm xl:text-base">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="inputIcon">
                            <Label htmlColor="blue" className="h-7 " />
                            <span className="text-xs sm:text-sm xl:text-base">Tag</span>
                        </div>
                        <div className="inputIcon">
                            <Room htmlColor="green" className="h-7 " />
                            <span className="text-xs sm:text-sm xl:text-base">Location</span>
                        </div>
                        <div className="inputIcon">
                            <EmojiEmotions htmlColor="goldenrod" className="h-7 " />
                            <span className="text-xs sm:text-sm xl:text-base">Feelings</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}