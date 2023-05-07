import "./ChatboxContent.css";

export default function ChatboxContent() {
    return (
        <div className="content__chat">
            <div className="content__chat--message">
                <div className="content__chat--message--time">
                    Today at 11:41
                </div>
                {/* <!-- owner messages --> */}
                <div className="content__chat--message--item owner">
                    they contain. In fact, there isn’t any simple HTML or CSS
                    way to make them do that. Kinda funny, as that seems like a
                    reasonable use-case. But of course, there are ways, my
                    friend. It’s weird to me that there is no way to force an
                    input element to mimic this behavior, but alas. We can make
                    any element editable and input-like with the contenteditable
                    attribute:
                </div>

                <div className="content__chat--message--item otter">
                    Hello anh em F5
                </div>

                <div className="content__chat--message--time">
                    Today at 11:41
                </div>
                {/* <!-- owner messages --> */}
                <div className="content__chat--message--item owner">
                    Hello anh em F8
                </div>

                <div className="content__chat--message--item otter">
                    Hello anh em F5
                </div>

                <div className="content__chat--message--time">
                    Today at 11:41
                </div>
                <div className="content__chat--message--item owner">
                    Hello anh em F8
                </div>

                <div className="content__chat--message--item otter">
                    Hello anh em F5
                </div>

                <div className="content__chat--message--time">
                    Today at 11:41
                </div>
                <div className="content__chat--message--item owner">
                    Hello anh em F8
                </div>

                <div className="content__chat--message--item otter">
                    Hello anh em F5
                </div>

                <div className="content__chat--message--time">
                    Today at 11:41
                </div>
                <div className="content__chat--message--item owner">
                    Hello anh em F8
                </div>

                <div className="content__chat--message--item otter">
                    Hello anh em F5
                </div>
            </div>

            <div className="content__io">
                <div className="content__io__input">
                    <div className="content__io__input--icon">
                        <i className="fa-solid fa-face-smile"></i>
                    </div>
                    <input type="text" placeholder="Message" />

                    <div className="content__io__input--attack--file">
                        <i className="fa-solid fa-paperclip"></i>
                    </div>
                </div>

                <div className="content__io__actions">
                    <div className="content__io__actions--send">
                        <i className="fa-sharp fa-solid fa-paper-plane"></i>
                    </div>
                </div>
            </div>

            <div className="content__footer"></div>
        </div>
    );
}
