import { useState} from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const {login,error,isLoading} = useLogin()
    const handlesubmit = async (e)=>{
        e.preventDefault()
        
        await login(email, password)
        setemail('')
        setpassword('')
    }
    
    
    return ( 
    <form className="login" onSubmit={handlesubmit}>
        <h3>Log in</h3>

        <label>Email:</label>
        <input type='email' onChange={(e)=>{setemail(e.target.value)}} value={email}/>
        <label>Password:</label>
        <input type='password' onChange={(e)=>{setpassword(e.target.value)}} value={password}/>
        <button disabled={isLoading}>Login</button>
        {error&& <div className="error">{error}</div>}
    </form> 
    );
}
 
export default Login;