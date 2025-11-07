import React,{createContext, useState, useEffect} from "react";
import { fetchTasks,createTask,deleteTask,updateTaskStatus, updateTaskContent, logIn, signUp, 
    fetchUser, fetchAllUsers, handleAddCategory, getAllCategories, deleteUser} from "../AppServices/AppService";
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
    const [loading, setLoading] = useState(false);
    const [emptyTaskList, setEmptyTaskList] = useState(false);
    const [emptyCategoryList, setEmptyCategoryList] = useState(false);

    

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
            setLoading(true);
            const data = await fetchTasks(catId);
            setLoading(false);
            if(data.length === 0){
                setEmptyTaskList(true);
                setErrors('No tasks in this category.')
            }else{
                setEmptyTaskList(false);
                setTasks(data);
            }
        }catch(err){
            setLoading(false);
            setErrors(err.message)
        }
    }

    const addTask = async (selectVal, task, catId)=>{
        try{
            setLoading(true);
             const newTasks = await createTask(selectVal, task, catId);
            setLoading(false);
             setSuccess('Task created successfully.')
        }catch(err){
            setLoading(false);
             setErrors(err.message)
        }

    }

    const removeTask = async (taskId,catId)=>{
        try{
            setLoading(true);
            const data = await deleteTask(taskId);
            const deletedTaskId = data.data.catId;
            setSuccess(data.message);
            await loadTask(catId);
        }catch(err){
            setLoading(false);
            setErrors(err.message);
        }
    }

   const toggleTaskStatus = async (taskId, completed, catId)=>{
        try{
            setLoading(true);
            const data = await updateTaskStatus(taskId, !completed);
            await loadTask(catId);
            setSuccess('Task status updated successfully.')
        }catch(err){
            setLoading(false);
            setErrors(err.message);
        }
   }

   const updateTask = async (taskId, updatedContent, catId)=>{
        try{
            setLoading(true);
            const data = await updateTaskContent(taskId, updatedContent);
            const updatedTask = data.data;
            await loadTask(catId);
            setSuccess(data.message)
        }catch(err){
            setLoading(false);
            setErrors(err.message);
        }
   }

   const handleSignUp = async (formData) => {
        try{
            setLoading(true);
            const {user, token} = await signUp(formData);
            setLoading(true);
            localStorage.setItem('token',token);
            localStorage.setItem('signUpUser','signUpUser');
            setIsAuthenticated(true);
            setUser(user);
            setSuccess('Signed up successfully.')
        }catch(err){
            setLoading(false);
            setErrors(err.message)
        }
   }

   const handleSignIn = async (formData) => {
        try{
            setLoading(true);
            const {user, token} = await logIn(formData);
            setLoading(false);
            localStorage.setItem('token',token);
            setIsAuthenticated(true);
            setUser(user);
            setSuccess('Logged in successfully.')
        }catch(err){
            setLoading(false);
            setErrors(err.message)
        }
   }

   const handleLogout = ()=>{
            setLoading(false);
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
            setLoading(true);
            const data = await fetchAllUsers(page,limit);
            setLoading(false);
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
            setLoading(false);
            setErrors(err.message);
        }
   }

   const handleDeleteUser = async (item)=>{
        try{
            setLoading(true);
            const delete_user = await deleteUser(item);
            console.log(delete_user,'delete_user');
            setSuccess(delete_user.message);
            setLoading(false);
        }catch(error){
            setErrors(false);
            setErrors(error.message);
        }
   }

   const permissionsAllowed = async (userId,permissions)=>{
        try{
            setLoading(true);
            const data = await handleSavePermissions(userId,permissions);
            setLoading(false);
            // await fetchUsers();
            setSuccess(data.message || 'Permission updated successfully.');
        }catch(err){
            setLoading(false);
            setErrors(err.message);
        }
   }

   const addCategory = async (category)=>{
        try{
            setLoading(true);
           const data = await handleAddCategory(category);
           setLoading(false);
            setSuccess('Category added successfully.')
            await getCategories();
        }catch(err){
            setLoading(false);
            setErrors(err.message);
        }
   }

   const getCategories = async () => {
        try{
            setLoading(true);
            const data = await getAllCategories();
            if(data.length === 0){
                setEmptyCategoryList(true);
                // setErrors('Category list is empty.')
            }else{
                setEmptyCategoryList(false);
                setCategories(data);
            }
            setLoading(false);
        }catch(err){
            setLoading(false);
            setErrors(err.message);
        }
   }

    // if(!isAuthenticated){
    //     return  <>
    //                 <AppErrors errors={errors} success={success}/>
    //                 <AuthForm handleSignIn={handleSignIn} handleSignUp={handleSignUp}/>
    //             </>;
    // }

    return <TaskContext.Provider value = {{tasks,success,setSuccess, errors, setErrors, isAuthenticated, setIsAuthenticated, setTasks, 
    addTask, removeTask, toggleTaskStatus,updateTask,handleSignIn,handleSignUp, handleLogout, user, setUser, allUsers,fetchUsers, permissions, 
    setPermissions, permissionsAllowed,totalPages, addCategory, categories, setCategories, getCategories,loadTask, loading, setLoading,
    emptyTaskList,emptyCategoryList,setEmptyTaskList,handleDeleteUser}}>
            {children}
           </TaskContext.Provider>
}
