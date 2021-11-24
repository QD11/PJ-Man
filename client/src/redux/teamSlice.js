import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchTeam = createAsyncThunk(
    'user/fetchTeam',
    async (API, {dispatch}) => {
        return (
            await fetch(API, {
                credentials: 'include'
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then(team => dispatch(getTeam(team)))
                }
            })
        )
    }
)

const initialState = null

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        getTeam(state, action) {
            return {...action.payload}
        },
        logOutTeam(state, action) {
            return null
        }
    },
})

export const { getTeam, logOutTeam } = teamSlice.actions
export default teamSlice.reducer