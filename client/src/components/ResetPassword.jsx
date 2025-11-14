import React,{ useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useFormValidation } from "./useFormValidation";
import { Button } from "./Button";
export const ResetPassword = ()=>{
    const {updatePasswordCtx, loading} = useContext(TaskContext);
    let fieldRules = {
                email:['required','email'],
                password:['required','password',],
                rePassword:['required','password','comparePasswords']
            }

    let initialState = {email:'',password:'',rePassword:''}
    const {handleOnChange, formErrors, validateAllFields, formData, setFormData, setFormErrors} = useFormValidation(initialState,fieldRules);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let isValid = validateAllFields();

        if(isValid){
            await updatePasswordCtx(formData);
            setFormData({
                ...formData,
                email:'',password:'',rePassword:''
            })
        }
    }
    return <>
                <form className="flex justify-center">
                    <div className="flex flex-col w-[400px]">
                        <h2 className="mb-2 font-medium">Update password.</h2>
                        <input 
                        type="text" 
                        name="email"
                        onChange={handleOnChange}
                        placeholder="Enter your email address."
                        className="text-white w-[400px] p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid 
                        rounded-sm placeholder:text-gray-300 text-sm" 
                        value={formData.email}
                        />
                        <div className="form-error text-xs text-red-500">{formErrors['email']?formErrors['email']:''}</div>
                        
                        
                        <input 
                        type="password" 
                        name="password"
                        onChange={handleOnChange}
                        placeholder="Enter new password."
                        className="text-white w-[400px] p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid 
                        rounded-sm placeholder:text-gray-300 text-sm mt-1" 
                        value={formData.password}/>
                        <div className="form-error text-xs text-red-500">{formErrors['password']?formErrors['password']:''}</div>


                        <input 
                        type="password" 
                        name="rePassword"
                        onChange={handleOnChange}
                        placeholder="Re enter new password."
                        className="text-white w-[400px] p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid 
                        rounded-sm placeholder:text-gray-300 text-sm mt-1" 
                        value={formData.rePassword}
                        />
                        <div className="form-error text-xs text-red-500">{formErrors['rePassword']?formErrors['rePassword']:''}</div>

                        
                        <div className="flex justify-end mt-2">
                            <Button type={'button'} isDisabled={loading?'disabled':''} handleClick={handleSubmit} className={'border-1 rounded-md bg-blue-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'} content={loading?'Loading...':'Update password'}/>
                            
                        </div>
                    </div>
                </form>
                
           </>
}