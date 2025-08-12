import React from "react";
import { TaskContext } from "../context/TaskContext";
import { useContext,useEffect,useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import {AuthForm} from './AuthForm'
export default function TaskList(){
    const {tasks, setErrors, removeTask, success, setSuccess, toggleTaskStatus,updateTitleDescription, isAuthenticated,handleLogout,user} = useContext(TaskContext);
    useEffect(()=>{
        setErrors(null)
        setSuccess(null)
    },[])
    const [editTaskId, setEditTaskId] = useState(null);
    const [editForm, setEditForm] = useState({title:'',description:''});
    
// console.log('TaskList.....',isAuthenticated);
    if(!isAuthenticated){
        return <AuthForm/>;
    }

    const handleTaskDetails = (task)=>{
        setEditTaskId(task.id);
        setEditForm({title:task.title,description:task.description})
    }
    const handleSave = async ()=>{
       await updateTitleDescription(editTaskId,editForm);
       setEditTaskId(null);
       setEditForm({title:'',description:''});
    };
    const handleCancle = ()=>{
        setEditTaskId(null);
        setEditForm({title:'',description:''});
    }
   
    
    return <>
            <div>
                <p>Logged in as: {user?user.email:''}</p>
                <Button type={'button'} handleClick={handleLogout} content={'Logout'}/>
            </div>
            {success}
            {tasks.length == 0 ? 'Tasks list is empty' : 
            <ul>
                {
                    tasks.map((task)=><li 
                    key={task.id}>
                    {editTaskId === task.id?(
                        <div>
                            <input type="text" value={editForm.title} onChange={(e)=>{setEditForm({...editForm, title:e.target.value})}}/>
                            <input type="text" value={editForm.description} onChange={(e)=>{setEditForm({...editForm,description:e.target.value})}}/>
                            <button type="button" onClick={()=>handleSave(task.id)}>Save</button><button type="button" onClick={handleCancle}>cancle</button>
                        </div>    
                    ) : (
                    <>
                        <span className="title">{task.title}</span>  
                        {task.description}
                        <Button type="button" className="deleteBtn" handleClick={()=>{removeTask(task.id)}} content="Delete"/>
                        <Button type="button" className="toggleBtn" handleClick={()=>{toggleTaskStatus(task.id,task.completed)}} content={task.completed?'Completed':'Pending'}/>
                        <Button type="button" className="updateButton" handleClick={()=>{handleTaskDetails(task)}}  content="Update"/>
                    </>
                    )}
                    </li>
                    )
                }
            </ul>
            }
            </>

}