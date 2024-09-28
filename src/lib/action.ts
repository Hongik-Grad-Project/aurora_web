import {
  LikeResponse, CreateChatRoomResponse
} from './types'

// 0.1. 추천 프로젝트 조회 (GET /recommends)
export async function GetRecommendProjects(accessToken: string) {
  // accessToken이 없는 경우 Authorization 및 credentials 설정하지 않음
  const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  const options: RequestInit = {
    method: 'GET',
    headers,
    credentials: accessToken ? 'include' : 'omit', // 토큰이 없으면 쿠키 전송을 생략
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/recommends`, options);

  if (!response.ok) {
    throw new Error('Failed to fetch recommended projects');
  }

  return await response.json();
}

// 1.2. (access-token 만료 시) 토큰 재발급 (POST /token) 
export const RefreshAccessToken = async (accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })
  return await response.json();
}

// 로그아웃
export async function Logout(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/logout`, {
    method: 'DELETE',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 회원탈퇴
export async function Withdrawal(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/account`, {
    method: 'DELETE',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 2.1. 채팅방 목록 조회 (GET /chat)
export async function GetChatList(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/chat`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chat list');
  }

  return response.json(); // 응답 데이터를 JSON 형식으로 반환
}

// 2.4. 새로운 채팅방 생성 (POST /chat/v2)
export async function GetChatLocation(accessToken: string): Promise<string | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/chat/v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.status === 201) {
    // Location 헤더에서 URL 추출
    return response.headers.get('Location');
  }

  return await response.json();
}


// 2.5. 메시지 보내기 (POST /chat/{chatRoomId}/message/v2)
export async function SendMessage(accessToken: string, chatRoomId: string, message: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/chat/${chatRoomId}/message/v2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({ message }),
  })

  return await response.json();
}

// 2.6. 요약 노트 생성
export async function CreateSummaryNote(accessToken: string, chatRoomId: string): Promise<CreateChatRoomResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/chat/${chatRoomId}/summary`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 2.7. 채팅방 삭제
export async function DeleteChatRoom(accessToken: string, chatRoomId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/chat/${chatRoomId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 2.8. 채팅 내역 조회 ( GET /chat/:chatRoomId/history )
export async function GetChatHistory(accessToken: string, chatRoomId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/chat/${chatRoomId}/history`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 3.1. 요약 노트 목록 조회 (GET /note)
export async function GetSummaryNoteList(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/note`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch chat list');
  }

  return await response.json();
}

// 3.2. 요약 노트 상세 조회 (GET /note/:noteId)
export async function GetSummaryNoteContent(accessToken: string, noteId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/note/${noteId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })
  return await response.json();
}

// 3.3. 요약 노트 삭제 (DELETE /note/:noteId)
export async function DeleteSummaryNote(accessToken: string, noteId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/note/${noteId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })
}

// 3.4. 기획서 자동 완성하기 (POST /note/{noteId}/completion)
export async function CompleteSummaryNote(accessToken: string, noteId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/note/${noteId}/completion`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 4.1. 프로젝트 개요 저장 (POST /project/outline/save)
export async function PostProjectOutlineData(accessToken: string, payload: any, projectRepresentImage: File | null) {
  const formData = new FormData()
  formData.append('dto', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

  if (projectRepresentImage) {
    formData.append('file', projectRepresentImage)
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/project/outline/save`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: formData,
  })

  if(response.status === 201) {
    return response.headers.get('Location');  
  }

  return await response.json();
}

// 4.2. 프로젝트 개요 조회 (GET /project/{projectId}/outline)
export async function GetProjectOutlineData(accessToken: string, projectId: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/project/${projectId}/outline`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 4.3. 프로젝트 개요 수정 (POST /project/{projectId}/outline/edit)
export async function EditProjectOutlineData(accessToken: string, projectId: string, payload: any, projectRepresentImage: File | null) {
  const formData = new FormData()
  formData.append('dto', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

  if (projectRepresentImage) {
    formData.append('file', projectRepresentImage)
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/project/${projectId}/outline/edit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: formData,
  })
  return await response.json();
}

// 4.4. 프로젝트 본문 저장 (POST /project/{projectId}/body/save)
export async function PostProjectBodyData(accessToken: string, projectId: string, payload: any, files: File[]) {
  const formData = new FormData();

  // JSON 데이터를 문자열로 변환하여 formData에 추가
  formData.append('dto', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  // 파일 데이터를 formData에 추가
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/project/${projectId}/body/save`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: formData, // FormData 객체를 body로 설정
  });

  return await response.json();
}

// 4.5. 프로젝트 본문 조회 (GET /project/{projectId}/body)
export async function GetProjectBodyData(accessToken: string, projectId: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/project/${projectId}/body`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 4.6. 프로젝트 본문 수정 (POST /project/{projectId}/outline/edit)
export async function EditProjectBodyData(accessToken: string, projectId: number, payload: any, files: File[]) {
  const formData = new FormData();

  // JSON 데이터를 문자열로 변환하여 formData에 추가
  formData.append('dto', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  // 파일 데이터를 formData에 추가
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/project/${projectId}/body/edit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: formData, // FormData 객체를 body로 설정
  });

  return await response.json();
}

// 4.7. 프로젝트 등록 (POST /project/{projectId}/register)
export async function RegisterProject(accessToken: string, projectId: string, payload: any, files: File[]) {
  const formData = new FormData();

  // JSON 데이터를 문자열로 변환하여 formData에 추가
  formData.append('dto', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

  // 파일 데이터를 formData에 추가
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/project/${projectId}/register`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: formData,
  })
}

// 4.8. 프로젝트 삭제 (DELETE /project/{projectId})
export async function DeleteProject(accessToken: string, projectId: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/project/${projectId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 5.1. 프로젝트 갤러리 상세 조회 (GET /gallery/{projectId})
export async function GetProjectGalleryDetail(accessToken: string, projectId: number) {
  const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  const options: RequestInit = {
    method: 'GET',
    headers,
    credentials: accessToken ? 'include' : 'omit', // 토큰이 없으면 쿠키 전송을 생략
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/gallery/${projectId}`, options)
  
  if (!response.ok) {
    throw new Error('Failed to fetch recommended projects');
  }
  
  return await response.json();
}

// 5.2. 프로젝트 갤러리 조회 (GET /gallery)
export async function GetProjectGallery(accessToken: string) {
  const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  const options: RequestInit = {
    method: 'GET',
    headers,
    credentials: accessToken ? 'include' : 'omit', // 토큰이 없으면 쿠키 전송을 생략
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/gallery`, options)
  if (!response.ok) {
    throw new Error('Failed to fetch recommended projects');
  }

  return await response.json();
}

// 5.3. 프로젝트 갤러리 키워드로 검색 (GET /gallery/search/keyword?page=0&size=10&keyword=검색어)
export async function SearchProjectGallery(accessToken: string, keyword: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/gallery/search/keyword?page=1&size=8&keyword=${keyword}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })
  return await response.json();
}

// 5.4. 프로젝트 갤러리 태그로 검색 (GET /gallery/search/tag?page=0&size=10&tag=태그)
export async function SearchProjectGalleryByTag(accessToken: string, tag: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/gallery/search/tag?page=1&size=8&tag=${tag}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })
  return await response.json();
}

// 6.1. 프로젝트 좋아요 상태 변경 (POST /project/{projectId}/like)
// ToggleProjectLike 함수 수정
export async function ToggleProjectLike(accessToken: string, projectId: number, isLike: boolean): Promise<LikeResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/project/${projectId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({ isLike }),
  });

  // 반환된 데이터를 JSON으로 변환하고 반환 타입을 LikeResponse로 추론
  return await response.json();
}

// 7.1. 마이페이지 조회 API (GET /mypage)
export async function GetMyPage(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/mypage`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}


// 7.2. 프로필 수정 API (POST /mypage/update)
export async function UpdateMyPage(accessToken: string, payload: any, profileImage: File | null) {
  const formData = new FormData()
  
  formData.append('dto', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

  if (profileImage) {
    formData.append('file', profileImage)
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/mypage/update`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: formData,
  })
}

// 7.3. 내 프로젝트 모두 조회 API (GET /mypage/project)
export async function GetMyProjects(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/mypage/project`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}

// 7.4. 응원한 프로젝트 모두 조회 API (GET /mypage/like)
export async function GetLikedProjects(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/mypage/like`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json();
}