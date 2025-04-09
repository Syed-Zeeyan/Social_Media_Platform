import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        };
    }, []);

    return (
        <div className='flex ml-[16%] h-screen text-white'
            style={{ background: "radial-gradient(circle, rgba(75,0,130,0.3) 10%, rgba(0,0,0,1) 90%)" }}
        >
            {/* Left Sidebar - User List */}
            <section 
    className='w-full md:w-1/4 my-8 p-4 rounded-lg' 
    style={{ 
        background: "radial-gradient(circle, rgba(120,0,200,0.4) 20%, rgba(0,0,0,1) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.1)"
    }}
>

                <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-600' />
                <div className='overflow-y-auto h-[80vh]'>
                    {
                        suggestedUsers.map((suggestedUser) => {
                            const isOnline = onlineUsers.includes(suggestedUser?._id);
                            return (
                                <div 
                                    key={suggestedUser._id} 
                                    onClick={() => dispatch(setSelectedUser(suggestedUser))} 
                                    className='flex gap-3 items-center p-3 hover:bg-gray-700 cursor-pointer rounded-lg'
                                >
                                    <Avatar className='w-14 h-14'>
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>{suggestedUser?.username}</span>
                                        <span className={`text-xs font-bold ${isOnline ? 'text-green-400' : 'text-red-500'} `}>
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            {/* Chat Section */}
            {
                selectedUser ? (
                    <section className='flex-1 border-l border-l-gray-700 flex flex-col h-full bg-gray-800 rounded-lg shadow-md'>
                        {/* Chat Header */}
                        <div className='flex gap-3 items-center px-4 py-3 border-b border-gray-700 bg-gray-900 rounded-t-lg'>
                            <Avatar>
                                <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span className='font-semibold'>{selectedUser?.username}</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <Messages selectedUser={selectedUser} messageBubbleStyle="bg-purple-600 text-white" />

                        {/* Message Input */}
                        <div className='flex items-center p-4 border-t border-gray-700 bg-gray-900 rounded-b-lg'>
                            <Input 
                                value={textMessage} 
                                onChange={(e) => setTextMessage(e.target.value)} 
                                type="text" 
                                className='flex-1 mr-2 rounded-full bg-gray-700 text-white border-none placeholder-gray-400 focus:ring-2 focus:ring-purple-500' 
                                placeholder="Type a message..."
                            />
                            <Button 
                                onClick={() => sendMessageHandler(selectedUser?._id)}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition duration-200"
                            >
                                Send
                            </Button>
                        </div>
                    </section>
                ) : (
                    <div className='flex flex-col items-center justify-center mx-auto text-gray-400'>
                        <MessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium text-lg'>Your messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }
        </div>
    );
};

export default ChatPage;