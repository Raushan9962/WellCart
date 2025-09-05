import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Nav from './component/Nav.jsx'
import { UserDataContext } from './context/UserContext.jsx'

// Optional: create a simple NotFound component
function NotFound() {
  return <h1>404 - Page Not Found</h1>
}

function App() {
  let { userData } = useContext(UserDataContext);

  return (
    <>
      {userData && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* fallback route for unknown paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
