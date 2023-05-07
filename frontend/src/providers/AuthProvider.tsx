import React from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks.redux";
import { getProfile } from "../redux/thunks/auth/getProfile.thunk";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const isLogined = useAppSelector((store) => store.auth.isLogined);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // các trường hợp cần check trạng thái đăng nhập
    // work flow
    // 1. sau khi login thành công -> isLogined = true và gán lên localStorage
    // 2. sau đó getProfile và lưu vào redux store
    // 3. từ sau đó trở đi chúng ta sẽ cần check trạng thái đăng nhập:
    // + trường hợp navigate giữa các trang
    useEffect(() => {
        let promise: any;
        promise = dispatch(getProfile());
        if (
            JSON.parse(localStorage.getItem("isLogined") as string) &&
            isLogined
        ) {
            navigate(
                location.pathname.startsWith("/auth")
                    ? "/chat"
                    : location.pathname
            );
        } else {
            navigate(
                location.pathname.startsWith("/auth")
                    ? location.pathname
                    : "/auth/login"
            );
        }
        return () => {
            promise.abort();
        };
    }, [isLogined, dispatch]);

    return <>{children}</>;
}
