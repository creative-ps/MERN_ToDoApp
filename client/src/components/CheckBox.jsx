import React, {useState, useEffect} from "react"

export const Checkbox = ({isCheckAllCheckBox, setIsCheckAllCheckBox, deleteItems, setDeleteItems, user, isCheckCheckbox, setIsCheckCheckbox})=>{
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
                setDeleteItems((prev)=>{
                    const checked = e.target.checked;
                    const allDeletedItem = {
                        ...prev,
                        [user._id]: checked
                    }
                    if(Object.keys(allDeletedItem).length>0){
                        const allItems = Object.entries(allDeletedItem);
                        const result = allItems.some(([,value])=> value)
                        if(result){
                            setIsCheckCheckbox(true)
                        }else{
                            setIsCheckCheckbox(false)
                            setIsCheckAllCheckBox(false);
                        };
                    }
                    return allDeletedItem;
                }
   
                );
                
            }}
            checked={isCheck}
            />
}