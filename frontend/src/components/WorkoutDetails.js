// import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import { useDispatch, useSelector} from "react-redux";
import {  delete_workout } from "../redux/counter";
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
    // const {dispatch} = useWorkoutsContext()
  const dispatch = useDispatch(); 
  const user = useSelector((state)=>state?.counter?.user)

    const handleclick = async ()=>{
        if(!user){
            return
        }
        const response = await fetch('/api/workouts/'+workout._id,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()

        if (response.ok){
            // dispatch({type:'DELETE_WORKOUT', payload:json})
            dispatch(delete_workout(json))
        }
    }
    return ( 
        <div className="workout-details">
            <h3>{workout.title}</h3>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix:true})}</p>
            <span className='material-symbols-outlined' onClick={handleclick}>Delete</span>
        </div>
     );
}
 
export default WorkoutDetails;