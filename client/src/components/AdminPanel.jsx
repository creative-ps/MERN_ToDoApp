import React,{ useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';


export const AdminPanel = ()=>{
    const {allUsers, fetchUsers, isAuthenticated, permissions, setPermissions, permissionsAllowed} = useContext(TaskContext);

    if(!isAuthenticated){
        return;
    }

    useEffect(()=>{
        fetchUsers();
    },[]);

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
        
    return  <div>
                <h3>Admin panel</h3>
                <table>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Permissions</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      allUsers.map((user)=>
                        <tr key={user.id}>
                            <td></td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {
                                    ['create','edit','delete','update'].map((perm)=>
                                        <label key={perm}>
                                            <span>{perm}</span>
                                            <input type="checkbox"
                                            checked = {permissions[user.id]?.[perm] ?? user.permissions.includes(perm)}
                                            onChange={(e)=>{handlePermissionsChange(e.target.checked, user.id, perm)}}
                                            />
                                        </label>
                                    )
                                }
                            </td>
                            <td>{<button onClick={()=>{permissionsAllowed(user.id,permissions[user.id])}}>Save</button>}</td>
                        </tr>
                      )  
                    }
                    </tbody>
                </table>
            </div>
}