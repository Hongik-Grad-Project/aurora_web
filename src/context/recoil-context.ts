
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()


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

// 오로라 구현부
import { ProjectGallery, ChatHistory, ChatRoom, SummaryRoom, SummaryContent } from '@/lib/types'

export const filteredProjectGalleryState = atom<ProjectGallery[]>({
  key: 'filteredProjectGalleryState',
  default: [],
})

export const selectedChatRoomState = atom<ChatRoom>({
  key: 'selectedChatRoomState',
  default: {
    chatRoomId: 0,
    chatRoomName: '',
    isSummarized: false,
    updatedAt: '',
  },
})

export const selectedChatRoomIdState = atom<number | null>({
  key: 'selectedChatRoomIdState', // unique key for Recoil state
  default: null, // initial value (no selected chat room)
});

export const chatRoomsState = atom<ChatRoom[]>({
  key: 'chatRoomsState', // unique key for Recoil state
  default: [], // initial value (empty list)
});

// 선택한 채팅 내용 상태
export const selectedChatHistoryState = atom<ChatHistory[]>({
  key: 'selectedChatHistoryState', // 고유한 키를 설정
  default: [], // 초기값: 빈 배열
});




// 요약 상태 관리 코드 시작부

// 선택한 요약 방 상태
export const selectedSummaryRoomState = atom<SummaryRoom>({
  key: 'selectedSummaryRoomState',
  default: {
    noteId: 0,
    title: '',
    createdAt: ''
  },
})

// 선택한 요약 방 ID 상태
export const selectedSummaryRoomIdState = atom<number | null>({
  key: 'selectedSummaryRoomIdState',
  default: null,
});

// 요약 방 목록 상태
export const summaryRoomsState = atom<SummaryRoom[]>({
  key: 'summaryRoomsState',
  default: [],
});

// 선택한 요약 내용 상태
export const selectedSummaryContentState = atom<SummaryContent | null>({
  key: 'selectedSummaryContentState',
  default: {
    noteId: 0,
    target: '',
    problem: '',
    title: '',
    openTitleList: [],
    openSummaryList: [],
    solution: '',
  },
});


// 기획서 자동 완성 
export const subTitleListState = atom<string[]>({
  key: 'subTitleListState',
  default: [],
});

export const contentListState = atom<string[]>({
  key: 'contentListState',
  default: [],
});
