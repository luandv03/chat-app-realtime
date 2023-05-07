import ChatboxHeader from "../ChatboxHeader/ChatboxHeader";
import ChatboxContent from "../ChatboxContent/ChatboxContent";
import "./Chatbox.css";

export default function Chatbox() {
    return (
        <div className="col l-8 m-7 c-12">
            <div className="content">
                <ChatboxHeader />
                <ChatboxContent />
            </div>
        </div>
    );
}
