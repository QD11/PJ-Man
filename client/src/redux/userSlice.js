import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUser(state, action) {
            return {...action.payload}
        },
        logOutUser(state, action) {
            return {}
        }
    },
})

export const { getUser, logOutUser } = userSlice.actions
export default userSlice.reducer