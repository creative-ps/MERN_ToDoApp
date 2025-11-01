import React,{useState, useEffect} from "react";
import { Button } from './Button'
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "./useFormValidation";

export const AuthForm = () => {
    const [isSignUp,setIsSignUp] = useState(false);
    const {handleSignIn, handleSignUp, isAuthenticated, loading} = useContext(TaskContext);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/tasklist');
        }   
    },[isAuthenticated]);
    let initialState = {email:'',password:'',rePassword:''}
    let fieldRules = '';
    if(isSignUp){
        fieldRules = {
                email:['required','email'],
                password:['required','password',],
                rePassword:['required','password','comparePasswords']
            }
    }else{
        fieldRules = {
                email:['required','email'],
                password:['required','password',],
            }
    } 
    const {handleOnChange, formErrors, validateAllFields, formData, setFormData, setFormErrors} = useFormValidation(initialState,fieldRules);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let isValid = validateAllFields();

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
        rewritePassword = <div className="my-2">
                            <label htmlFor="rePassword" className="font-normal block text-md">* Reenter Password</label>
                            <input
                            type="password"
                            className="text-white block w-full p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid rounded-sm placeholder:text-gray-300 text-sm"
                            name="rePassword"
                            value={formData.rePassword}
                            onChange= {handleOnChange}
                            placeholder="Re enter password"
                            autoComplete="Reenter-password"
                            />
                            <div className="form-error text-xs text-red-500">{formErrors['rePassword']?formErrors['rePassword']:''}</div>
                         </div>;
    }
   if(loading){
    return <div>Loading...</div>;
   }
    return <>
                <div className="userForm flex justify-center align-middle">
                    <form onSubmit={handleSubmit} className="w-xs">
                        <h3 className="mb-[25px] text-center font-medium text-lg">{isSignUp?'Sign Up':'Log In'}</h3>
                        <div className="my-2">
                            <label htmlFor="email" className="font-normal block text-md">* Email</label>
                            <input 
                            type="text"
                            className="text-white block w-full p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid rounded-sm placeholder:text-gray-300 text-sm"
                            name="email"
                            value={formData.email}
                            onChange={handleOnChange}
                            placeholder="Enter email"
                            autoComplete="email"
                            />
                            <div className="form-error text-xs text-red-500">{formErrors['email']?formErrors['email']:''}</div>
                        </div>
                        <div className="my-2">
                            <label htmlFor="password" className="font-normal block text-md">* Password</label>
                            <input
                            type="password"
                            className="text-white block w-full p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid rounded-sm placeholder:text-gray-300 text-sm"
                            name="password"
                            value={formData.password}
                            onChange={handleOnChange}
                            placeholder="Enter password"
                            autoComplete="current-password"
                            />
                            <div className="form-error text-xs text-red-500">{formErrors['password']?formErrors['password']:''}</div>
                        </div>
                        {rewritePassword}
                    
                        <div className="pt-3 text-right">
                            <Button type={'submit'} isDisabled={loading?'disabled':''} className={'border-1 rounded-md bg-blue-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100'} content={isSignUp?'Sign Up':'Log In'}/>
                        </div>
                        <div className="text-right border-t-1 border-gray-400 pt-0 mt-2">
                            <span 
                            className="text-xs inline-block hover: cursor-pointer hover:text-blue-500"
                            onClick={()=>{
                                setIsSignUp(!isSignUp)
                                setFormData({email:'',password:'',rePassword:''})
                                setFormErrors({})
                            }}>
                                {isSignUp?'Switch to Log In':'Switch to Sign Up'}
                            </span>
                        </div>
                </form>
                
                </div>    
          </>
}