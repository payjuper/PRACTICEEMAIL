import React from 'react';

export default function Comment({ comment }) {
    const hasReplies = comment.replies && comment.replies.length > 0;

    return (
        <div className="flex space-x-3">
            <img
                src={comment.avatar}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
            />
            <div className="flex-1">
                <div className="text-sm">
                    <span className="font-semibold text-gray-900 mr-1">{comment.author}</span>
                    <span className="text-gray-500">• {comment.time}</span>
                </div>
                <p className="text-gray-700 mt-1">{comment.text}</p>
                <div className="flex items-center space-x-4 text-xs font-medium mt-2 text-gray-500">
                    <button className="hover:underline">Reply</button>
                </div>

                {hasReplies && (
                    <div className="mt-4 space-y-4 border-l-2 border-gray-200 pl-4">
                        {comment.replies.map((reply) => (
                            <Comment key={reply.id} comment={reply} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}