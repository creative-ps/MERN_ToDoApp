import React,{useState, useContext, useEffect} from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

export const Category = ()=>{
    const [cat, setCat] = useState('');
    const {addCategory, setErrors, setSuccess} = useContext(TaskContext);
    const navigate = useNavigate();
    
    useEffect(()=>{
        setErrors(null);
        setSuccess(null)
    },[])
   
    return <div>
                <form>
                    <div>
                        <input 
                        type="text" 
                        value={cat}
                        onChange={(e)=>{
                            setCat(e.target.value);
                            setErrors('');
                            setSuccess('');
                        }}
                        />
                        <span>
                            <button type="button" 
                            onClick={
                                (e)=>{
                                    if(!cat){
                                        setErrors('Enter valid category.');
                                        return;
                                    }
                                    addCategory(cat);
                                    localStorage.setItem('_cat',cat);
                                    navigate(`/create/${cat}`);
                                    }
                            }>
                            Submit
                            </button>
                        </span>
                    </div>
                </form>
           </div>
}