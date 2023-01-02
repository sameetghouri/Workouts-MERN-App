const Workout = require('../model/WorkoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req,res) =>{
    const user_id = req.user._id


    const workout = await Workout.find({user_id}).sort({createdAt:-1})
    res.status(200).json(workout)
}

//get single workout
const getWorkout = async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id of workout"})
    }
    
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:"No Workout Found"})
    }
    res.status(200).json(workout)
}

//Post a new Workout
const createWorkout = async (req,res)=>{
    const {title, load, reps}=req.body 

    let emptyFields = []
     if(!title){emptyFields.push('title')}
     if(!load){emptyFields.push('load')}
     if(!reps){emptyFields.push('reps')}
     if(emptyFields.length>0){
        return res.status(400).json({error:'Please Fill in all the fields',emptyFields})
     }
    try{
    const user_id = req.user._id
    const workout = await Workout.create({title,load,reps,user_id})
    res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }   
    }

//Delete a workout
const deleteWorkout = async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id of workout"})
    }
    
    const workout = await Workout.findByIdAndDelete(id)
    if(!workout){
        return res.status(404).json({error:"No Workout Found"})
    }
    res.status(200).json(workout)
}

//Update a workout
const updateWorkout = async (req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id of workout"})
    }
    
    const workout = await Workout.findByIdAndUpdate(id, req.body)
    if(!workout){
        return res.status(404).json({error:"No Workout Found"})
    }
    res.status(200).json(workout)
}
module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}