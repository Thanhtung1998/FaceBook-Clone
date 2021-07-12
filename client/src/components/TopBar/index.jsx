import React from 'react'
import { Search } from '@material-ui/icons'
import {
    BellIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon,
}
    from "@heroicons/react/solid"
import { FlagIcon, PlayIcon, ShoppingCartIcon } from "@heroicons/react/outline"
import HeaderIcon from "./HeaderIcon";
import { Link } from 'react-router-dom';
import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext';

function TopBar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="sticky top-0 z-50 bg-white dark:bg-black flex items-center p-2 lg:px-5 shadow-md">
            <Link to="/" style={{ textDecoration: "none" }}>
                <img className="cursor-pointer" src="https://links.papareact.com/5me" width={40} height={40} layout="fixed" alt="FaceBook" />
            </Link>
            <div className="flex ml-2 justify-center items-center rounded-full bg-gray-100 p-2">
                <Search className="h-6 text-gray-600 " />
                <input className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink" type='text' placeholder="Search FaceBook" />
            </div>
            <div className='flex justify-center flex-grow'>
                <div className="hidden sm:inline-flex space-x-6 md:space-x-2">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <HeaderIcon active className="text-blue-500" Icon={HomeIcon} />
                    </Link>
                    <HeaderIcon Icon={FlagIcon} />
                    <HeaderIcon Icon={PlayIcon} />
                    <HeaderIcon Icon={ShoppingCartIcon} />
                    <HeaderIcon Icon={UserGroupIcon} />
                </div>
            </div>
            <div className="flex items-center sm:space-x-2 justify-end">

                {/* <Image onClick={signOut} className='rounded-full cursor-pointer' src={session.user.image} width="40" height="40" layout='fixed' />
                <p className='whitespace-nowarp font-semibold pr-3'>{session.user.name}</p> */}
                <Link style={{ textDecoration: "none" }} to={`/profile/${user.username}`}>
                    <img alt="avatar" src={user.profilePicture ? PF + user.profilePicture : PF + '/person/1.jpeg'} className='rounded-full cursor-pointer' width="40" height="40" layout='fixed' />
                </Link>
                <p className='whitespace-nowarp font-semibold pr-3 dark:text-white'>{user.username}</p>

                <ViewGridIcon className='icon text-gray-500' />
                {/* <ChatIcon className="icon" /> */}
                <Link style={{ textDecoration: "none" }} to={"/messenger"}>
                    <div className='flex relative'>
                        <svg viewBox="0 0 28 28" alt="" className="icon " fill='gray' height="20" width="20"><path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path></svg>
                        <span className="notification">3</span>
                    </div>
                </Link>
                <div className='flex relative'>
                    <BellIcon className="icon text-gray-500" />
                    <span className="notification">4</span>
                </div>
                <Link onClick={() => localStorage.clear()} to="/login" style={{ textDecoration: "none" }}>
                    <ChevronDownIcon className="icon text-gray-500" />
                </Link>
            </div>
        </div>
    )
}

export default TopBar
