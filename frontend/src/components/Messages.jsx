import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();
    const { messages } = useSelector((store) => store.chat);
    const { user } = useSelector((store) => store.auth);

    return (
        <div 
            className="overflow-y-auto flex-1 p-4 flex flex-col text-white rounded-lg"
            style={{ background: "radial-gradient(circle, rgba(75,0,130,0.3) 10%, rgba(0,0,0,1) 90%)" }}
        >
            {/* User Profile Section */}
            <div className="flex justify-center mb-4">
                <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 border-2 border-purple-500">
                        <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                        <AvatarFallback className="bg-purple-500 text-white">CN</AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-semibold mt-2">{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button className="h-8 mt-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 transition">
                            View Profile
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex flex-col gap-3">
                {messages &&
                    messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`flex ${
                                msg.senderId === user?._id ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`p-3 max-w-xs rounded-2xl break-words shadow-md ${
                                    msg.senderId === user?._id
                                        ? "bg-purple-500 text-white"
                                        : "bg-gray-800 text-white"
                                }`}
                            >
                                {msg.message}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Messages;
