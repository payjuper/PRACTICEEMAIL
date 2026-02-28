import React from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../components/CommentList';
import { CommentIcon,LikeIcon, ShareIcon } from '../components/Feed.jsx';
// Placeholder data for a single post. In a real app, you'd fetch this based on the postId.
const post = {
    id: 1,
    title: 'Just discovered this amazing new CSS feature!',
    author: 'CSSWizard',
    handle: '@css_wizard',
    time: '3h',
    likes: 128,
    comments: 42,
    content: 'Have you all seen the new `backdrop-filter` property? It allows you to apply graphical effects like blur or color shifting to the area behind an element. I\'ve been playing with it all morning and it\'s a game-changer for UI design. No more complex workarounds!',
    avatar: 'https://www.gravatar.com/avatar/?d=retro',
};

export default function PostDetailPage() {
    const { postId } = useParams();

    // In a real app, you would use postId to fetch the specific post data from your backend.
    // For now, we're just displaying the placeholder post.

    return (
        <div className="bg-white border border-gray-300 rounded-md">
            <div className="p-4">
                <div className="flex space-x-3">
                    <img
                        src={post.avatar}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full"
                    />
                    <div>
                        <div className="flex items-center text-sm">
                            <span className="font-semibold text-gray-900 mr-1">{post.author}</span>
                            <span className="text-gray-500 mr-1">{post.handle}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500 ml-1">{post.time}</span>
                        </div>
                        <h2 className="text-xl font-semibold mt-1 mb-2">{post.title}</h2>
                        <p className="text-gray-700">{post.content}</p>
                        <div className="flex items-center space-x-4 text-sm font-medium mt-3 text-gray-500">
                             <button className="flex items-center space-x-1 hover:text-blue-500">
                                <CommentIcon />
                                <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-red-500">
                                <LikeIcon />
                                <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-green-500">
                                <ShareIcon />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t border-gray-200">
                <CommentList />
            </div>
        </div>
    );
}
