import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, authState, summaryRoomsState, selectedSummaryRoomIdState, selectedSummaryContentState } from '@/context/recoil-context';
import { SummaryRoom } from '@/lib/types';
import { GetSummaryNoteList, GetSummaryNoteContent } from '@/lib/action';

export default function SummaryNav() {
    const accessToken = useRecoilValue(accessTokenState) || '';
    const isAuth = useRecoilValue(authState);
    const [selectedSummaryRoomId, setSelectedSummaryRoomId] = useRecoilState(selectedSummaryRoomIdState);
    const setSummaryContents = useSetRecoilState(selectedSummaryContentState);
    const [summaryRooms, setSummaryRooms] = useRecoilState<SummaryRoom[]>(summaryRoomsState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummaryRooms = async () => {
            setLoading(true);
            setError(null);

            try {
                const summaryRoomsResponse = await GetSummaryNoteList(accessToken);
                setSummaryRooms(summaryRoomsResponse);
            } catch (err) {
                console.error('Error fetching summary rooms:', err);
                setError('Failed to load chat rooms.');
            } finally {
                setLoading(false);
            }
        };

        if (isAuth && accessToken) {
            fetchSummaryRooms();
        }
    }, [accessToken, isAuth, setSummaryRooms]);

    useEffect(() => {
        const fetchSummaryContent = async () => {
            if (selectedSummaryRoomId !== null) {
                try {
                    const response = await GetSummaryNoteContent(accessToken, selectedSummaryRoomId.toString());
                    if (response.ok) {
                        const contentData = await response.json();
                        setSummaryContents(contentData);
                    } else {
                        console.error("Failed to fetch summary content:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching summary content:", error);
                }
            } else {
                setSummaryContents(null);
            }
        };

        if (isAuth && accessToken) {
            fetchSummaryContent();
        }
    }, [selectedSummaryRoomId, setSummaryContents]);

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
                            className={`flex items-center justify-between p-4
                                rounded-lg shadow-sm cursor-pointer transition duration-200
                                ease-in-out ${selectedSummaryRoomId === sumRoom.noteId ? "bg-[#EFEDFF] hover:bg-[#CEC6FF]" : "bg-gray-50 hover:bg-gray-100"
                                }`}
                            onClick={() => onSelectSummaryRoom(sumRoom.noteId)}
                        >
                            <div className="flex flex-col space-y-1">
                                <div className="text-md font-medium text-gray-800">
                                    {sumRoom.title}
                                </div>
                                <div className="text-xs text-gray-400 text-left">
                                    {new Date(sumRoom.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
