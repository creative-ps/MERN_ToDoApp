import React,{ useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';


export const AdminPanel = ()=>{
    const {user, allUsers, fetchUsers, permissions, setPermissions, permissionsAllowed, totalPages, setErrors, setSuccess, errors} = useContext(TaskContext);
    const [page,setPage] = useState(1);

    

    useEffect(()=>{
        setErrors('')
        setSuccess('')
        fetchUsers(page,15);
    },[page]);


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
        
    return  <div className='mt-[15px] pl-[15px] sm:pl-[55px] sm:mt-[25px]'>
                <h3 className='font-medium border-b-1 border-gray-500 text-lg pb-1 mb-3 sm:w-[675px] sm:max-w-[100%]'>Admin panel</h3>
                <table>
                    <thead>
                        <tr className='text-left'>
                            <th className='w-[50px]'>S.no</th>
                            <th className='w-[200px]'>User</th>
                            <th className='w-[70px]'>Role</th>
                            <th className='w-[300px]'>Permissions</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      allUsers.map((user,index)=>
                        <tr key={user._id}>
                            <td>{index+1}</td>
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
                                <button 
                                    onClick={()=>{permissionsAllowed(user._id,permissions[user._id])}}
                                    className='border-1 rounded-md bg-blue-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100'
                                >
                                    Save
                                </button>}
                            </td>
                        </tr>
                      )  
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
                    className='border-1 rounded-md bg-green-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100'
                    disabled={page === totalPages}
                    >Next</button>
                    <button 
                        onClick={()=>{
                        setPage((prev)=>Math.max(prev-1,1));}}
                        className='border-1 rounded-md bg-green-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100'
                        disabled={page === 1}
                    >
                    Previous</button>
                </div>
            </div>
}