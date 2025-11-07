import React, {useState, useEffect} from "react"

export const Checkbox = ({isCheckAllCheckBox})=>{
    const [isCheck, setIsCheck] = useState(false);
    useEffect(()=>{
        if(isCheckAllCheckBox){
            setIsCheck(true);
        }else{
            setIsCheck(false)
        }
    },[isCheckAllCheckBox]);

    return <input type="checkbox" 
            onChange={(e)=>{
                setIsCheck(!isCheck);
            }}
            checked={isCheck}
            />
}