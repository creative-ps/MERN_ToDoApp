import React,{useState, useEffect} from "react";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import {toast} from 'react-toastify';
import { useParams, Navigate } from "react-router-dom";

export const TaskForm = ()=>{
    const [task, setTask] = useState("");
    const [selectVal, setSelectVal] = useState('')
    const {addTask, isAuthenticated, setErrors, setSuccess, categories, getCategories} = useContext(TaskContext);
    const {cat} = useParams();


    useEffect(()=>{
        setErrors(null);
        setSuccess(null);
        getCategories();
        {cat ? setSelectVal(cat):setSelectVal(categories[0]?.name)};
    },[]);

    

    if(categories.length === 0){
        return <Navigate to="/category"/>
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(task === ''){
            setErrors('Task is required.')
            return;
        }
        const cat = categories.find((o)=>o.name === selectVal);
        const catId = cat._id;
        
        await addTask(selectVal, task, catId);
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
                <form onSubmit={handleSubmit} className="sm:mt-[25px] mt-[15px] pl-3 sm:w-[455px] sm:max-w-[100%] sm:pl-[55px]">
                    <h3 className="font-medium border-b-1 border-gray-500 text-lg pb-1 mb-3 sm:w-[675px] sm:max-w-[100%]">Create Task.</h3>
                    <h3 className="font-normal text-md mt-3 mb-2 sm:mt-5">Categories</h3>
                    <select 
                    value={selectVal} 
                    onChange={(e)=>setSelectVal(e.target.value)}
                    className="border-1 mb-2 sm:mb-6 w-[400px]"
                    >
                        {
                            categories?.map((c)=>
                                    <option key={c._id} value={c.name}>{c.name}</option>
                            )
                        }
                        
                    </select>

                    <h3 className="mb-2">Add Task in <span className="font-medium">{selectVal}</span>  category.</h3>
                    <input 
                    type="text"
                    className="text-white w-[400px] p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid rounded-sm placeholder:text-gray-300 text-sm"
                    value={task}
                    onChange={handleInputChange(setTask)}
                    placeholder="Enter Task"
                    />
                    <div className="text-right">
                        <button type="submit" className="mt-3 border-1 rounded-md bg-green-600 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100">Add Task</button>
                    </div>
                </form>
          </>
}