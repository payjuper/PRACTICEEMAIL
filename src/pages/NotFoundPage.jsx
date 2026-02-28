import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-2xl font-semibold text-gray-600 mt-4">Page Not Found</p>
            <p className="text-gray-500 mt-2">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link 
                to="/"
                className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
                Go back to Home
            </Link>
        </div>
    );
}