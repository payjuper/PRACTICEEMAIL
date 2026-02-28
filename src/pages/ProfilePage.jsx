import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../components/Feed';
import UserProfileCard from '../components/UserProfileCard';

export default function ProfilePage() {
    const { username } = useParams();

    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
                <h2 className="text-xl font-semibold mb-4">Posts by {username}</h2>
                <Feed />
            </div>
            <div className="col-span-4">
                <UserProfileCard username={username} />
            </div>
        </div>
    );
}