import React from "react";
export const Button = ({type,className,content,handleClick, isDisabled})=>{
        return  <button type={type} onClick={handleClick} disabled={isDisabled} className={className}>{content}</button>
}