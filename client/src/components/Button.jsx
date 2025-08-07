import React from "react";
export const Button = ({type,className,content,handleClick})=>{
        return  <button type={type} onClick={handleClick} className={className}>{content}</button>
}