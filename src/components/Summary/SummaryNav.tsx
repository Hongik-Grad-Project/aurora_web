'use client'

import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, authState, summaryRoomsState, selectedSummaryRoomState, selectedSummaryRoomIdState, selectedSummaryContentState } from '@/context/recoil-context';
import { SummaryRoom } from '@/lib/types';
import { GetSummaryNoteList, GetSummaryNoteContent } from '@/lib/action';

export default function SummaryNav() {
    const accessToken = useRecoilValue(accessTokenState) || ''
    const isAuth = useRecoilValue(authState); // Assumed you use this to verify authentication
    const [selectedSummaryRoomId, setSelectedSummaryRoomId] = useRecoilState(selectedSummaryRoomIdState);

    const setSummaryContents = useSetRecoilState(selectedSummaryContentState); // 채팅 내역 업데이트를 위한 setter
    const [summaryRooms, setSummaryRooms] = useRecoilState<SummaryRoom[]>(summaryRoomsState); // Use Recoil for chat rooms
    const [loading, setLoading] = useState(true); // Local state for loading
    const [error, setError] = useState<string | null>(null); // Local state for errors    

    useEffect(() => {
        console.log('SummaryNav의 useEffect 실행');
        const fetchSummaryRooms = async () => {
            setLoading(true);
            setError(null); // Reset error before fetching

            try {
                const summaryRoomsResponse = await GetSummaryNoteList(accessToken);
                setSummaryRooms(summaryRoomsResponse);
            } catch (err) {
                console.error('Error fetching summary rooms:', err);
                setError('Failed to load chat rooms.');
            } finally {
                setLoading(false); // Stop loading once request finishes
            }
        }

        if (isAuth && accessToken) {
            fetchSummaryRooms();
        }
    }, [accessToken, isAuth, setSummaryRooms]);

    useEffect(() => {
        const fetchSummaryContent = async () => {
            console.log('fetchSummaryContent 실행');
            if (selectedSummaryRoomId !== null) {
                try {
                    const response = await GetSummaryNoteContent(accessToken, selectedSummaryRoomId.toString());
                    if (response.ok) {
                        const contentData = await response.json();
                        console.log('Summary content fetched:', contentData);
                        setSummaryContents(contentData);
                    } else {
                        console.error("Failed to fetch summary content:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching summary content:", error);
                }
            } else {
                setSummaryContents([]);
            }
        };

        if (isAuth && accessToken) {
            fetchSummaryContent();
        }
    }, [selectedSummaryRoomIdState, setSummaryContents]);

    // ChatNav에서 채팅방 선택
    const onSelectSummaryRoom = (noteId: number) => {
        setSelectedSummaryRoomId(noteId);
    };

    return (
        <div className="flex flex-col gap-4 p-4 bg-white h-full w-full border-r border-gray-200">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">아이디어 노트</h2>
            </div>

            {summaryRooms.length === 0 ? (
                <div className="text-gray-500">요약된 노트가 없습니다.</div>
            ) : (
                <div className="space-y-3 overflow-y-auto">
                    {summaryRooms.map((sumRoom) => (
                        <div
                            key={sumRoom.noteId}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
                            onClick={() => onSelectSummaryRoom(sumRoom.noteId)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="text-md font-medium text-gray-800">
                                    {sumRoom.title}
                                </div>
                            </div>
                            <div className="text-xs text-gray-400">
                                {new Date(sumRoom.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
