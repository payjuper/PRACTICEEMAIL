import React from 'react';

export default function CommunityHeader({ communityName }) {
    // In a real app, you'd fetch community data based on the name
    const communityData = {
        bannerUrl: 'https://via.placeholder.com/1200x200', // Placeholder banner
        iconUrl: 'https://via.placeholder.com/100x100', // Placeholder icon
    };

    return (
        <div className="bg-white rounded-md mb-4">
            <div 
                className="h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${communityData.bannerUrl})` }}
            ></div>
            <div className="p-4">
                <div className="flex items-end -mt-16">
                    <img
                        src={communityData.iconUrl}
                        alt="Community Icon"
                        className="h-20 w-20 rounded-full border-4 border-white bg-white"
                    />
                    <div className="ml-4">
                        <h1 className="text-3xl font-bold text-gray-900">r/{communityName}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}