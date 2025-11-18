import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
const BaseUrl = import.meta.env.VITE_BASE_API_URL;
const PageNotFound = ()=>{
    const params = useParams();
    const catchAll = params['*'];
    useEffect(()=>{
        anonymusRoute();
    },[]);
    const [msg, setMsg] = useState('');
    const anonymusRoute = async ()=>{
        const response = await fetch(`${BaseUrl}/${catchAll}`,{
            method:'GET',
        });
            const err = await response.json();
            setMsg(err.message);
    }
    return <div className="flex flex-col items-center text-4xl">
                <h1 className='mb-3'>404 - Page Not Found</h1>
                <p className="mb-5 text-3xl">Sorry, we {msg}</p>
                <a className="inline-block text-3xl font-bold" href="/">Go Home</a>
           </div>
}

export default PageNotFound;