import {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import {fetchMe, logOutUser} from '../src/redux/userSlice'

import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import OrganizationsLayout from './components/select_organization/OrganizationsLayout'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMe('/me'))
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

    const handleLogOut = () => {
        fetch('/logout', {
            method: 'DELETE'
        }).then(r => {
            if(r.ok){
                dispatch(logOutUser);
            }
        })
    }


    return(
        <>
            <button onClick={handleLogOut}>Log Out</button>
            <Router>
                <Routes>
                    <Route path="/" element={<OrganizationsLayout />} />
                </Routes>
            </Router>
        </>
    )

    // return (
    //     <Router>
    //         <Routes>
    //             <Route path="/" element={<LoginForm />} />
    //         </Routes>
    //         <Routes>
    //             <Route path="/signup" element={<SignupForm />} />
    //         </Routes>
    //     </Router>
    // );
}

export default App;
