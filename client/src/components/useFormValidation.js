import { useState,useCallback } from "react";
import debounce from "lodash.debounce";

export const useFormValidation = (initialState,validateRules) => {
    const [formErrors, setFormErrors] = useState({});
    const [formData,setFormData] = useState(initialState);
    
    const validationRules = {
        required:(value)=>value.trim()?'':'this field is required.',
        email:(value)=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)?'':'invalid email address.',
        noSpecialCharacter:(value)=>/[$.\0/\\*+?^]|^_/.test(value)?'field cannot contain $.\0/\*+?^ character or start with _':'',
        password:(value)=>(value.trim().length<7 || value.trim().length>20)?'password length should be between 7 and 20':'',
        comparePasswords:(value1,value2)=>(value1 !== value2)?'password and reenter password should be same':''
    }

    const validateField = (name, value, currentFormData = formData) => {
        let error = '';
        let result = '';
        const fieldRules = validateRules[name] || [];
        for(const rule of fieldRules){
            if(rule === 'comparePasswords'){
                const currentPassword = currentFormData.password || '';
                const currentRePassword = currentFormData.rePassword || '';
                result = validationRules[rule](currentPassword,currentRePassword);
            }else{
                result = validationRules[rule](value);
            }
           error = result;
           if(error) break;
        }
        setFormErrors((prev)=>({...prev, [name]:error}))
    }

     const validateComparePassword = (name, value, currentFormData = formData) => {
        let error = '';
        let result = '';
        const fieldRules = validateRules[name] || [];
        for(const rule of fieldRules){
            if(rule === 'comparePasswords'){
                const currentPassword = currentFormData.password || '';
                const currentRePassword = currentFormData.rePassword || '';
                result = validationRules[rule](currentPassword,currentRePassword);
            }
           error = result;
           if(error) break;
        }
        setFormErrors((prev)=>({...prev, [name]:error}))
    }

    const handleOnChange = useCallback((e) => {
        const {name, value} = e.target;
        const debounceChange = debounce((name,value,newFormData)=>{
                
                // Validate current field with fresh value
                validateField(name, value, newFormData);  // Pass newFormData for freshness (update validateField to accept it)
                
                // Proactive re-validation for dependent fields
                if (name === 'password' && validateRules.rePassword) {  // Assuming rePassword has rules
                    validateComparePassword('rePassword', newFormData.rePassword, newFormData);
                }
               
                },500, { leading: false, trailing: true });

                setFormData((prev) => {
                    const newFormData = { ...prev, [name]: value };
                    debounceChange(name,value,newFormData);
                    return newFormData;
                });
        },
        [validateRules, validateField, setFormData]
    )

    const validateAllFields = () => {
        let isValid = true;
        let errors = {};
        let result = '';
        Object.keys(validateRules).forEach(element => {
            let error = '';
            const fieldRules = validateRules[element] || [];

            for(const rule of fieldRules){
                if(rule === 'comparePasswords'){
                    const currentPassword = formData.password || '';
                    const currentRePassword = formData.rePassword || '';
                    result = validationRules[rule](currentPassword,currentRePassword);
                }else{
                    result = validationRules[rule](formData[element]);
                }
                error = result;
                if(error){
                    isValid = false;
                    errors[element] = error;
                    break;
                } 
            }
        }); 
        setFormErrors(errors);
        if(Object.keys(errors).length === 0){
            isValid = true;
        }
        return isValid;
    }

    return {
        handleOnChange,
        formErrors,
        setFormErrors,
        validateAllFields,
        formData,
        setFormData
    }
}