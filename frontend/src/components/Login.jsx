
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex items-center w-screen h-screen justify-center"
            style={{
                background: "radial-gradient(circle, rgba(75,0,130,0.3) 10%, rgba(0,0,0,1) 90%)"
            }}
        >
            <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8 bg-[#1A1A1A] rounded-lg border border-[#333] w-full max-w-md'>
                <div className='my-4 flex items-center justify-center gap-2'>
                    <img src="/Chain.png" alt="Logo" className='w-10 h-10' />
                    <h1 className='font-bold text-xl text-purple-500'>Ruviel</h1>
                </div>
                <p className='text-sm text-center text-gray-400'>Login to see photos & videos from your friends</p>
                <div>
                    <span className='font-medium text-gray-300'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2 bg-[#333] text-white rounded-full border-none placeholder-gray-400"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <span className='font-medium text-gray-300'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2 bg-[#333] text-white rounded-full border-none placeholder-gray-400"
                        placeholder="Enter your password"
                    />
                </div>
                {loading ? (
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Please wait
                    </Button>
                ) : (
                    <Button type='submit' className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                        Login
                    </Button>
                )}
                <span className='text-center text-gray-400'>
                    Don't have an account? <Link to="/signup" className='text-purple-500 hover:text-purple-400'>Signup</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;