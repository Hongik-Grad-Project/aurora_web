'use client';

import ClientProvider from '@/components/common/ClientProvider';
import { createContext, useContext, useState, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface NavigationContextType {
    previousPath: string;
    setPreviousPath: (path: string) => void;
}

interface NavigationProviderProps {
    children: ReactNode;
}

// Context 생성
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Provider 컴포넌트
export function NavigationProvider({ children }: NavigationProviderProps) {
    const [previousPath, setPreviousPath] = useState<string>('');

    return (
        <ClientProvider>
            <NavigationContext.Provider value={{ previousPath, setPreviousPath }}>
                {children}
            </NavigationContext.Provider>
        </ClientProvider>
    );
}

// Custom Hook
export function useNavigation() {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
}