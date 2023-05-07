import "./GlobalStyle.css";
import "./Responsive.css";

export default function GlobalStyle({ children }: any) {
    return (
        <div className="app grid">
            <div className="app__under no-gutters row">
                {children.map((item: any) => item)}
            </div>
        </div>
    );
}
