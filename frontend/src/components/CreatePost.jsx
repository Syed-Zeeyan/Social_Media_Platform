import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
  onInteractOutside={() => setOpen(false)}
  className="text-white rounded-xl p-6"
  style={{
    background: "radial-gradient(circle, rgba(75,0,130,0.8) 30%, rgba(0,0,0,1) 100%)"
  }}
>

        <DialogHeader className='text-center text-lg font-semibold text-purple-400'>Create New Post</DialogHeader>
        <div className='flex gap-3 items-center'>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='font-semibold text-sm'>{user?.username}</h1>
            <span className='text-gray-400 text-xs'>Bio here...</span>
          </div>
        </div>
        <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none bg-gray-800 text-white rounded-xl" placeholder="Write a caption..." />
        {
          imagePreview && (
            <div className='w-full h-64 flex items-center justify-center rounded-xl overflow-hidden'>
              <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full' />
            </div>
          )
        }
        <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
        <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-purple-600 hover:bg-purple-700 text-white rounded-xl'>Select from computer</Button>
        {
          imagePreview && (
            loading ? (
              <Button className="w-full bg-gray-700 text-white rounded-xl">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button onClick={createPostHandler} type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">Post</Button>
            )
          )
        }
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
