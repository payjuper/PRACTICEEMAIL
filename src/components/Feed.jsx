import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'Just discovered this amazing new CSS feature!',
    author: 'CSSWizard',
    handle: '@css_wizard',
    time: '3h',
    likes: 128,
    comments: 42,
    content: 'Have you all seen the new `backdrop-filter` property? It allows you to apply graphical effects like blur or color shifting to the area behind an element. I\'ve been playing with it all morning and it\'s a game-changer for UI design. No more complex workarounds!',
    avatar: 'https://www.gravatar.com/avatar/?d=retro',
  },
  {
    id: 2,
    title: 'What\'s your favorite React hook and why?',
    author: 'ReactFanatic',
    handle: '@react_fan',
    time: '5h',
    likes: 256,
    comments: 121,
    content: 'For me, it\'s `useEffect`. It\'s so versatile and handles so many different use cases, from data fetching to subscriptions. It can be tricky to get the dependency array right, but once you master it, it\'s incredibly powerful. What about you?',
    avatar: 'https://www.gravatar.com/avatar/?d=identicon',
  },
  {
    id: 3,
    title: 'A guide to state management in modern web apps',
    author: 'StateOfTheArt',
    handle: '@state_art',
    time: '1d',
    likes: 512,
    comments: 256,
    content: 'The state management landscape is always evolving. From Redux to Zustand, MobX to Context API, there are so many options. This guide breaks down the pros and cons of each and helps you choose the right one for your next project.',
    avatar: 'https://www.gravatar.com/avatar/?d=wavatar',
  },
];

// 아이콘 설계도를 변수에 캡슐화(Encapsulation)합니다.
export const CommentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
  </svg>
);

export const LikeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>

)

export const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
  </svg>

)


export default function Feed() {
  const handleActionClick = (e) => {
    e.stopPropagation();
    // In a real app, you'd handle the like/comment/share action here
    console.log('Action button clicked');
  };

  return (
    <div className="border border-gray-300 rounded-md bg-white w-full">
      {posts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id} className="block hover:bg-gray-50 cursor-pointer p-4 border-b border-gray-300 last:border-b-0">
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

              <div className="flex items-center space-x-4 text-sm font-medium mt-3 text-gray-500" onClick={handleActionClick}>
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
        </Link>
      ))}
    </div>
  );
}
