import React, { useState } from 'react';

const sortOptions = [
    { id: 'hot', name: 'Hot' },
    { id: 'new', name: 'New' },
    { id: 'top', name: 'Top' },
];

export default function SortBar() {
    const [activeSort, setActiveSort] = useState('hot');

    return (
        <div className="bg-white border border-gray-300 rounded-md p-2 mb-4 flex items-center space-x-2">
            {sortOptions.map((option) => (
                <button
                    key={option.id}
                    onClick={() => setActiveSort(option.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full ${
                        activeSort === option.id
                            ? 'bg-gray-200 text-gray-900'
                            : 'bg-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {option.name}
                </button>
            ))}
        </div>
    );
}