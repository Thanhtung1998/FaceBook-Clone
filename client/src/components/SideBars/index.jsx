
import { ChevronDownIcon, ShoppingBagIcon, UserGroupIcon, } from "@heroicons/react/outline"
import { CalendarIcon, ClockIcon, DesktopComputerIcon, UserIcon, } from "@heroicons/react/solid"
import SidebarRow from "./SidebarRow";
import SideBarGroup from "./SideBarGroup";
import { Users } from '../../dummyData'
import './SideBar.css'
function Sidebar() {

    const user = {
        src: "https://links.papareact.com/f0p", name: "JeffBezoz"
    };

    return (
        <div className="hest sm: p-2 mt-5 max-w-[600px] xl:min-w-[300px] rounded-xl bg-white dark:text-white shadow-md overflow-y-auto scrollbar-hide" style={{ height: "calc( 100vh - 110px)" }}>
            <SidebarRow src={user.src} title={user.name} />
            <SidebarRow Icon={UserIcon} title="Friends" />
            <SidebarRow Icon={UserGroupIcon} title="Groups" />
            <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
            <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
            <SidebarRow Icon={CalendarIcon} title="Events" />
            <SidebarRow Icon={ClockIcon} title="Memories" />
            <SidebarRow Icon={ChevronDownIcon} title="See More" />
            <hr className="mt-5 mb-5" />
            {Users.map(u => (
                <SideBarGroup key={u.id} users={u} />
            ))}


        </div>
    )
}

export default Sidebar
