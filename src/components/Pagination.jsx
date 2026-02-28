import React from 'react';

export default function Pagination() {
    // In a real app, you would have state and handlers for page changes.
    const currentPage = 1;
    const totalPages = 10;

    return (
        <div className="flex items-center justify-center space-x-1 mt-8">
            <button
                className="px-4 py-2 text-gray-500 bg-white rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            
            {/* Page numbers would be generated dynamically */}
            <button className="px-4 py-2 text-white bg-indigo-600 rounded-md">1</button>
            <button className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100">2</button>
            <button className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100">3</button>
            <span className="px-4 py-2 text-gray-700">...</span>
            <button className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100">{totalPages}</button>

            <button
                className="px-4 py-2 text-gray-500 bg-white rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}