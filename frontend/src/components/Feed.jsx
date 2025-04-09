import React from 'react';
import Posts from './Posts';

const Feed = () => {
    return (
        <div className='flex-1 my-8 flex flex-col items-center pl-[20%] bg-[#1A1A1A]'> {/* Change bg-black */}
            <Posts />
        </div>
    );
};

export default Feed;
