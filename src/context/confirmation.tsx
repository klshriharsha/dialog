import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react'

import ConfirmationDialog from './ConfirmationDialog'

interface Confirmation {
    content?: ReactNode
    onConfirm?: VoidFunction
    onCancel?: VoidFunction
}

const ConfirmationContext = createContext<((c: Confirmation) => void) | null>(null)

export default function ConfirmationProvider({ children }: PropsWithChildren) {
    const [confirmation, setConfirmation] = useState<Confirmation | null>(null)

    const handleConfirm = () => {
        confirmation?.onConfirm?.()
        setConfirmation(null)
    }

    const handleCancel = () => {
        confirmation?.onCancel?.()
        setConfirmation(null)
    }

    return (
        <ConfirmationContext.Provider value={setConfirmation}>
            {children}
            <ConfirmationDialog isOpen={!!confirmation} onCancel={handleCancel} onConfirm={handleConfirm}>
                {confirmation?.content}
            </ConfirmationDialog>
        </ConfirmationContext.Provider>
    )
}

export function useConfirmation() {
    const context = useContext(ConfirmationContext)
    if (!context) {
        throw new Error('useConfirmation must be used within ConfirmationProvider')
    }

    return context
}
