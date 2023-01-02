const express = require('express')
const router = express.Router()
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')

const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
router.use(requireAuth)

//get all workouts
router.get('/',getWorkouts)

//get single workout
router.get('/:id',getWorkout)

//Post a new Workout
router.post('/',createWorkout)

//Delete a workout
router.delete('/:id',deleteWorkout)

//Update a workout
router.patch('/:id',updateWorkout)

module.exports = router;