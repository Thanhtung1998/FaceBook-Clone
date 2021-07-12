
function SideBarGroup({ users }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer active:border-b-2 active:border-blue-500">
            <img alt="group" src={PF+users.profilePicture} className="rounded-xl" width={40} height={40} layout="fixed" />
            <span className="hidden sm:inline-flex font-medium">{users.username}</span>
        </div>
    )
}

export default SideBarGroup
