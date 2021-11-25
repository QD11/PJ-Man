import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = false

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        isAdmin(state, action) {
            return action.payload
        },
    },
})

export const { isAdmin } = adminSlice.actions
export default adminSlice.reducer