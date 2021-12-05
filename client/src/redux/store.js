import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import teamReducer from './teamSlice'
import adminReducer from './adminSlice'
import projectReducer from './projectSlice'

const store = configureStore({
    reducer: {
        // projects: projectReducer,
        user: userReducer,
        team: teamReducer,
        isAdmin: adminReducer,
    }
})

export default store;
