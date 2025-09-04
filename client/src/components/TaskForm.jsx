import React,{useState, useEffect} from "react";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import {toast} from 'react-toastify';
import { useParams } from "react-router-dom";

export const TaskForm = ()=>{
    const [task, setTask] = useState("");
    const [selectVal, setSelectVal] = useState('')
    const {addTask, isAuthenticated, setErrors, setSuccess, categories, getCategories} = useContext(TaskContext);
    const {cat} = useParams();
    if(!isAuthenticated){
        return
    }
    
    useEffect(()=>{
        setErrors(null);
        setSuccess(null);
        getCategories();
        {cat ? setSelectVal(cat):setSelectVal(categories[0]?.name)};
    },[]);
   
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(task === ''){
            setErrors('Task is required.')
            return;
        }
        
        await addTask({selectVal,task});
        setTask('');
        
    }

    const handleInputChange = (setter)=>(event)=>{
        setter(event.target.value)
        setErrors('')
    }

    if(cat){
        const _category = localStorage.getItem('_cat') || 'default';
        if(_category !== cat){
            setErrors('Invalid category selection');
            return;
        }
    }



    return <>
                <form onSubmit={handleSubmit}>
                    <h3>Categories</h3>
                    <select value={selectVal} onChange={(e)=>setSelectVal(e.target.value)}>
                        {
                            categories?.map((c)=>
                                    <option key={c._id} value={c.name}>{c.name}</option>
                            )
                        }
                        
                    </select>

                    <h3>Add Task in {selectVal}  category.</h3>
                    <input type="text"
                    value={task}
                    onChange={handleInputChange(setTask)}
                    placeholder="Enter Task"
                    />
                    <div>
                        <button type="submit">Add Task</button>
                    </div>
                </form>
          </>
}