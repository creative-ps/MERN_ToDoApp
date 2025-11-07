import React,{ useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Loading } from './LoadingIcon';
import { Checkbox } from './CheckBox';


export const AdminPanel = ()=>{
    const {allUsers, fetchUsers, permissions, setPermissions, permissionsAllowed, 
        totalPages, setErrors, setSuccess, loading, handleDeleteUser} = useContext(TaskContext);
    const [page,setPage] = useState(1);
    const [isCheckAllCheckBox, setIsCheckAllCheckBox] = useState(false);
    const [userFetch, setUserFetch] = useState(false);

    

    useEffect(()=>{
        fetchUsers(page,15);
    },[page,userFetch]);

    useEffect(()=>{
        return ()=>{
            setErrors('')
            setSuccess('')
        }
    },[])


    const handlePermissionsChange = (checked, userId, perm)=>{
        setPermissions((prev)=>{
            return {
                ...prev,
                [userId]:{
                    ...prev[userId],
                    [perm]:checked
                }
            }
        });
    }

    const handle_Delete_User = async (item)=>{
        const userConfirmation = window.confirm(`Are you sure you want to delete this user : ${item.email}`);
        if(userConfirmation){
            await handleDeleteUser(item);
            setUserFetch(!userFetch);
        }
    }

    return  <div className='mt-[15px] pl-[15px] sm:pl-[55px] sm:mt-[25px]'>
                <Loading _loading={loading}/>
                <div className='flex justify-between sm:w-[850px] sm:max-w-[100%] border-b-1 border-gray-500'>
                    <h3 className='font-medium text-lg pb-1 mb-3'>Admin panel</h3>
                    {isCheckAllCheckBox && <button className='border-1 rounded-md bg-red-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100 
                    disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'>
                        Delete All
                    </button>}
                </div>    
                <table>
                    <thead>
                        <tr className='text-left'>
                            <th className='w-[50px]'>S.no</th>
                            <th className='w-[200px]'>User</th>
                            <th className='w-[70px]'>Role</th>
                            <th className='w-[300px]'>Permissions</th>
                            <th className='text-center'>Action</th>
                            <th className='w-[120px]'>
                                <div className='flex justify-end mr-0.5'>
                                    <input 
                                        type='checkbox' 
                                        onChange={(e)=>{
                                                setIsCheckAllCheckBox(!isCheckAllCheckBox);
                                            }}
                                        checked={isCheckAllCheckBox}
                                    />
                                    <span className='mr-1.5 ml-1.5 inline-block text-nowrap'>Select All</span>   
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      allUsers.map((user,index)=> {
                        return (user.role !== 'admin')&&
                        <tr key={user._id}>
                            <td>{index}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {
                                    ['create','edit','delete','update'].map((perm)=>
                                        <label key={perm}>
                                            <span className='mr-1'>{perm}</span>
                                            <input type="checkbox" className='mr-3'
                                            checked = {permissions[user._id]?.[perm] ?? user.permissions.includes(perm)}
                                            onChange={(e)=>{handlePermissionsChange(e.target.checked, user._id, perm)}}
                                            />
                                        </label>
                                    )
                                }
                            </td>
                            <td>{
                                <>
                                    <button 
                                        onClick={()=>{
                                            permissionsAllowed(user._id,permissions[user._id]);
                                            }
                                        }
                                        className='border-1 rounded-md bg-blue-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100 
                                        disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={()=>{
                                            handle_Delete_User(user);
                                        }}
                                        className='border-1 rounded-md bg-red-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100 
                                        disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'>
                                        Delete
                                    </button>
                                </>
                                }
                            </td>
                             <td>
                                <div className='pl-6'>
                                    <span className='inline-block'>
                                        <Checkbox isCheckAllCheckBox={isCheckAllCheckBox} />
                                    </span>
                                </div>
                            </td>
                        </tr>
                        })  
                    }
                    </tbody>
                </table>
                <div className='sm:w-[675px] text-center mt-2 pt-2 text-sm'>
                    {page} of {totalPages} pages.
                </div>
                <div className='text-center sm:w-[675px] pb-3 pt-2'>
                    <button onClick={()=>{
                        setPage((prev)=>Math.min(prev+1,totalPages));
                    }}
                    className='border-1 rounded-md bg-green-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
                    disabled={page === totalPages}
                    >Next</button>
                    <button 
                        onClick={()=>{
                        setPage((prev)=>Math.max(prev-1,1));}}
                        className='border-1 rounded-md bg-green-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
                        disabled={page === 1}
                    >
                    Previous</button>
                </div>
            </div>
}