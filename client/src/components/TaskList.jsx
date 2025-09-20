import React from "react";
import { TaskContext } from "../context/TaskContext";
import { useContext,useEffect,useState } from "react";
import { Button } from "./Button";
import { NavLink } from "react-router-dom";

export default function TaskList(){
    
    const {tasks, setErrors, setTasks, removeTask, setSuccess, toggleTaskStatus,updateTask, categories,loadTask} = useContext(TaskContext);
    
    useEffect(()=>{
        setTasks([])
        setErrors(null)
        setSuccess(null)
    },[])

    
    const [editTaskId, setEditTaskId] = useState(null);
    const [editForm, setEditForm] = useState({title:''});
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    

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

    
    return <>           {categories.length == 0 ? <div className="pl-3 sm:pl-6">Categories list is empty</div> :
                            <ul className="flex flex-wrap pl-2 pr-2 sm:pl-4 sm:py-3 border-y sm:my-4">
                                {
                                    categories.map((c)=>
                                        <li 
                                        className={`px-3 py-1 hover:cursor-pointer hover:font-medium ${activeCategoryId === c._id ? 'font-medium bg-blue-100' : ''}`} key={c._id} 
                                        onClick={()=>{
                                            setActiveCategoryId(c._id);    
                                            handleFetchTask(c._id);
                                        }}>
                                        {c.name}
                                        </li>
                                    )
                                }
                            </ul>
                        }
                        {tasks.length == 0 ? <div className="pl-3 sm:pl-6">Please select any task category.</div> : 
                            <ul className="pl-3 list-decimal sm:pl-[45px] sm:mt-5">
                                {
                                    tasks.map((task)=>{
                                            return <li 
                                            key={task.title}>
                                            {editTaskId === task.id?(
                                                <div>
                                                    <input type="text" className="text-white mr-2 p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid rounded-sm placeholder:text-gray-300 text-sm" value={editForm.title} onChange={(e)=>{setEditForm({...editForm, title:e.target.value})}}/>
                                                    <button type="button" className="border-1 rounded-md bg-green-600 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100" onClick={()=>handleSave(task.catId)}>Save</button>
                                                    <button type="button" className="border-1 rounded-md bg-gray-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100" onClick={handleCancle}>cancle</button>
                                                </div>    
                                            ) : (
                                            <>
                                                <div className="flex">
                                                    <div className="title mr-2 sm:mr-4 sm:max-w-[100%]] sm:w-[400px]">{task.title}</div>  
                                                    <div>
                                                        <Button type="button" className={"deleteBtn border-1 rounded-md bg-red-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100"} handleClick={()=>{removeTask(task.id, task.catId)}} content="Delete"/>
                                                        <Button type="button" className={"toggleBtn border-1 rounded-md bg-green-600 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100"} handleClick={()=>{toggleTaskStatus(task.id,task.completed,task.catId)}} content={task.completed?'Completed':'Pending'}/>
                                                        <Button type="button" className={"updateButton border-1 rounded-md bg-yellow-700 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100"} handleClick={()=>{handleTaskDetails(task)}}  content="Edit"/>
                                                    </div>
                                                </div>        
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