// import Image from "next/image"

function Contact({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl" >
            <img alt="avatar" className="rounded-full" src={PF+user.profilePicture} width={50} height={50} layout="fixed" />
            <p>{user.username}</p>
            <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full"></div>
        </div>
    )
}

export default Contact