import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import teamReducer from './teamSlice'
import adminReducer from './adminSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        team: teamReducer,
        isAdmin: adminReducer,
    }
})

export default store;
