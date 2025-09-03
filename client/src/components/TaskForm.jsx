import React,{useState, useEffect} from "react";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import {toast} from 'react-toastify';
import { useParams } from "react-router-dom";

export const TaskForm = ()=>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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
        setSelectVal(cat);
    },[]);
    // console.log(cat,"query");

    console.log(categories,"create category");
   
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(title === '' && description === ''){
            setErrors('Title and Description are required.')
            return;
        }
        if(title === ''){
            setErrors('Title is required.')
            return;
        }
        if(description === ''){
            setErrors('Description is required.')
            return;
        }
        
        
            await addTask({title,description});
            setTitle('');
            setDescription('');
    }

    const handleInputChange = (setter)=>(event)=>{
        setter(event.target.value)
        setErrors('')
    }

    const _category = localStorage.getItem('_cat') || 'default';
        if(_category !== cat){
            setErrors('Invalid category selection');
            return;
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

                    <h3>Add Task in {selectVal} {!selectVal?categories[0]?.name:''}  category.</h3>
                    <input type="text"
                    value={description}
                    onChange={handleInputChange(setDescription)}
                    placeholder="Enter Description"
                    />
                    <div>
                        <button type="submit">Add Task</button>
                    </div>
                </form>
          </>
}