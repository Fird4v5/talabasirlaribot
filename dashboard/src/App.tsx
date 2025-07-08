import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/Context"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

const App = () => {

const { user } = useAuth(); 

  return (
    <Routes>
        <Route path="/login" element={ < Login/> } />
        <Route
            path="/"
            element={ user ? <Dashboard /> : <Navigate to="/login" /> }
        />
    </Routes>
  )
}

export default App