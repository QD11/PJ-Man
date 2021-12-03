import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit'

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

export const fetchTeamLogOut = createAsyncThunk(
    'user/fetchTeamLogOut',
    async (API, {dispatch}) => {
        return (
            await fetch(API, {
                credentials: 'include'
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then(team => dispatch(logOutTeam(team)))
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
        // removeMemberFromTeam(state, action) {
        //     const currentState = {...current(state)}
        //     const {user_id} = action.payload
        //     const indexOne = currentState.users.findIndex(user => user.id === user_id)
        //     currentState.users.splice(indexOne, 1)

        //     console.log(currentState)
        // }
    },
})

export const { getTeam, logOutTeam } = teamSlice.actions
export default teamSlice.reducer