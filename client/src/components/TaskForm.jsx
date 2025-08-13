import React,{useState, useEffect} from "react";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import {toast} from 'react-toastify';

export const TaskForm = ()=>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {addTask, errors, setErrors, setSuccess} = useContext(TaskContext);

    useEffect(()=>{
        setErrors(null);
        setSuccess(null);
    },[]);

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

    

    return <>
                <form onSubmit={handleSubmit}>
                    <h3>Create Task</h3>
                    <input type="text"
                    value={title}
                    onChange={handleInputChange(setTitle)}
                    placeholder="Enter Title"
                    />

                    <h3>Description</h3>
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