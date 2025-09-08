import React,{useState, useEffect} from "react";
import {Button} from './Button'
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
    const [formData,setFormData] = useState({email:'',password:'',rePassword:''});
    const [isSignUp,setIsSignUp] = useState(false);
    const {handleSignIn, handleSignUp, isAuthenticated} = useContext(TaskContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated){
            console.log('authform');
            navigate('/tasklist');
        }   
    },[isAuthenticated]);


    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(isSignUp){
            await handleSignUp(formData);
        }else{  
            await handleSignIn(formData);
        }
    }
    let rewritePassword = '';
    if(isSignUp){
        rewritePassword = <div>
                        <input
                        type="password"
                        value={formData.rePassword}
                        onChange={(e)=>{
                            setFormData({
                                ...formData,
                                rePassword:e.target.value
                            })
                        }}
                        placeholder="Re enter password"
                        />
                    </div>;
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
                {rewritePassword}
               
                <div>
                    <Button type={'submit'} content={isSignUp?'Sign Up':'Log In'}/>
                </div>
           </form>
           <button onClick={()=>{
            setIsSignUp(!isSignUp)
            setFormData({email:'',password:'',rePassword:''})
            }}>
                {isSignUp?'Switch to Log In':'Switch to Sign Up'}
            </button>
          </>
}