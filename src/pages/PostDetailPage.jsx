import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function PostDetailPage() {
    const { postId } = useParams();
    const navigate = useNavigate();
    
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null); // 로그인한 유저 정보 저장

    useEffect(() => {
        fetchData();
    }, [postId]);

    const fetchData = async () => {
        try {
            // 1. 현재 로그인한 유저가 누구인지 (세션) 가져오기
            const { data: { session } } = await supabase.auth.getSession();
            setCurrentUser(session?.user || null);

            // 2. 글 상세 데이터 가져오기 (작성자 이메일 확인을 위해 profiles도 조인)
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    project_roles ( id, role_name, is_closed ),
                    profiles ( id, school_email )
                `)
                .eq('id', postId)
                .single();

            if (error) throw error;
            setProject(data);
        } catch (error) {
            console.error('글 상세정보 불러오기 에러:', error.message);
            alert('존재하지 않거나 삭제된 프로젝트입니다.');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    // [손님용 기능] 지원하기
    const handleApply = async (roleId, roleName) => {
        if (!currentUser) {
            alert('지원하시려면 먼저 로그인을 해주세요!');
            navigate('/login');
            return;
        }
        alert(`[${roleName}] 포지션에 지원했습니다! (DB 저장 기능은 곧 추가됩니다)`);
    };

    // [주인용 기능] 모집 마감 / 마감 취소 토글
    const handleToggleClose = async (roleId, currentStatus) => {
        const newStatus = !currentStatus; // 상태 뒤집기 (열림 <-> 닫힘)
        
        // DB 업데이트 쿼리
        const { error } = await supabase
            .from('project_roles')
            .update({ is_closed: newStatus })
            .eq('id', roleId);

        if (error) {
            alert('상태 변경에 실패했습니다.');
            console.error(error);
        } else {
            // 화면 즉시 리렌더링 (Optimistic UI Update)
            setProject({
                ...project,
                project_roles: project.project_roles.map(role => 
                    role.id === roleId ? { ...role, is_closed: newStatus } : role
                )
            });
        }
    };

    // [주인용 기능] 글 전체 삭제
    const handleDelete = async () => {
        const isConfirm = window.confirm('정말로 이 글을 삭제하시겠습니까? (관련 데이터도 모두 삭제됩니다)');
        if (!isConfirm) return;

        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', project.id);

        if (error) {
            alert('글 삭제에 실패했습니다.');
            console.error(error);
        } else {
            alert('글이 성공적으로 삭제되었습니다.');
            navigate('/'); // 삭제 후 홈으로 쫓아냄
        }
    };

    // [주인용 기능] 글 수정 (해커톤 MVP용 임시 알림)
    const handleEdit = () => {
        alert('글 수정 페이지는 아직 개발 중입니다! (기능 추가 예정)');
    };

    if (loading) return <div className="text-center py-10 font-bold text-gray-500">프로젝트 정보를 불러오는 중입니다...</div>;
    if (!project) return null;

    // 🚨 권한 체크 로직: "내가 이 글의 작성자인가?" (True or False)
    const isAuthor = currentUser?.id === project.author_id;

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* 상단 헤더 영역 */}
            <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-extrabold rounded-md">
                        {project.category_tag}
                    </span>
                    <span className="text-sm text-gray-400">
                        {new Date(project.created_at).toLocaleDateString()}
                    </span>
                </div>
                
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{project.title}</h1>
                        <p className="text-sm text-gray-500 font-medium">
                            작성자: {project.profiles?.school_email?.split('@')[0] || '익명 유저'}
                        </p>
                    </div>

                    {/* 🛠️ [조건부 렌더링] 작성자에게만 보이는 수정/삭제 버튼 */}
                    {isAuthor && (
                        <div className="flex space-x-2 ml-4">
                            <button onClick={handleEdit} className="px-3 py-1 text-sm font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition-colors">
                                수정
                            </button>
                            <button onClick={handleDelete} className="px-3 py-1 text-sm font-bold bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition-colors">
                                삭제
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* 본문 영역 */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">프로젝트 개요</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-8">
                    {project.content}
                </p>

                {/* 모집 직군 및 지원 버튼 영역 */}
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">모집 중인 포지션</h3>
                <div className="space-y-3">
                    {project.project_roles && project.project_roles.map((role) => (
                        <div key={role.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:border-indigo-300 transition-colors">
                            <span className="font-semibold text-gray-800 text-lg">
                                {role.role_name}
                                {role.is_closed && <span className="ml-2 text-sm text-red-500 font-bold">(마감됨)</span>}
                            </span>
                            
                            {/* 🛠️ [조건부 렌더링] 작성자냐 아니냐에 따라 버튼이 바뀜! */}
                            {isAuthor ? (
                                // [1] 작성자가 보는 뷰 (마감하기 / 마감 취소)
                                <button 
                                    onClick={() => handleToggleClose(role.id, role.is_closed)}
                                    className={`px-5 py-2 font-bold rounded-md transition-colors ${
                                        role.is_closed 
                                            ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' 
                                            : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`}
                                >
                                    {role.is_closed ? '마감 취소' : '마감하기'}
                                </button>
                            ) : (
                                // [2] 남들이 보는 뷰 (지원하기 / 지원불가)
                                role.is_closed ? (
                                    <button disabled className="px-5 py-2 bg-gray-100 text-gray-400 font-bold rounded-md cursor-not-allowed">
                                        모집 마감
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleApply(role.id, role.role_name)}
                                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition-colors"
                                    >
                                        지원하기
                                    </button>
                                )
                            )}
                        </div>
                    ))}
                    {project.project_roles?.length === 0 && (
                        <div className="text-gray-500 text-sm">등록된 모집 포지션이 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
}