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
                {(errors || success) ? <div className="flex justify-center align-middle">
                    <div className="bg-red-400 text-black font-normal text-center px-2 py-1 relative top-5">
                        <p>{errors?errors:''}</p>
                        <p>{success?success:''}</p>
                    </div>
                </div> : ''}
            </>
}