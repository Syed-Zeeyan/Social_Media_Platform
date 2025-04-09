
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
    const { user } = useSelector(store => store.auth);

    return (
        <div 
            className='w-fit min-h-screen pr-32 p-6 flex flex-col'
            style={{
                backgroundImage: "url('/images/bg.png')", // Update the path if needed
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* User Profile Section */}
            <div className='flex items-center gap-3 mb-8'>
                <Link to={`/profile/${user?._id}`}>
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={user?.profilePicture} alt="profile_image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
                <div>
                    <h1 className='font-semibold text-lg text-purple-400'>
                        <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                    </h1>
                    <span className='text-gray-300 text-sm'>{user?.bio || 'Bio here...'}</span>
                </div>
            </div>
            
            {/* Suggested Users Section */}
            <div className="flex-grow">
                <SuggestedUsers />
            </div>
        </div>
    );
};

export default RightSidebar;



