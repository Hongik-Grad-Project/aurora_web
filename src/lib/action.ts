import {

} from './types'

// 0.1. 추천 프로젝트 조회 (GET /recommends)
export async function GetRecommendProjects(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/recommends`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })
  return response
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
  const data = await response.json()
  return data
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

  return response
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

  return response
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

// 2.2. 

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

  return null;
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

  return response
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

  return response
}

// 3.1. 프로젝트 개요 저장 (POST /project/outline/save)
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
  return response
}

// 3.4. 프로젝트 본문 저장 (POST /project/{projectId}/body/save)
export async function PostProjectBodyData(accessToken: string, projectId: number, payload: any, files: File[]) {
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

  return response;
}


// 4.1. 프로젝트 갤러리 상세 조회 (GET /gallery/{projectId})
export async function GetProjectGalleryDetail(accessToken: string, projectId: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/gallery/${projectId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })
  const data = await response.json()
  return data
}

// 6.1. 마이페이지 조회 API (GET /mypage)
export async function GetMyPage(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/mypage`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  const data = await response.json()
  return data
}

// 6.2. 마이페이지 수정 API (POST /mypage/update)
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

  return response
}