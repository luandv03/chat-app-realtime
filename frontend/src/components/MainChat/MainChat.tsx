import GlobalStyle from "../GlobalStyle/GlobalStyle";
import Sidebar from "../Sidebar/Sidebar";
import Chatbox from "../Chatbox/Chatbox";
import Profile from "../Profile/Profile";

export default function MainChat() {
    return <GlobalStyle children={[<Sidebar />, <Chatbox />, <Profile />]} />;
}
