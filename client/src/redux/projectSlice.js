import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit'

export const fetchProjects = createAsyncThunk(
    'project/fetchProjects',
    async (API, {dispatch}) => {
        return (
            await fetch(API)
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then(projects => dispatch(getAllProjects(projects)))
                }
            })
        )
    }
)

const initialState = []

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject(state, action) {
            return [...state, action.payload]
        },
        getAllProjects(state, action) {
            return [...action.payload]
        },
        emptyProjects(state, action) {
            return []
        }
        // updateTaskStatus(state, action) {
        //     const currentState = [...current(state)]
        //     console.log(action.payload)
        //     const data = action.payload[0]
        //     const identifier = action.payload[1]
        //     currentState.find
        // }
    },
})

export const { emptyProjects, addProject, getAllProjects, updateTaskStatus } = projectSlice.actions
export default projectSlice.reducer