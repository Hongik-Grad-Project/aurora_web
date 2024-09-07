import { Career, Education, FindTeamInterface, TeamProfile, ProjectGalleryInterface } from '@/lib/types'
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const educationListState = atom<Education[]>({
  key: 'educationListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const emailState = atom({
  key: 'emailState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
})

export const careerListState = atom<Career[]>({
  key: 'careerListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

export const myDataState = atom({
  key: 'myDataState',
  default: {},
})

export const authState = atom<boolean>({
  key: 'authState',
  default: false, // Default to not logged in
})

// context/recoil-context.ts

import { PrivateProfile } from '@/lib/types'

export const filteredProfilesState = atom<PrivateProfile[]>({
  key: 'filteredProfilesState',
  default: [],
})
export const filteredTeamsState = atom<FindTeamInterface[]>({
  key: 'filteredTeamsState',
  default: [],
})


import { ProjectGallery, ChatHistory, ChatRoom } from '@/lib/types'

// 오로라 구현부
export const filteredProjectGalleryState = atom<ProjectGallery[]>({
  key: 'filteredProjectGalleryState',
  default: [],
})

// 채팅 내역 상태 (selectedChatHistoryState)
export const selectedChatHistoryState = atom<ChatHistory[]>({
  key: 'selectedChatHistoryState', // 고유한 키를 설정
  default: [], // 초기값: 빈 배열
});

export const selectedChatRoomState = atom<ChatRoom>({
  key: 'selectedChatRoomState',
  default: {
    chatRoomId: 0,
    chatRoomName: '',
    isSummarized: false,
    updatedAt: '',
  },
})

export const chatRoomsState = atom<ChatRoom[]>({
  key: 'chatRoomsState', // unique key for Recoil state
  default: [], // initial value (empty list)
});

export const selectedChatRoomIdState = atom<number | null>({
  key: 'selectedChatRoomIdState', // unique key for Recoil state
  default: null, // initial value (no selected chat room)
});