import {useState} from "react"
// import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import { useDispatch, useSelector} from "react-redux";
import {  create_workout } from "../redux/counter";
const WorkoutForm = () => {
   // const { dispatch } = useWorkoutsContext();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state?.counter?.user)

   const [title,settitle] = useState('')
   const [load,setload] = useState('')
   const [reps,setreps] = useState('')
   const [error,seterror] = useState('')
   const [emptyFields, setemptyFields ]=useState([])
   const handleSubmit = async(e)=>{
    e.preventDefault()

    if (!user){
        seterror('You Must Be logged in')
        return
    }
    const workout={title,load,reps}
    const response = await fetch ('/api/workouts',{
        method:"POST",
        body:JSON.stringify(workout),
        headers:{ 
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
    }
    })
    const json = await response.json()
    if(!response.ok){
        seterror(json.error)
        setemptyFields(json.emptyFields)
    }
    if(response.ok){
        settitle('')
        setload('')
        setreps('')
        seterror(null)
        setemptyFields([])
        // console.log("new workout added", json)
        // dispatch({type:'CREATE_WORKOUT', payload: json} )
        dispatch(create_workout(json))

    }
   }

    return ( 
        <form action="" className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout </h3>

            <label>Exercise Title</label>
            <input type="text" onChange={(e)=>{settitle(e.target.value)}} value={title} className={emptyFields.includes('title')? 'error':''}/>

            <label>Load (in kg):</label>
            <input type="number" onChange={(e)=>{setload(e.target.value)}} value={load} className={emptyFields.includes('load')? 'error':''}/>

            <label>Reps:</label>
            <input type="number" onChange={(e)=>{setreps(e.target.value)}} value={reps} className={emptyFields.includes('reps')? 'error':''}/>

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default WorkoutForm;