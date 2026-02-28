import React from 'react';
import CreatePostForm from '../components/CreatePostForm';

export default function CreatePostPage() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Submit a Post</h1>
            <CreatePostForm />
        </div>
    );
}