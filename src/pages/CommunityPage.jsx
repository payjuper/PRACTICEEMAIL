import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../components/Feed';
import CommunityHeader from '../components/CommunityHeader';

export default function CommunityPage() {
    const { communityName } = useParams();

    // In a real app, you would fetch posts for this specific community.
    // For now, we are just reusing the generic Feed component.

    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
                <CommunityHeader communityName={communityName} />
                <Feed />
            </div>
            <div className="col-span-4">
                {/* A specific community might have its own sidebar, or we can reuse TrendingSidebar */}
                <div className="bg-white border border-gray-300 rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-4">About Community</h3>
                    <p className="text-sm text-gray-700">
                        This is the {communityName} community. Rules and other information would go here.
                    </p>
                </div>
            </div>
        </div>
    );
}