import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchMe = createAsyncThunk(
    'user/fetchMe',
    async ({dispatch}) => {
        return (
            await fetch('/me', {
                credentials: 'include'
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then(user => dispatch(getUser(user)))
                }
            })
        )
    }
)

// export const loginUser = createAsyncThunk(
//     'user/loginUser',
//     async (loginForm, {dispatch}) => {
//         return (
//             await fetch('/login', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(loginForm)
//                 })
//                 .then(resp => {
//                     if (resp.ok) {
//                         resp.json()
//                         .then(user => dispatch(getUser(user)))
//                     }
//                 })
//         )
//     }
// )

const initialState = null

const userSlice = createSlice({
    name: 'user',
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