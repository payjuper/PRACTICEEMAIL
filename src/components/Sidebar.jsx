import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const rankings = [
  { country: 'United States', code: 'US', users: 12034, flag: '🇺🇸' },
  { country: 'India', code: 'IN', users: 9876, flag: '🇮🇳' },
  { country: 'Brazil', code: 'BR', users: 7654, flag: '🇧🇷' },
  { country: 'Germany', code: 'DE', users: 6543, flag: '🇩🇪' },
  { country: 'United Kingdom', code: 'GB', users: 5432, flag: '🇬🇧' },
  { country: 'Japan', code: 'JP', users: 4321, flag: '🇯🇵' },
  { country: 'Canada', code: 'CA', users: 3210, flag: '🇨🇦' },
  { country: 'France', code: 'FR', users: 2109, flag: '🇫🇷' },
  { country: 'Australia', code: 'AU', users: 1098, flag: '🇦🇺' },
  { country: 'South Korea', code: 'KR', users: 987, flag: '🇰🇷' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Example state if needed

  return (
    <aside className="fixed top-20 left-0 z-40 w-64 h-[calc(100vh-5rem)] bg-white text-gray-900 p-4 border-r border-gray-300 flex flex-col">
      <div>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:bg-gray-200 active:bg-gray-300 p-2 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/chat" className="hover:bg-gray-200 active:bg-gray-300 p-2 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>Chat
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/c/all" className="hover:bg-gray-200 active:bg-gray-300 p-2 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>Communities
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-0 border border-gray-300 rounded-md p-2">
        <h3 className="text-lg font-semibold mb-2">Real-time Users</h3>
        <ul>
          {rankings.map((item, index) => (
            <li key={item.code} className="flex items-center justify-between mb-0 py-1 px-2 rounded hover:bg-gray-100">
              <div className="flex items-center">
                <span className="mr-3">{item.flag}</span>
                <span className="text-sm font-medium">{item.country}</span>
              </div>
              <span className="text-sm font-bold">{item.users.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/user/gemini-user" className="mt-auto">
        <div className="flex items-center">
          <img
            src="https://www.gravatar.com/avatar/?d=mp"
            alt="Profile"
            className="rounded-full h-10 w-10 mr-3"
          />
          <div className="flex-1">
            <span className="block font-semibold">Gemini User</span>
            <div className="flex items-center">
              <span className="block h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </Link>
    </aside>
  );
}