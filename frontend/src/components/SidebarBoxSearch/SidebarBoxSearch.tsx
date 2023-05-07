import "./SidebarBoxSearch.css";

export default function SidebarBoxSearch() {
    return (
        <div className="sidebar__box__search">
            <div className="sidebar__box__search--recently">
                <p className="sidebar__box__search--recently--title">
                    Rencently
                </p>

                <ul className="sidebar__box__search--recently--results">
                    <li className="sidebar__box__search--recently--results--item">
                        <div className="sidebar__box__search--recently--results--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <p>Luan</p>
                    </li>
                    <li className="sidebar__box__search--recently--results--item">
                        <div className="sidebar__box__search--recently--results--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <p>Luan</p>
                    </li>
                    <li className="sidebar__box__search--recently--results--item">
                        <div className="sidebar__box__search--recently--results--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <p>Luan</p>
                    </li>
                    <li className="sidebar__box__search--recently--results--item">
                        <div className="sidebar__box__search--recently--results--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <p>Luan</p>
                    </li>
                    <li className="sidebar__box__search--recently--results--item">
                        <div className="sidebar__box__search--recently--results--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <p>Luan</p>
                    </li>
                    <li className="sidebar__box__search--recently--results--item">
                        <div className="sidebar__box__search--recently--results--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <p>Luan</p>
                    </li>
                </ul>
            </div>

            <div className="sidebar__box__search--suggest">
                <p className="sidebar__box__search--suggest--title">Suggest</p>
                <ul className="sidebar__box__search--suggest--results">
                    <li className="sidebar__box__search--suggest--results--item">
                        <div className="sidebar__box__search--suggest--results--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>
                        <div className="sidebar__box__search--suggest--results--item--infor">
                            <p>Dinh Van Luan</p>
                            <span> last seen 20:220:22 </span>
                        </div>
                    </li>
                    <li className="sidebar__box__search--suggest--results--item"></li>
                    <li className="sidebar__box__search--suggest--results--item"></li>
                    <li className="sidebar__box__search--suggest--results--item"></li>

                    <li className="sidebar__box__search--suggest--results--item"></li>

                    <li className="sidebar__box__search--suggest--results--item"></li>

                    <li className="sidebar__box__search--suggest--results--item"></li>
                </ul>
            </div>
        </div>
    );
}
