import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";

interface Props {
    children: JSX.Element;
    roles?: string[];
}
export const PrivateRouter = ({ children, roles }: Props) => {
    const { user } = useAppSelector((state) => state.auth);

    if (user === null) {
        return <Navigate to="/admin/signin" replace />;
    }
    if (user && roles && !roles?.includes(user.role)) {
        return <Navigate to="/admin/forbidden" replace />;
    }
    return children;
};
