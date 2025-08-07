import React,{useState} from "react";
export const PendingButton = ({type,className})=>{
    const [isCompleted, setIsCompleted] = useState(false);
    const handlePendingState = ()=>{
        setIsCompleted(!isCompleted);
    }
    return  <button type={type} onClick={handlePendingState} className={className}>{isCompleted?'Completed':'Pending'}</button>
        
}