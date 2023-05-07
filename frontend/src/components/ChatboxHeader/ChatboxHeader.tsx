import "./ChatboxHeader.css";

export default function ChatboxHeader() {
    return (
        <div className="content__header">
            <div className="content__header__infor">
                <div className="content__header__infor--avatar">
                    <img
                        src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                        alt=""
                    />
                </div>
                <div className="content__header__infor--name">
                    <p>Luan Dinh</p>
                    <span>last seen recently</span>
                </div>
            </div>

            <div className="content__header__features">
                <div className="content__header__features--icon content__header__features--phone">
                    <i className="fa-solid fa-phone"></i>
                </div>

                <div className="content__header__features--icon content__header__features--search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <div className="content__header__features--icon content__header__features--list">
                    <i className="fa-solid fa-circle-info"></i>
                </div>
            </div>
        </div>
    );
}
