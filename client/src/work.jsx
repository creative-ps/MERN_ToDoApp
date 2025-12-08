import React,{useState} from "react"

export const Work = ()=>{
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const [name, setName] = useState("");


console.log(first,'first');
console.log(second,'second');
console.log(name,'name');

    return <>
            {first} {second} {name} {""}
            <button onClick={()=>{
                setFirst('this is first state.')
            }}>first</button>
            <button onClick={()=>{
                setSecond('this is second state.')
            }}>second</button>
            <button onClick={()=>{
                setName('this is setName state.')
            }}>name</button>
            </>
}