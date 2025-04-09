import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => setActiveTab(tab);

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="flex justify-center items-start w-screen min-h-screen text-white overflow-hidden">
    {/* Sidebar */}
    <aside className="w-64 min-w-[250px]"></aside> {/* Adjust width as needed */}

    {/* Main Content */}
    <div 
      className="flex flex-col gap-10 p-8 w-full max-w-5xl rounded-lg shadow-lg"
      style={{
        background: "radial-gradient(circle, rgba(75,0,130,0.3) 10%, rgba(0,0,0,1) 100%)"
        }}
      >
        <div className='grid grid-cols-2 items-center'>
          {/* Profile Image Section */}
          <section className='flex items-center justify-center'>
            <Avatar className='h-32 w-32 border-2 border-purple-500 shadow-md'>
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>

          {/* User Info Section */}
          <section className="flex flex-col gap-4">
            <div className='flex items-center gap-3'>
              <span className='text-xl font-semibold'>{userProfile?.username}</span>
              {isLoggedInUserProfile ? (
                <>
                  <Link to="/account/edit">
                    <Button className='bg-[#333] text-white hover:bg-gray-600 h-8 px-4 rounded-full'>
                      Edit Profile
                    </Button>
                  </Link>
                  <Button className='bg-[#333] text-white hover:bg-gray-600 h-8 px-4 rounded-full'>
                    View Archive
                  </Button>
                  <Button className='bg-[#333] text-white hover:bg-gray-600 h-8 px-4 rounded-full'>
                    Ad Tools
                  </Button>
                </>
              ) : (
                isFollowing ? (
                  <>
                    <Button className='bg-[#333] text-white hover:bg-gray-600 h-8 rounded-lg'>Unfollow</Button>
                    <Button className='bg-[#333] text-white hover:bg-gray-600 h-8 rounded-lg'>Message</Button>
                  </>
                ) : (
                  <Button className='bg-purple-600 hover:bg-purple-500 h-8 text-white rounded-lg'>Follow</Button>
                )
              )}
            </div>

            <div className='flex items-center gap-6 text-sm text-gray-300'>
              <p><span className='font-semibold text-white'>{userProfile?.posts.length}</span> posts</p>
              <p><span className='font-semibold text-white'>{userProfile?.followers.length}</span> followers</p>
              <p><span className='font-semibold text-white'>{userProfile?.following.length}</span> following</p>
            </div>

            <div className='flex flex-col gap-1'>
              <span className='font-semibold text-purple-500'>{userProfile?.bio || 'No bio yet...'}</span>
              <Badge className='w-fit bg-purple-700 text-white rounded-lg'>
                <AtSign className="mr-1" size={14} />
                <span>{userProfile?.username}</span>
              </Badge>
            </div>
          </section>
        </div>

        {/* Tab Navigation */}
        <div className='border-t border-gray-700'>
          <div className='flex items-center justify-center gap-10 text-sm text-gray-400'>
            {['posts', 'saved', 'reels', 'tags'].map(tab => (
              <span 
                key={tab}
                className={`py-3 cursor-pointer transition-all ${
                  activeTab === tab ? 'font-bold text-purple-500 border-b-2 border-purple-500' : 'hover:text-purple-500'
                }`} 
                onClick={() => handleTabChange(tab)}
              >
                {tab.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Posts Display */}
          <div className='grid grid-cols-3 gap-2 mt-5'>
            {displayedPost?.map((post) => (
              <div key={post?._id} className='relative group cursor-pointer overflow-hidden rounded-lg'>
                <img 
                  src={post.image} 
                  alt='postimage' 
                  className='rounded-lg w-full aspect-square object-cover transition-transform transform group-hover:scale-105'
                />
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='flex items-center text-white space-x-4'>
                    <button className='flex items-center gap-2 hover:text-gray-300'>
                      <Heart />
                      <span>{post?.likes.length}</span>
                    </button>
                    <button className='flex items-center gap-2 hover:text-gray-300'>
                      <MessageCircle />
                      <span>{post?.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
