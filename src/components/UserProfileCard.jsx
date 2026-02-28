import React from 'react';

export default function UserProfileCard({ username }) {
    // In a real app, you would fetch user data based on the username
    const userData = {
        avatarUrl: `https://www.gravatar.com/avatar/?d=mp&s=150`,
        joinDate: 'Joined December 2023',
    };

    return (
        <div className="bg-white border border-gray-300 rounded-md p-4">
            <div className="flex flex-col items-center">
                <img
                    src={userData.avatarUrl}
                    alt={`${username}'s Avatar`}
                    className="h-24 w-24 rounded-full"
                />
                <h1 className="text-2xl font-bold mt-4">{username}</h1>
                <p className="text-gray-600">u/{username}</p>
                <p className="text-sm text-gray-500 mt-2">{userData.joinDate}</p>
            </div>
            <div className="mt-6">
                <p className="text-sm text-gray-700 text-center">
                    User bio would go here. A brief description about the user and their interests.
                </p>
            </div>
            <div className="mt-6 flex flex-col space-y-2">
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Follow
                </button>
                <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                    Message
                </button>
            </div>
        </div>
    );
}