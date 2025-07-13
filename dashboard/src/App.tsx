import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/Context"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import PrivacyPolicy from "./pages/PrivacyPolicy"

const App = () => {

const { user } = useAuth(); 

  return (
    <Routes>
        <Route path="/login" element={ < Login/> } />
        <Route
            path="/"
            element={ user ? <Dashboard /> : <Navigate to="/login" /> }
        />
        <Route path="/privacy" element={ <PrivacyPolicy /> } />
    </Routes>
  )
}

export default App