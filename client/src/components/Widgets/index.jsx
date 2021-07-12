import { SearchIcon } from "@heroicons/react/outline"
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid"
import Contact from "./Contact";
import { Users } from "../../dummyData"




function Widgets() {
    return (
        <div className="hidden lg:flex flex-col max-w-[600px] xl:min-w-[300px] p-2 mt-5 rounded-xl bg-white shadow-md overflow-y-auto scrollbar-hide" style={{ height: "calc( 100vh - 110px)" }}>
            <div className="flex justify-between items-center text-gray-500 mb-5">
                <h2 className='text-xl'>
                    Contacts
                </h2>
                <div className="flex space-x-2">
                    <VideoCameraIcon className="h-6" />
                    <SearchIcon className="h-6" />
                    <DotsHorizontalIcon className="h-6" />
                </div>
            </div>
            {Users.map((contact) => (
                <Contact key={contact.id} user={contact} />
            ))}
        </div>
    )
}

export default Widgets