import React from 'react'
import Sidebar from '../../components/SideBars/index'
import TopBar from '../../components/TopBar/index'
// import Feed from '../../components/Feed/index'
// import Widgets from '../../components/Widgets/index'
import RightBar from '../../components/Widgets/RightBarProfile/index'

import ProfileComponent from '../../components/ProfileComponent/index'
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router"


function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const username = useParams().username;
    // console.log(params.userName);

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username])


    return (
        <div className="dark:bg-gray-800 overflow-hidden h-screen overflow-y-auto scrollbar-hide">
            <TopBar />
            <main className="flex">
                <Sidebar />
                <div className="flex-1">
                    <div className="">
                        <div className="ImgProfile">
                            <img
                                className="ImgProfileHead"
                                src={user.coverPicture ? PF + user.coverPicture : PF + "post/3.jpeg"}
                                alt=""
                            />
                            <img
                                className="AvatarProfile"
                                src={user.profilePicture ? PF + user.profilePicture : PF + "person/1.jpeg"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="flex">
                        <ProfileComponent username={username} />
                        <RightBar user={user} />
                    </div>
                </div>
            </main>
            {/* <div className="flex">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src="assets/post/3.jpeg"
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src="assets/person/5.jpeg"
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Safak Kocaoglu</h4>
                            <span className="profileInfoDesc">Hello my friends!</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <ProfileComponent />
                        <RightBar profile />
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default Profile;
