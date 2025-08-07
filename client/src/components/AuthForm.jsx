import React,{useState, useContext} from "react";
import {Button} from './Button'
import { TaskContext } from "../context/TaskContext";

export const AuthForm = () => {
    const [formData,setFormData] = useState({email:'',password:''});
    const [isSignUp,setIsSignUp] = useState(false);
    const {handleSignIn, handleSignUp} = useContext(TaskContext);
    const handleSubmit = async (e)=>{
        if(isSignUp){
            await handleSignUp(formData);
        }else{
            await handleSignIn(formData);
        }
    }
    return <form onSubmit={handleSubmit}>
                <h3>{isSignUp?'Sign Up':'Log In'}</h3>
                <div>
                    <input 
                    type="text"
                    value={formData.email}
                    onChange={(e)=>{
                        setFormData({
                            ...formData,
                            email:e.target.value,
                        })
                    }}
                    placeholder="Enter email"
                    />
                </div>
                <div>
                    <input
                    type="text"
                    value={formData.password}
                    onChange={(e)=>{
                        setFormData({
                            ...formData,
                            password:e.target.value
                        })
                    }}
                    />
                </div>
                <div>
                    <Button type={submit} content={isSignUp?'Sign Up':'Log In'}/>
                </div>
                    <button onClick={()=>{setIsSignUp(!isSignUp)}}>
                        {isSignUp?'Switch to Sign Up':'Switch to Log In'}
                    </button>
           </form>
}