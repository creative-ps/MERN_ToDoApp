import React,{createContext, useState, useEffect} from "react";
import { fetchTasks,createTask,deleteTask,updateTaskStatus, updateTask, logIn, signUp, fetchUser, fetchAllUsers, handleAddCategory, getAllCategories} from "../AppServices/AppService";
// import {AuthForm} from '../components/AuthForm';
export const TaskContext = createContext();
// import { AppErrors } from "../GlobalErrorsAndSuccess";
import { handleSavePermissions } from '../AppServices/AppService';

export const TaskProvider = ({children})=>{
    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState(null);
    const [success,setSuccess] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
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
                    // try{
                    //     const data = await fetchTasks();
                    //     setTasks(data);
                    // }catch(error){
                       
                    //     setErrors(error.message);
                    // }
                };
                loadData();
                getCategories();
            }
        },[isAuthenticated]);
        


    const loadTask = async (catId)=>{
        setErrors(null);
        try{
            const data = await fetchTasks(catId);
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

   const fetchUsers = async (page,limit)=>{
        try{
            const data = await fetchAllUsers(page,limit);
            const allUsers = data.allUsers;
            const initialPermissions = {};
            allUsers.forEach((user)=>{
                initialPermissions[user._id] = {
                    create:user.permissions.includes('create'),
                    edit:user.permissions.includes('edit'),
                    delete:user.permissions.includes('delete'),
                    update:user.permissions.includes('update')
                }
            })
            setAllUsers(allUsers);
            setTotalPages(data.totalPages)
            setPermissions(initialPermissions);
        }catch(err){
            setErrors(err.message);
        }
   }

   const permissionsAllowed = async (userId,permissions)=>{
        try{
            await handleSavePermissions(userId,permissions);
            fetchUsers();
        }catch(err){
            setErrors(err.message);
        }
   }

   const addCategory = async (category)=>{
        try{
           const data = await handleAddCategory(category);
            setSuccess('Category added successfully.')
        }catch(err){
            setErrors(err.message);
        }
   }

   const getCategories = async () => {
        try{
            const data = await getAllCategories();
            setCategories(data);
        }catch(err){
            setErrors(err.message);
        }
   }

    // if(!isAuthenticated){
    //     return  <>
    //                 <AppErrors errors={errors} success={success}/>
    //                 <AuthForm handleSignIn={handleSignIn} handleSignUp={handleSignUp}/>
    //             </>;
    // }

    return <TaskContext.Provider value = {{tasks,success,setSuccess, errors, setErrors, isAuthenticated, setIsAuthenticated,
    addTask, removeTask, toggleTaskStatus,updateTitleDescription,handleSignIn,handleSignUp, handleLogout, user, setUser, allUsers,fetchUsers, permissions, setPermissions, permissionsAllowed,totalPages, addCategory, categories, setCategories, getCategories,loadTask}}>
            {children}
           </TaskContext.Provider>
}
