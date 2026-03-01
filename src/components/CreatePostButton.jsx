import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { PencilSquareIcon } from '@heroicons/react/24/outline'; // 영교 님의 원래 아이콘 복구!

export default function CreatePostButton() {
  const navigate = useNavigate();

  const handleCreateClick = async (e) => {
    e.preventDefault(); // 버튼의 기본 동작을 잠시 멈춤

    // 1. 현재 세션(로그인 상태)을 DB에 물어봄
    const { data: { session } } = await supabase.auth.getSession();

    // 2. 세션이 없다면? (비로그인 유저)
    if (!session) {
        alert('팀원 모집글을 작성하려면 로그인이 필요합니다!');
        navigate('/login'); // 로그인 페이지로 쫓아냄
        return;
    }

    // 3. 세션이 있다면? (App.jsx에 정의된 진짜 주소로 이동!)
    navigate('/submit'); 
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <button
        onClick={handleCreateClick}
        className="flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-200"
        title="Create a new post"
      >
        <PencilSquareIcon className="h-7 w-7" />
      </button>
    </div>
  );
}