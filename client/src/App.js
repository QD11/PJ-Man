import {useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import {fetchMe, fetchLogOut} from '../src/redux/userSlice'
import {fetchTeam } from './redux/teamSlice'

import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import TeamsLayout from './components/select_team/TeamsLayout'
import MainPage from './components/main/MainPage'

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchMe('/me'))
        dispatch(fetchTeam('/team_me'))
    }, [dispatch])

    const user = useSelector(store => store.user)
    const team = useSelector(store => store.team)
    
    const handleClick = () => {
        dispatch(fetchLogOut('/logout'))
        navigate('/')
    }


    return(
        <>
            {/* {user && <button onClick={handleClick}>Log Out</button>} */}
            <Routes>
                <Route path="/" element={user? <TeamsLayout /> : <LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                {user && team &&
                    <Route path='/:team/*' element={<MainPage/>}/>
                }
            </Routes>
        </>
    )

}

export default App;
