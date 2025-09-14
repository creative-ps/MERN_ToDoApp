import React,{useState, useEffect} from "react";
import { Button } from './Button'
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "./useFormValidation";

export const AuthForm = () => {
    const [isSignUp,setIsSignUp] = useState(false);
    const {handleSignIn, handleSignUp, isAuthenticated} = useContext(TaskContext);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(isAuthenticated){
            console.log('authform');
            navigate('/tasklist');
        }   
    },[isAuthenticated]);
    let initialState = {email:'',password:'',rePassword:''}
    const fieldRules = {
        email:['required','email'],
        password:['required','password',],
        rePassword:['required','password','comparePasswords']
    }
    const {handleOnChange, formErrors, validateAllFields, formData, setFormData, setFormErrors} = useFormValidation(initialState,fieldRules);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let isValid = validateAllFields();
            console.log('isValid',isValid);

        if(isValid){
            if(isSignUp){
                await handleSignUp(formData);
            }else{  
                await handleSignIn(formData);
            }
        }
    }

    let rewritePassword = '';

    if(isSignUp){
        rewritePassword = <div>
                            <input
                            type="password"
                            name="rePassword"
                            value={formData.rePassword}
                            onChange= {handleOnChange}
                            placeholder="Re enter password"
                            />
                            <div className="form-error">{formErrors['rePassword']?formErrors['rePassword']:''}</div>
                         </div>;
    }
    
    
    return <>
            <form onSubmit={handleSubmit}>
                <h3>{isSignUp?'Sign Up':'Log In'}</h3>
                <div>
                    <input 
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                    placeholder="Enter email"
                    />
                    <div className="form-error">{formErrors['email']?formErrors['email']:''}</div>
                </div>
                <div>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Enter password"
                    />
                    <div className="form-error">{formErrors['password']?formErrors['password']:''}</div>
                </div>
                {rewritePassword}
               
                <div>
                    <Button type={'submit'} content={isSignUp?'Sign Up':'Log In'}/>
                </div>
           </form>
           <button onClick={()=>{
            setIsSignUp(!isSignUp)
            setFormData({email:'',password:'',rePassword:''})
            setFormErrors({})
            }}>
                {isSignUp?'Switch to Log In':'Switch to Sign Up'}
            </button>
          </>
}