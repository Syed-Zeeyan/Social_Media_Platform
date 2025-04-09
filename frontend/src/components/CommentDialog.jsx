import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '@/redux/postSlice';

const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState("");
    const { selectedPost, posts } = useSelector(store => store.post);
    const [comment, setComment] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedPost) {
            setComment(selectedPost.comments);
        }
    }, [selectedPost]);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        setText(inputText.trim() ? inputText : "");
    };

    const sendMessageHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost._id}/comment`, { text }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent 
                onInteractOutside={() => setOpen(false)}
                className="max-w-3xl p-0 flex flex-col bg-[#1A1A1A] border-[#333] rounded-2xl"
            >
                <div className='flex flex-1'>
                    {/* Image Section */}
                    <div className='w-1/2'>
                        <img
                            src={selectedPost?.image}
                            alt="post_img"
                            className='w-full h-full object-cover rounded-l-2xl'
                        />
                    </div>

                    {/* Comments Section */}
                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex gap-3 items-center'>
                                <Link>
                                    <Avatar className="rounded-full">
                                        <AvatarImage src={selectedPost?.author?.profilePicture} className="rounded-full"/>
                                        <AvatarFallback className="rounded-full bg-gray-700 text-white">CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-semibold text-xs text-gray-300'>{selectedPost?.author?.username}</Link>
                                </div>
                            </div>

                            {/* More Options Dialog */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer text-gray-300' />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center bg-[#1A1A1A] border-[#333] text-gray-300 rounded-2xl">
                                    <div className='cursor-pointer w-full text-[#ED4956] font-bold'>Unfollow</div>
                                    <div className='cursor-pointer w-full'>Add to favorites</div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        
                        <hr className='border-[#333]' />

                        {/* Comments List */}
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            {selectedPost?.comments.map((comment) => <Comment key={comment._id} comment={comment} />)}
                        </div>

                        {/* Input Box & Send Button (Rounded) */}
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={changeEventHandler}
                                    placeholder='Add a comment...'
                                    className='w-full outline-none border text-sm border-[#333] p-2 rounded-full bg-[#333] text-gray-300'
                                />
                                <Button 
                                    disabled={!text.trim()} 
                                    onClick={sendMessageHandler} 
                                    variant="outline" 
                                    className='text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white rounded-full px-4 py-2'
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CommentDialog;
