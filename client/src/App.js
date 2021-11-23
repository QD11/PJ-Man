import {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import {fetchMe} from '../src/redux/userSlice'

import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMe())
    }, [dispatch])

    const user = useSelector(store => store.user)

    if (!user) return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
            </Routes>
            <Routes>
                <Route path="/signup" element={<SignupForm />} />
            </Routes>
        </Router>
    )

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
            </Routes>
            <Routes>
                <Route path="/signup" element={<SignupForm />} />
            </Routes>
        </Router>
    );
}

export default App;
