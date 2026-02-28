import React, { useState } from 'react';
// 1. DB랑 통신할 만능 리모컨 가져오기 (경로 주의: 한 칸 위)
import { supabase } from '../supabaseClient';
// 2. 글 다 쓰면 메인 화면으로 순간이동 시킬 포탈 도구 가져오기
import { useNavigate } from 'react-router-dom';

export default function CreatePostForm() {
    // 리액트의 기억 장치 (유저가 입력하는 제목과 내용을 실시간으로 저장)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    // 포탈 총 장전!
    const navigate = useNavigate();

    // Submit 버튼을 누르면 실행될 함수
    // (네트워크 I/O 통신을 해야 하니, 결과를 기다리게 하려고 async를 붙임)
    const handleSubmit = async (e) => {
        // 새로고침 방지 (리액트 폼 제출 시 무조건 들어가는 국룰 코드)
        e.preventDefault();
        
        console.log('DB로 데이터 전송 시작...');

        // 3. Supabase DB에 데이터 밀어넣기
        // (await로 멱살 잡고 대기시킴 -> 완벽하게 저장이 끝날 때까지 아래 코드로 안 넘어감!)
        const { data, error } = await supabase
            .from('posts')
            .insert([
                { 
                    title: title, 
                    content: content 
                }
            ]);

        // 4. 저장 결과에 따른 처리 로직
        if (error) {
            console.error('앗! DB 저장 에러:', error.message);
            alert('글 저장에 실패했습니다.');
        } else {
            console.log('DB 저장 성공!', data);
            alert('글이 성공적으로 등록되었습니다!');
            
            // 5. 뒷정리 및 화면 이동
            setTitle(''); // 입력창 텍스트 비우기
            setContent(''); // 본문 텍스트 비우기
            
            // 아까 장전해둔 포탈 총 발사! (메인 홈 화면인 '/' 경로로 강제 이동)
            navigate('/'); 
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white border border-gray-300 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Create a new post</h2>
            <div className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Title</span>
                    <input 
                        type="text" 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                        placeholder="Enter your post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Content</span>
                    <textarea 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                        rows="5" 
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </label>
            </div>
            <div className="flex justify-end mt-6">
                <button 
                    type="submit" 
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Submit Post
                </button>
            </div>
        </form>
    );
}