import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Feed() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Link 태그 중첩 에러를 막기 위해 함수형 라우팅 도구 사용
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // 🚨 핵심 포인트: profiles 테이블까지 한 번에 조인(Join)해서 가져옵니다!
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_roles ( id, role_name, is_closed ),
          profiles ( id, school_email )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('데이터 불러오기 에러:', err.message);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10 font-semibold text-gray-500">프로젝트 불러오는 중...</div>;
  if (errorMsg) return <div className="text-center py-10 text-red-500">에러: {errorMsg}</div>;
  if (projects?.length === 0) return <div className="text-center py-10 border border-gray-300 rounded-md bg-white">아직 등록된 프로젝트가 없습니다. 첫 글을 작성해보세요!</div>;

  return (
    <div className="flex flex-col space-y-4 w-full">
      {projects.map((project) => {
        // 이메일에서 아이디 부분만 추출 (예: bucky@wisc.edu -> bucky)
        const authorName = project.profiles?.school_email ? project.profiles.school_email.split('@')[0] : '익명 유저';
        
        return (
          <div 
            key={project.id} 
            onClick={() => navigate(`/post/${project.id}`)}
            className="block border border-gray-200 rounded-xl bg-white p-6 hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer"
          >
            {/* 상단: 작성자 프로필 & 우측 태그/날짜 */}
            <div className="flex justify-between items-start mb-4">
              
              {/* 작성자 프로필 영역 (클릭 시 해당 유저 프로필로 이동) */}
              <div 
                onClick={(e) => {
                  e.stopPropagation(); // 🚨 이벤트 버블링 차단: 상세 페이지로 넘어가는 걸 막음
                  navigate(`/user/${authorName}`); // App.jsx에 설정된 프로필 라우터로 이동
                }}
                className="flex items-center space-x-3 group"
              >
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg group-hover:bg-indigo-200 transition-colors">
                  {authorName[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {authorName}
                  </p>
                  <p className="text-xs text-gray-500">Wisc Student</p>
                </div>
              </div>

              {/* 우측: 카테고리 태그 및 날짜 */}
              <div className="flex flex-col items-end">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-full border border-indigo-100 mb-1">
                  {project.category_tag}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* 중단: Content를 삭제하고 Title만 깔끔하게 강조 */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{project.title}</h2>

            {/* 하단: 모집 직군 뱃지 리스트 */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 items-center">
              <span className="text-xs text-gray-500 font-bold mr-1">모집 중:</span>
              {project.project_roles && project.project_roles.map(role => (
                <span 
                  key={role.id} 
                  className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                    role.is_closed 
                      ? 'bg-gray-100 text-gray-400 border-gray-200' 
                      : 'bg-green-50 text-green-700 border-green-200'
                  }`}
                >
                  {role.role_name} {role.is_closed && '(마감)'}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}