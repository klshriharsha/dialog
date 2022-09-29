import { Button, Text } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { MdWarningAmber } from 'react-icons/md'

import Dialog, { DialogBody, DialogFooter } from '../components/dialog/dialog'

interface ConfirmationDialogProps extends PropsWithChildren {
    isOpen?: boolean
    onConfirm?: VoidFunction
    onCancel?: VoidFunction
}

export default function ConfirmationDialog({ isOpen, onConfirm, onCancel, children }: ConfirmationDialogProps) {
    return (
        <Dialog isOpen={isOpen} isConfirmation>
            <form
                method="dialog"
                onSubmit={e => {
                    e.preventDefault()
                    onConfirm?.()
                }}
            >
                <DialogBody isConfirmation>
                    {!children || typeof children === 'string' ? (
                        <>
                            <MdWarningAmber
                                size="1.1em"
                                style={{ display: 'inline', color: 'orange', verticalAlign: 'middle' }}
                            />
                            &nbsp;
                            <Text display="inline" verticalAlign="middle">
                                {children || 'Are you sure you want to remove this user?'}
                            </Text>
                        </>
                    ) : (
                        children
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button size="sm" variant="outline" colorScheme="teal" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button size="sm" variant="solid" colorScheme="teal" type="submit">
                        Confirm
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    )
}
