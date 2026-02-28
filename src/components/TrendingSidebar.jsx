import React from 'react';

const trends = [
  { id: 1, name: '#React19', posts: '15.2k posts' },
  { id: 2, name: '#TailwindCSS', posts: '12.8k posts' },
  { id: 3, name: '#JavaScript', posts: '11.1k posts' },
  { id: 4, name: '#WebDev', posts: '9.8k posts' },
  { id: 5, name: '#Vite', posts: '7.2k posts' },
];

export default function TrendingSidebar() {
  return (
    <div className="bg-white border border-gray-300 rounded-md p-4">
      <h3 className="text-lg font-semibold mb-4">Trending Now</h3>
      <ul className="space-y-4">
        {trends.map((trend) => (
          <li key={trend.id}>
            <a href="#" className="font-semibold text-gray-800 hover:underline">{trend.name}</a>
            <p className="text-sm text-gray-500">{trend.posts}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}