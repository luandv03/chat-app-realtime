import {
    createContext,
    useState,
    useEffect,
    ReactNode,
    SetStateAction,
    Dispatch,
} from "react";
import { IUser } from "../interfaces/user/user.interface";
import { authService } from "../services/auth.service";
import { useNavigate, useLocation } from "react-router-dom";

interface IContext {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    selectedChat: any;
    setSelectedChat: Dispatch<SetStateAction<any>>;
}

export const AuthContext = createContext<IContext>({
    user: null,
    setUser: () => {},
    loading: false,
    setLoading: () => {},
    selectedChat: null,
    setSelectedChat: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedChat, setSelectedChat] = useState<any>({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleGetMe = async () => {
            try {
                setLoading(true);
                const response = await authService.getProfile({ hello: 1234 });
                setUser(response.data);
                setLoading(false);
                navigate(
                    location.pathname.startsWith("/auth")
                        ? "/chat"
                        : location.pathname
                );
            } catch (err: any) {
                navigate(
                    location.pathname.startsWith("/auth")
                        ? location.pathname
                        : "/auth/login"
                );
                setLoading(false);
            }
        };

        return () => {
            handleGetMe();
        };
    }, [navigate]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                selectedChat,
                setSelectedChat,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
