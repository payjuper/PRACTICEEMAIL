import React, { useState } from 'react';
import Comment from './Comment';

const initialComments = [
    {
        id: 1,
        author: 'UserOne',
        avatar: 'https://www.gravatar.com/avatar/?d=monsterid',
        time: '2h',
        text: 'This is a great point. I never thought about it that way.',
        replies: [
            {
                id: 3,
                author: 'CSSWizard',
                avatar: 'https://www.gravatar.com/avatar/?d=retro',
                time: '1h',
                text: 'Thanks! Glad you found it helpful.',
                replies: []
            }
        ]
    },
    {
        id: 2,
        author: 'UserTwo',
        avatar: 'https://www.gravatar.com/avatar/?d=robohash',
        time: '1h',
        text: 'I disagree, I think the performance implications are too significant.',
        replies: []
    }
];

export default function CommentList() {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // Handle new comment submission logic here
        console.log('New comment:', newComment);
        setNewComment('');
    };

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>

            {/* Form for new comments */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="3"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                ></textarea>
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                    >
                        Comment
                    </button>
                </div>
            </form>

            {/* List of comments */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}