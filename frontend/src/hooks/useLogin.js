import { useState } from "react";
import {useDispatch} from "react-redux";
import {  LOGIN } from "../redux/counter";

export const useLogin= ()=>{
    const [error, seterror] = useState(null)
    const [isLoading, setisLoading] = useState(null)
    const dispatch = useDispatch();
    const login = async (email,password)=>{
        setisLoading(true)
        seterror(null)

        const response = await fetch('/api/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const json = await response.json()

        if(!response.ok){
            setisLoading(false)
            seterror(json.error)
        }
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth redux
            dispatch(LOGIN(json))
            setisLoading(false)
        }
    }

    return {login, isLoading,error}
}