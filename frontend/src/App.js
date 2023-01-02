import { useEffect } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {useDispatch, useSelector} from "react-redux";
import {  LOGIN } from "./redux/counter";
function App() {
  const dispatch = useDispatch()
  const User = useSelector((state)=>state?.counter?.user)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch(LOGIN(user))
    }
  },[dispatch])
  

  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route path='/' element={User ? <Home/> : <Navigate to="/login"/>}></Route>
          <Route path='/login' element={!User ? <Login/> : <Navigate to="/"/>}></Route>
          <Route path='/signup' element={!User ? <Signup/> : <Navigate to="/"/>}></Route>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
