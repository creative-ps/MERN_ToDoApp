    const API_URL = import.meta.env.VITE_API_URL

     export const fetchTasks = async ()=>{
        try{
            const response = await fetch(`${API_URL}/tasks`)
            const data = await response.json()
            if(!response.ok){
                // Handle HTTP Errors (e.g., 400,500,503)
                throw newError(data.message ||'unable to fetch tasks.'); 
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
                    'Content-Type':'application/json'
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
                    'Content-Type':'application/json'
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

    export const login = async (formData) => {
        Promise.resolve('login...');
    }

    export const signUp = async (formData) => {
        Promise.resolve('signUp...');
    }
    