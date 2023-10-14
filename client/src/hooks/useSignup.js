import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = ()=>{
    const [error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async(email,username,password,retoken) =>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/user/signUp',{
            method: "POST",
            headers: {'Content-Type':"application/json"},
            body:JSON.stringify({email,username,password,retoken})
        })

        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:"LOGIN",payload:json})
         
            setIsLoading(true)
        }


    }

    return {signup,isLoading,error}

    
}