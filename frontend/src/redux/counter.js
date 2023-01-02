import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    workouts:null,
    user:null
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    set_workouts: (state, action) => {
      state.workouts = [...action.payload]
    },
    create_workout: (state,action) => {
      state.workouts = [action.payload,...state.workouts];
    },
    delete_workout: (state,action) => {
      state.workouts =  state.workouts.filter((w)=> w._id!== action.payload._id)
    },
    LOGIN:(state,action)=>{
      state.user = action.payload 
    },
    LOGOUT:(state)=>{
      state.user = null
    }
    // setuser(state,action){
    //   const userdata = action.payload;
    //   return{...state,...userdata} }
    //setuser action will update the perticular property value (role:senior enginer from junior enginer) of user object
  },
})

// Action creators are generated for each case reducer function
export const { set_workouts, create_workout, delete_workout,LOGIN,LOGOUT } = counterSlice.actions

export default counterSlice.reducer