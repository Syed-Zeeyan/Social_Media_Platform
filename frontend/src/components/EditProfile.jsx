import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';

const EditProfile = () => {
    const imageRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio,
        gender: user?.gender
    });

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput(prev => ({ ...prev, profilePhoto: file }));
    };

    const selectChangeHandler = (value) => {
        setInput(prev => ({ ...prev, gender: value }));
    };

    const editProfileHandler = async () => {
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/profile/edit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setAuthUser({ ...user, ...res.data.user }));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className='flex justify-center items-center min-h-screen w-screen' 
            style={{
                background: "radial-gradient(circle, rgba(75,0,130,0.3) 10%, rgba(0,0,0,1) 90%)"
            }}
        >
            {/* Profile Form Container - Now Blending with Background */}
            <div 
                className='flex max-w-2xl w-full mx-auto p-10 text-white rounded-lg shadow-lg' 
                style={{
                    background: "radial-gradient(circle, rgba(75,0,130,0.7) 20%, rgba(0,0,0,1) 90%)",
                    boxShadow: "0px 0px 20px rgba(75,0,130,0.5)"
                    
                }}
            >
                <section className='flex flex-col gap-6 w-full'>
                    <h1 className='font-bold text-xl'>Edit Profile</h1>

                    {/* Profile Picture & Change Button */}
                    <div className='flex items-center justify-between bg-[#1A1A1A] bg-opacity-50 rounded-xl p-4'>
                        <div className='flex items-center gap-3'>
                            <Avatar>
                                <AvatarImage src={user?.profilePicture} alt="Profile" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className='font-bold text-sm text-gray-300'>{user?.username}</h1>
                                <span className='text-gray-400'>{user?.bio || 'Bio here...'}</span>
                            </div>
                        </div>
                        <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
                        <Button onClick={() => imageRef.current.click()} className='bg-purple-600 hover:bg-purple-700 h-8 px-4 rounded-full'>
                            Change Photo
                        </Button>
                    </div>

                    {/* Bio Input */}
                    <div>
                        <h1 className='font-bold text-xl mb-2 text-gray-300'>Bio</h1>
                        <Textarea value={input.bio} onChange={(e) => setInput(prev => ({ ...prev, bio: e.target.value }))} className="bg-[#1A1A1A] bg-opacity-50 text-gray-300 focus-visible:ring-transparent" />
                    </div>

                    {/* Gender Selection */}
                    <div>
                        <h1 className='font-bold mb-2 text-gray-300'>Gender</h1>
                        <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
                            <SelectTrigger className="w-full bg-[#1A1A1A] bg-opacity-50 text-gray-300">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] bg-opacity-50 text-gray-300">
                                <SelectGroup>
                                    <SelectItem value="male" className="hover:bg-[#333]">Male</SelectItem>
                                    <SelectItem value="female" className="hover:bg-[#333]">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit Button */}
                    <div className='flex justify-end'>
                        <Button onClick={editProfileHandler} className='w-fit bg-purple-600 hover:bg-purple-700 rounded-full px-4 h-8' disabled={loading}>
                            {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</> : "Submit"}
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EditProfile;
