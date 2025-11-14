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
                        <h3 className="mb-[25px] text-center font-medium text-lg">Update password.</h3>
                        <label htmlFor="email" className="font-normal block text-md">* Enter your existing email</label>
                        <input 
                        type="text" 
                        name="email"
                        onChange={handleOnChange}
                        placeholder="Enter your existing email address."
                        className="text-white w-[400px] p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid 
                        rounded-sm placeholder:text-gray-300 text-sm" 
                        value={formData.email}
                        />
                        <div className="form-error text-xs text-red-500">{formErrors['email']?formErrors['email']:''}</div>
                        
                        <label htmlFor="password" className="font-normal block text-md sm:mt-3">* Enter new password</label>
                        <input 
                        type="password" 
                        name="password"
                        onChange={handleOnChange}
                        placeholder="Enter new password."
                        className="text-white w-[400px] p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid 
                        rounded-sm placeholder:text-gray-300 text-sm" 
                        value={formData.password}/>
                        <div className="form-error text-xs text-red-500">{formErrors['password']?formErrors['password']:''}</div>

                        <label htmlFor="rePassword" className="font-normal block text-md sm:mt-3">* Reenter new password</label>
                        <input 
                        type="password" 
                        name="rePassword"
                        onChange={handleOnChange}
                        placeholder="Re enter new password."
                        className="text-white w-[400px] p-1 px-2 border-1 border-gray-300 bg-gray-700 border-solid 
                        rounded-sm placeholder:text-gray-300 text-sm" 
                        value={formData.rePassword}
                        />
                        <div className="form-error text-xs text-red-500">{formErrors['rePassword']?formErrors['rePassword']:''}</div>

                        
                        <div className="flex justify-end mt-6">
                            <Button type={'button'} isDisabled={loading?'disabled':''} handleClick={handleSubmit} className={'border-1 rounded-md bg-blue-500 text-white text-sm px-3 py-1 :hover cursor-pointer hover:text-gray-100 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'} content={loading?'Loading...':'Update password'}/>
                            
                        </div>
                    </div>
                </form>
                
           </>
}