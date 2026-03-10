import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import TaskBoard from './components/TaskBoard';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <Routes>
                    <Route
                        path="/login"
                        element={!token ? <Auth setToken={setToken} /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/"
                        element={token ? <TaskBoard setToken={setToken} /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
