import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            await signInWithEmailAndPassword(auth, email, password); 
            navigate("/"); 
        } catch (err: any) {
            setError("Invalid credentials"); 
        }
    }


    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-96 space-y-4"
            >
                <h2 className="text-xl font-bold">
                    Admin Login
                </h2>
                {error && <p className="text-red-500">{error}</p>}
                <input 
                    className="w-full border p-2 rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="w-full border p-2 rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>                            
    )
}
           
export default Login