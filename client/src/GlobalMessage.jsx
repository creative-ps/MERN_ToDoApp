import React,{useContext, useEffect} from "react";
import { TaskContext } from "./context/TaskContext";

export const AppMessage = ()=>{
    const {errors, success, setErrors, setSuccess} = useContext(TaskContext);
    useEffect(()=>{
        if(success || errors){
            const timer = setTimeout(()=>{
                    setSuccess(null);
                    setErrors(null);
            },5000);
            return ()=>clearInterval(timer)
        }
    },[success,errors,setErrors,setSuccess])
    return <>
            <div>
                <p>{errors?errors:''}</p>
                <p>{success?success:''}</p>
            </div>
            </>
}