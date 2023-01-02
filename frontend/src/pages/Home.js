import {useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
// import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useSelector, useDispatch} from "react-redux";
import {  set_workouts } from "../redux/counter";

const Home = () => {
    // const [workouts, setworkouts] = useState(null)
    // const {workouts, dispatch} = useWorkoutsContext()
    const workouts = useSelector((state)=>state?.counter?.workouts)
    const user = useSelector((state)=>state?.counter?.user)
  const dispatch = useDispatch();
    console.log(workouts) 
    useEffect(()=>{
        const fetchWorkouts = async () =>{
            const response = await fetch('/api/workouts',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                // setworkouts(json)
                // dispatch({type:'SET_WORKOUTS', payload:json})
                dispatch(set_workouts(json))

            }
        }
        if(user){
            fetchWorkouts()
        }
        
        
    },[dispatch,user])

    

    return ( 
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((item)=>(
                    <WorkoutDetails key={item._id} workout={item}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
     );
}
 
export default Home;
