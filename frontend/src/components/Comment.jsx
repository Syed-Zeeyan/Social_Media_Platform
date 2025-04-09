import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Comment = ({ comment }) => {
    return (
        <div className='my-2 p-3 bg-[#222] rounded-xl flex items-center gap-3'>
            {/* Rounded Avatar */}
            <Avatar className="rounded-full">
                <AvatarImage src={comment?.author?.profilePicture} className="rounded-full" />
                <AvatarFallback className="rounded-full bg-gray-700 text-white">CN</AvatarFallback>
            </Avatar>

            {/* Rounded Message Box */}
            <div className="bg-[#333] p-3 rounded-2xl w-full">
                <h1 className='font-bold text-sm text-gray-300'>
                    {comment?.author.username} 
                    <span className='font-normal pl-1 text-gray-400'>{comment?.text}</span>
                </h1>
            </div>
        </div>
    );
};

export default Comment;
