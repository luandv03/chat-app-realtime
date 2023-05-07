import "./Profile.css";

export default function Profile() {
    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__header--action profile__header--close">
                    <div className="profile__header--close--x">
                        <i className="fa-solid fa-xmark"></i>
                    </div>

                    <div className="profile__header--close--arrow">
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                </div>

                <div className="profile__header--title">Profile</div>

                <div className="profile__header--action profile__header--select">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>

            <div className="profile__infor">
                <div className="profile__infor--name">
                    <div className="profile__infor--email">
                        <i className="fa-solid fa-at"></i>
                        <span>dinhvanluan2k3@gmail.com</span>
                    </div>
                    <p>Dinh Van Luan</p>
                    <span>Last seen 2 hours</span>
                </div>
            </div>

            {/* <!-- group member --> */}
            <div className="profile__features">
                <ul className="profile__features--list">
                    <li className="profile__features--item">
                        <div className="profile__features--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <div className="profile__features--item--infor">
                            <p>An Nguyen</p>
                            <span>Do Luan Dinh them</span>
                        </div>

                        <div className="profile__features--item--select">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </li>
                    <li className="profile__features--item">
                        <div className="profile__features--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <div className="profile__features--item--infor">
                            <p>An Nguyen</p>
                            <span>Quan tri vien</span>
                        </div>

                        <div className="profile__features--item--select">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </li>
                    <li className="profile__features--item">
                        <div className="profile__features--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <div className="profile__features--item--infor">
                            <p>An Nguyen</p>
                            <span>Do Luan Dinh them</span>
                        </div>

                        <div className="profile__features--item--select">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </li>
                    <li className="profile__features--item">
                        <div className="profile__features--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <div className="profile__features--item--infor">
                            <p>An Nguyen</p>
                            <span>Do Luan Dinh them</span>
                        </div>

                        <div className="profile__features--item--select">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </li>
                    <li className="profile__features--item">
                        <div className="profile__features--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <div className="profile__features--item--infor">
                            <p>An Nguyen</p>
                            <span>Do Luan Dinh them</span>
                        </div>

                        <div className="profile__features--item--select">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </li>
                    <li className="profile__features--item">
                        <div className="profile__features--item--avatar">
                            <img
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                alt=""
                            />
                        </div>

                        <div className="profile__features--item--infor">
                            <p>An Nguyen</p>
                            <span>Do Luan Dinh them</span>
                        </div>

                        <div className="profile__features--item--select">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
