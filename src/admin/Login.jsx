import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('adminToken', res.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold transition-colors">
                    Login
                </button>
            </form>
        </div>
    );
}
