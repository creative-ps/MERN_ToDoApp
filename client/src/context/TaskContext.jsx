import React,{createContext, useState, useEffect} from "react";
import { fetchTasks,createTask,deleteTask,updateTaskStatus, updateTaskContent, logIn, signUp, fetchUser, fetchAllUsers, handleAddCategory, getAllCategories} from "../AppServices/AppService";
export const TaskContext = createContext();
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

    const addTask = async (selectVal, task, catId)=>{
        try{
             const newTasks = await createTask(selectVal, task, catId);
             loadTask(catId);
             setSuccess('Task created successfully.')
        }catch(err){
             setErrors(err.message)
        }

    }

    const removeTask = async (taskId,catId)=>{
        try{
            const data = await deleteTask(taskId);
            const deletedTaskId = data.data.catId;
            setSuccess(data.message);
            loadTask(catId);
        }catch(err){
            setErrors(err.message);
        }
    }

   const toggleTaskStatus = async (taskId, completed, catId)=>{
        try{
            const data = await updateTaskStatus(taskId, !completed);
            loadTask(catId);
            setSuccess('Task status updated successfully.')
        }catch(err){
            setErrors(err.message);
        }
   }

   const updateTask = async (taskId, updatedContent, catId)=>{
        try{
            const data = await updateTaskContent(taskId, updatedContent);
            const updatedTask = data.data;
            loadTask(catId);
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
            setTasks([]);
            setCategories([]);
            setAllUsers([]);
            setPermissions({});
            setTotalPages(0);
            setErrors(null);
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
            const data = await handleSavePermissions(userId,permissions);
            // await fetchUsers();
            setSuccess(data.message || 'Permission updated successfully.');
        }catch(err){
            setErrors(err.message);
        }
   }

   const addCategory = async (category)=>{
        try{
           const data = await handleAddCategory(category);
            setSuccess('Category added successfully.')
            getCategories();
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
    addTask, removeTask, toggleTaskStatus,updateTask,handleSignIn,handleSignUp, handleLogout, user, setUser, allUsers,fetchUsers, permissions, setPermissions, permissionsAllowed,totalPages, addCategory, categories, setCategories, getCategories,loadTask}}>
            {children}
           </TaskContext.Provider>
}
