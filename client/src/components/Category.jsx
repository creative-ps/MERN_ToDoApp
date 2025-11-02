import React,{useState, useContext, useEffect} from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Category = ()=>{
    const [cat, setCat] = useState('');
    const {addCategory, setErrors, setSuccess, loading} = useContext(TaskContext);
    const navigate = useNavigate();
    
    useEffect(()=>{
        setErrors(null);
        setSuccess(null)
    },[])
   
    return <div className='mt-[15px] pl-[15px] sm:pl-[55px] sm:mt-[25px]'>
                <form>
                    <h3 className='font-medium border-b-1 border-gray-500 text-lg pb-1 sm:mb-5 mb-2 sm:w-[465px] sm:max-w-[100%]'>Create Category.</h3>
                    <div>
                        <input 
                        type="text" 
                        value={cat}
                        className="text-white w-[400px] p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid rounded-sm placeholder:text-gray-300 text-sm"
                        onChange={(e)=>{
                            setCat(e.target.value);
                            setErrors('');
                            setSuccess('');
                        }}
                        />
                        <span>
                            <Button 
                            type="button" 
                            isDisabled={loading?'disabled':''}
                            className={"border-1 ml-1.5 rounded-md bg-blue-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"}
                            handleClick={
                                async (e)=>{
                                    if(!cat){
                                        setErrors('Enter valid category.');
                                        return;
                                    }
                                    await addCategory(cat);
                                    localStorage.setItem('_cat',cat);
                                    navigate(`/create/${cat}`);
                                    }
                            }
                            content={loading?'Loading...':'Add Category'}
                            />
                        </span>
                    </div>
                </form>
           </div>
}
