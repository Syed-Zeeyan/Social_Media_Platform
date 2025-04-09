import React from 'react';
import Feed from './Feed';
import { Outlet } from 'react-router-dom';
import RightSidebar from './RightSidebar';
import useGetAllPost from '@/hooks/useGetAllPost';
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers';

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();

    return (
        <div className="flex bg-[#1A1A1A] min-h-screen w-full"> {/* Change bg-black to Feed's background */}
            {/* Main Content Area (Feed + Outlet) */}
            <div className="flex-grow flex justify-center"> {/* Center the Feed properly */}
                <Feed />
                <Outlet />
            </div>

            {/* Right Sidebar */}
            <div className="w-80 bg-[#1A1A1A]"> {/* Set width and match Feed's background */}
                <RightSidebar />
            </div>
        </div>
    );
};

export default Home;

