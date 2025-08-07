import React,{createContext, useState, useEffect} from "react";
import { fetchTasks,createTask,deleteTask,updateTaskStatus, updateTask, login, signUp} from "../TaskServices/TaskService";
export const TaskContext = createContext();

export const TaskProvider = ({children})=>{
    useEffect(()=>{
        loadTask();
    },[])
    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState(null);
    const [success,setSuccess] = useState(null);

    const loadTask = async ()=>{
        setErrors(null);
        try{
            const data = await fetchTasks();
            setTasks(data)
        }catch(err){
            setErrors(err.message)
        }
    }

    const addTask = async (taskData)=>{
        try{
             const newTasks = await createTask(taskData);
             setTasks([...tasks, newTasks]);
        }catch(err){
             setErrors(err.message)
        }

    }

    const removeTask = async (taskId)=>{
        try{
            const data = await deleteTask(taskId);
            const deletedTaskId = data.data.id;
            setSuccess(data.message);
            setTasks(tasks.filter((task)=>task.id !== deletedTaskId))
        }catch(err){
            setErrors(err.message);
        }
    }

   const toggleTaskStatus = async (taskId, completed)=>{
        try{
            const data = await updateTaskStatus(taskId, !completed);
            setTasks(tasks.map((task)=>task.id == data.id?{...task,completed:data.completed}:task));
        }catch(err){
            setErrors(err.message);
        }
   }

   const updateTitleDescription = async (taskId, updatedContent)=>{
        try{
            const data = await updateTask(taskId, updatedContent);
            const updatedTask = data.data;
            setTasks(tasks.map((task)=>(task.id == updatedTask.id)?{...task,title:updatedTask.title,description:updatedTask.description}:task));
        }catch(err){
            setErrors(err.message);
        }
   }

   const handleSignIn = async (formData) => {
        try{
            const data = await login(formData);
        }catch(err){
            setErrors(err.message)
        }
   }

   const handleSignUp = async (formData) => {
        try{
            const data = await signUp(formData);
        }catch(err){
            setErrors(err.message)
        }
   }

    return <TaskContext.Provider value = {{tasks,success,setSuccess, errors, setErrors, loadTask, 
    addTask, removeTask, toggleTaskStatus,updateTitleDescription,handleSignIn,handleSignUp}}>
            {children}
           </TaskContext.Provider>
}
