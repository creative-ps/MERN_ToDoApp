import React, {useContext} from "react";
import { Outlet } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(TaskContext);
    if(!isAuthenticated){
        return <Navigate to='/'/>
    }

    return <Outlet/>
}