import "./SidebarHeader.css";

export default function SidebarHeader() {
    return (
        <div className="sidebar__header">
            <div className="sidebar__header__menu">
                <div className="sidebar__header__menu--icon select">
                    <i className="fa-solid fa-bars"></i>
                </div>

                <div className="sidebar__header__menu--icon close">
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
            </div>

            <div className="sidebar__header__search">
                <div className="sidebar__header__search--icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                    type="text"
                    className="sidebar__header__search--input"
                    placeholder="Search"
                />

                <div className="sidebar__header__search--action">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
    );
}
