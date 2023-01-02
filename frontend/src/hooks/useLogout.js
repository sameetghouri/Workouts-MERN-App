import {useDispatch} from "react-redux";
import {  LOGOUT, set_workouts } from "../redux/counter";
export const useLogout = ()=>{
    const dispatch = useDispatch()
    const logout = ()=>{
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch(LOGOUT())
        dispatch(set_workouts([]))
    }

    return {logout}
}