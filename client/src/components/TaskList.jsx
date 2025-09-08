import React from "react";
import { TaskContext } from "../context/TaskContext";
import { useContext,useEffect,useState } from "react";
import { Button } from "./Button";

export default function TaskList(){
    
    const {tasks, setErrors, removeTask, setSuccess, toggleTaskStatus,updateTask, categories,loadTask} = useContext(TaskContext);
    
    useEffect(()=>{
        setErrors(null)
        setSuccess(null)
    },[])

    
    const [editTaskId, setEditTaskId] = useState(null);
    const [editForm, setEditForm] = useState({title:''});
    

    const handleTaskDetails = (task)=>{
        setEditTaskId(task.id);
        setEditForm({title:task.title})
    }
    const handleSave = async (catId)=>{
       await updateTask(editTaskId,editForm,catId);
       setEditTaskId(null);
       setEditForm({title:''});
    };
    const handleCancle = ()=>{
        setEditTaskId(null);
        setEditForm({title:''});
    }

    const handleFetchTask = (catId) => {
        loadTask(catId);
    }
    return <>           {categories.length == 0 ? <div>Categories list is empty</div> :
                            <ul>
                                {
                                    categories.map((c)=>
                                        <li key={c._id} 
                                        onClick={()=>{
                                        handleFetchTask(c._id)
                                        }}>
                                            {c.name}
                                        </li>
                                        
                                    )
                                }
                            </ul>
                        }
                        {tasks.length == 0 ? <div>Tasks list is empty</div> : 
                            <ul>
                                {
                                    tasks.map((task)=>{
                                            return <li 
                                            key={task.title}>
                                            {editTaskId === task.id?(
                                                <div>
                                                    <input type="text" value={editForm.title} onChange={(e)=>{setEditForm({...editForm, title:e.target.value})}}/>
                                                    <button type="button" onClick={()=>handleSave(task.catId)}>Save</button><button type="button" onClick={handleCancle}>cancle</button>
                                                </div>    
                                            ) : (
                                            <>
                                                <span className="title">{task.title}</span>  
                                                <Button type="button" className="deleteBtn" handleClick={()=>{removeTask(task.id, task.catId)}} content="Delete"/>
                                                <Button type="button" className="toggleBtn" handleClick={()=>{toggleTaskStatus(task.id,task.completed,task.catId)}} content={task.completed?'Completed':'Pending'}/>
                                                <Button type="button" className="updateButton" handleClick={()=>{handleTaskDetails(task)}}  content="Edit"/>
                                            </>
                                            )}
                                            </li>
                                    
                                    }
                                    )
                                }
                            </ul>
                        }
                    
            </>

}