import React,{useState, useContext} from "react";
import {Button} from './Button'
import { TaskContext } from "../context/TaskContext";

export const AuthForm = () => {
    const [formData,setFormData] = useState({email:'',password:''});
    const [isSignUp,setIsSignUp] = useState(false);
    const {handleSignIn, handleSignUp} = useContext(TaskContext);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(isSignUp){
            console.log('signup')
            await handleSignUp(formData);
        }else{
            console.log('login')
            await handleSignIn(formData);
        }
    }
    return <>
            <form onSubmit={handleSubmit}>
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
                    type="password"
                    value={formData.password}
                    onChange={(e)=>{
                        setFormData({
                            ...formData,
                            password:e.target.value
                        })
                    }}
                    placeholder="Enter password"
                    />
                </div>
                <div>
                    <Button type={'submit'} content={isSignUp?'Sign Up':'Log In'}/>
                </div>
           </form>
           <button onClick={()=>{
            setIsSignUp(!isSignUp)
            setFormData({email:'',password:''})
            }}>
                {isSignUp?'Switch to Log In':'Switch to Sign Up'}
            </button>
          </>
}