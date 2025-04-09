import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);

    return (
        <div 
            className='w-full p-6 shadow-lg'
            style={{
                backgroundImage: "url('/images/bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className='flex items-center justify-between text-sm mb-6'>
                <h1 className='font-semibold text-gray-300 text-lg'>Suggested for you</h1>
                <span className='font-medium text-purple-400 cursor-pointer hover:text-purple-300'>See All</span>
            </div>
            {suggestedUsers.map((user) => (
                <div key={user._id} className='flex items-center justify-between my-4'>
                    <div className='flex items-center gap-4'>
                        <Link to={`/profile/${user?._id}`}>
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={user?.profilePicture} alt="user_image" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className='max-w-[150px]'>
                            <h1 className='font-semibold text-base text-gray-300 truncate'>
                                <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                            </h1>
                            <span className='text-gray-400 text-sm whitespace-nowrap overflow-hidden truncate block'>
                                {user?.bio || 'Bio here...'}
                            </span>
                        </div>
                    </div>
                    <span className='text-purple-400 text-sm font-bold cursor-pointer hover:text-purple-300'>
                        Follow
                    </span>
                </div>
            ))}
        </div>
    );
};

export default SuggestedUsers;

