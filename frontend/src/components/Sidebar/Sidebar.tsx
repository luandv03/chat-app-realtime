import SidebarHeader from "../SidebarHeader/SidebarHeader";
import SidebarBoxSearch from "../SidebarBoxSearch/SidebarBoxSearch";
import SidebarBoxChat from "../SidebarBoxChat/SidebarBoxChat";
import "./Sidebar.css";

export default function Sidebar() {
    return (
        <div className="col l-4 m-5 c-0">
            <div className="sidebar">
                <SidebarHeader />
                {/* <!-- search results --> */}
                <SidebarBoxSearch />

                {/* <!-- access chat --> */}
                <SidebarBoxChat />
            </div>
        </div>
    );
}
