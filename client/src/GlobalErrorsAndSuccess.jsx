import React,{useContext} from "react";
import { TaskContext } from "./context/TaskContext";

export const AppErrors = ()=>{
    const {errors, success} = useContext(TaskContext);
    return <>
            <p>{errors}</p>
            <p>{success}</p>
            </>
}