import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

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
    },
})

export const { addProject, getAllProjects } = projectSlice.actions
export default projectSlice.reducer