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
  const data = await response.json()
  return data
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

// 2.3. 새로운 채팅방 생성 (POST /chat/v2)
export async function GetChatLocation(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AURORA_SERVER_URL}/chat/v2`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const location = response.headers.get('Location')
  return location
}

// 2.4. 메시지 보내기 (POST /chat/{chatRoomId}/message/v2)
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