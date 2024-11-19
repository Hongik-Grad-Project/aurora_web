'use client'

import IndividualProject from "@/components/Project/IndividualProject"
import { useNavigation } from '@/context/NavigationContext'

export default function PrivateProject() {
    const { previousPath } = useNavigation();
    return (
        <div>
            <IndividualProject previousPath={previousPath} />
        </div>
    )
}   