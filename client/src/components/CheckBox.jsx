import React, {useState, useEffect} from "react"

export const Checkbox = ({isCheckAllCheckBox, userId, setUserId, user})=>{
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
                setUserId(
                    {
                        ...userId,
                        [user._id]: e.target.checked
                    }
                )
            }}
            checked={isCheck}
            />
}