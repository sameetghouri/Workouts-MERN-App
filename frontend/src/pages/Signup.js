import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const {signup,isLoading,error}=useSignup()
    const handlesubmit = async (e)=>{
        e.preventDefault()

        await signup(email,password)
        setemail('')
        setpassword('')
    }
    return ( 
    <form className="signup" onSubmit={handlesubmit}>
        <h3>Sign Up</h3>

        <label>Email:</label>
        <input type='email' onChange={(e)=>{setemail(e.target.value)}}/>
        <label>Password:</label>
        <input type='password' onChange={(e)=>{setpassword(e.target.value)}}/>
        <button disabled={isLoading}>Sign Up</button>
        {error && <div className="error">{error}</div>}
    </form> 
    );
}
 
export default Signup;