    const API_URL = import.meta.env.VITE_API_URL

    const getAuthHeader = ()=>{
        const token = localStorage.getItem('token');
        return (token) ? {Authorization : `Bearer ${token}`} : {};
    }
    
     export const fetchTasks = async ()=>{
        try{
            const response = await fetch(`${API_URL}/tasks`,{
                method:'GET',
                headers:{
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            if(!response.ok){
                // Handle HTTP Errors (e.g., 400,500,503)
                throw new Error(data.message ||'unable to fetch tasks.'); 
            }
            return data.data;
        }catch(error){
            // Handle Network Errors (e.g., CORS, Server down, no-internet connection, DNS resolution failure)
            if(error.message === 'Failed to fetch'){
                throw new Error('Network error: Unable to reach the server.')
            }
            throw error;
        }
    }

    export const createTask = async (taskData) => {

        try{
            const response = await fetch(`${API_URL}/tasks`,{
                method:'POST',
                headers:{
                'Content-Type':'application/json',
                ...getAuthHeader(),
                },
                body:JSON.stringify(taskData)
            });

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || 'unable to create task.');
            }
                return data.data;
            
        }catch(error){
            if(error.message === 'Failed to fetch'){
                throw new Error('Network error: Unable to reach the server.')
            }
            throw error;
        }
    }

    export const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${taskId}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    ...getAuthHeader()
                },
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || 'unable to delete task.')
            }
            return data;
        }catch(error){
            if(error.message == 'Failed to fetch'){
                throw new Error ('Network error: Unable to reach the server.');
            }
            throw error;
        }
    }

    export const updateTaskStatus = async (taskId, completed) => {
        try{
            const response = await fetch(`${API_URL}/tasks/${taskId}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    ...getAuthHeader()
                },
                body:JSON.stringify({completed})
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || 'unable to update task status.')
            }
            return data.data;
        }catch(error){
            if(error.message == 'Failed to fetch'){
                throw new Error ('Network error: Unable to reach the server.');
            }
            throw error;
        }
    }

    export const updateTask = async (taskId, updatedContent)=>{
        try{
            const response = await fetch(`${API_URL}/tasks/${taskId}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    ...getAuthHeader(),
                },
                body:JSON.stringify(updatedContent)
            })
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || 'unable to update task.');
            }
            return data;
        }catch(error){
            if(error.message == 'Failed to fetch'){
                throw new Error ('Network error: Unable to reach the server.');
            }
            throw error;
        }
    }

    export const signUp = async (formData) => {
        try{
            const response = await fetch(`${API_URL}/auth/signup`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await response.json();
            if(!response.ok){
                const error = new Error(data.message || 'invalid user name or password');
                throw error;
            }
            return data;
        }catch(error){
            if(error.message == 'Failed to fetch'){
                throw new Error ('Network error: Unable to reach the server.');
            }
            throw error;
        }
    }

    export const logIn = async (formData) => {
        try{
            const response = await fetch(`${API_URL}/auth/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            });
            const data = await response.json();
            if(!response.ok){
                const error = new Error(data.message || 'invalid user name or password');
                throw error;
            }
            return data;
        }catch(error){
            if(error.message == 'Failed to fetch'){
                throw new Error ('Network error: Unable to reach the server.');
            }
            throw error;
        }
    }

    export const fetchUser = async ()=>{
        const response = await fetch(`${API_URL}/user`,{
            method:'GET',
            headers:{
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json()
        if(!response.ok){
            throw new Error (data.message || 'failed to fetch user data.')
        }

        return data;
    }
    
    export const fetchAllUsers = async (page,limit)=>{
            const response = await fetch(`${API_URL}/admin/users?page=${page}&limit=${limit}`,{
                method:'GET',
                headers:{
                    ...getAuthHeader(),
                    'Content-Type':'application/json'
                }
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error (data.message || 'failed to fetch users data.')
            }
            return data;
    }

    export const validPermissions = (allPermissions, getPermissions)=>{
        return allPermissions.filter((p)=>getPermissions[p]);
    }

    export const handleSavePermissions = async (userId, getPermissions)=>{
        const allPermissions = Object.keys(getPermissions?getPermissions:{});
        if(allPermissions.length>0){
            const permissionsAllowed = validPermissions(allPermissions,getPermissions);
            const response = await fetch(`${API_URL}/admin/${userId}/permissions`,{
                method:'PATCH',
                headers:{
                    ...getAuthHeader(),
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(permissionsAllowed)
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error (data.message || 'failed to save permissions data.')
            }
            return data;
        }
    }

    export const handleAddCategory = async (category) => {
        const response = await fetch(`${API_URL}/category`,{
            method:'POST',
            headers:{
                    ...getAuthHeader(),
                    'Content-Type':'application/json'
                },
            body:JSON.stringify({name:category})
        });
        const data = await response.json();
        if(!response.ok){
            throw new Error (data.message || 'failed to save permissions data.')
        }
        return data;
    }

    export const getAllCategories = async () => {
        const response = await fetch(`${API_URL}/categories`,{
            method:'GET',
            headers:{
                    ...getAuthHeader(),
                    'Content-Type':'application/json'
                }
        });
        const data = await response.json();
        if(!response.ok){
            throw new Error (data.message || 'failed to fetch categories.')
        }
        return data;
    }