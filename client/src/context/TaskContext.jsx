import React,{createContext, useState, useEffect} from "react";
import { fetchTasks,createTask,deleteTask,updateTaskStatus, updateTask, logIn, signUp} from "../TaskServices/TaskService";
export const TaskContext = createContext();

export const TaskProvider = ({children})=>{
    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState(null);
    const [success,setSuccess] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(()=>{
            if(isAuthenticated){
                loadTask();
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

   const handleSignUp = async (formData) => {
        try{
            const {user, token} = await signUp(formData);
            console.log('handleSignUp',user,token,formData);
            localStorage.setItem('token',token);
            setIsAuthenticated(true);
            setUser(user);
            setSuccess('Signed up successfully.')
        }catch(err){
            setErrors(err.message)
        }
   }

   const handleSignIn = async (formData) => {
        try{
            const {user, token} = await logIn(formData);
            localStorage.getItem('token',token);
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

    return <TaskContext.Provider value = {{tasks,success,setSuccess, errors, setErrors, loadTask, 
    addTask, removeTask, toggleTaskStatus,updateTitleDescription,handleSignIn,handleSignUp, handleLogout}}>
            {children}
           </TaskContext.Provider>
}
