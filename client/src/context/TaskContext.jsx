import React,{createContext, useState, useEffect} from "react";
import { fetchTasks,createTask,deleteTask,updateTaskStatus, updateTask, logIn, signUp, fetchUser} from "../TaskServices/TaskService";
import {AuthForm} from '../components/AuthForm';
export const TaskContext = createContext();
import { AppErrors } from "../GlobalErrorsAndSuccess";

export const TaskProvider = ({children})=>{
    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState(null);
    const [success,setSuccess] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    useEffect(()=>{
            if(isAuthenticated){
                const loadData = async ()=>{
                    try{  
                        const user = await fetchUser();
                        setUser(user);
                    }catch(error){ 
                        setErrors(error.message);
                        handleLogout()
                    }
                    try{
                        const data = await fetchTasks();
                        setTasks(data);
                    }catch(error){
                       
                        setErrors(error.message);
                    }
                };
                loadData();
            }
        },[isAuthenticated]);
        


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
             setSuccess('Task created successfully.')
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
            setSuccess('Task status updated successfully.')
        }catch(err){
            setErrors(err.message);
        }
   }

   const updateTitleDescription = async (taskId, updatedContent)=>{
        try{
            const data = await updateTask(taskId, updatedContent);
            const updatedTask = data.data;
            setTasks(tasks.map((task)=>(task.id == updatedTask.id)?{...task,title:updatedTask.title,description:updatedTask.description}:task));
            setSuccess(data.message)
        }catch(err){
            setErrors(err.message);
        }
   }

   const handleSignUp = async (formData) => {
        try{
            const {user, token} = await signUp(formData);
            localStorage.setItem('token',token);
            setIsAuthenticated(true);
            setUser(user);
            setSuccess('Signed up successfully.')
        }catch(err){
            setErrors(err.message)
            console.log(err.message,'err');
        }
   }

   const handleSignIn = async (formData) => {
        try{
            const {user, token} = await logIn(formData);
            localStorage.setItem('token',token);
            setIsAuthenticated(true);
            setUser(user);
            setSuccess('Logged in successfully.')
        }catch(err){
            setErrors(err.message)
        }
   }

   const handleLogout = ()=>{
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
            setSuccess('Logged out successfully.')
   }

    // if(!isAuthenticated){
    //     return  <>
    //                 <AppErrors errors={errors} success={success}/>
    //                 <AuthForm handleSignIn={handleSignIn} handleSignUp={handleSignUp}/>
    //             </>;
    // }

    return <TaskContext.Provider value = {{tasks,success,setSuccess, errors, setErrors, loadTask, isAuthenticated, setIsAuthenticated,
    addTask, removeTask, toggleTaskStatus,updateTitleDescription,handleSignIn,handleSignUp, handleLogout, user, setUser}}>
            {children}
           </TaskContext.Provider>
}
