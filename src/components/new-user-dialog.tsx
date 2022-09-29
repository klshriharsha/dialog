import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { MdPerson } from 'react-icons/md'

import { User } from '../types/user'
import Dialog, { DialogBody, DialogFooter, DialogHeader } from './dialog/dialog'

interface NewUserDialogProps {
    isOpen?: boolean
    onClose?: VoidFunction
    onSubmit?: (data: User) => void
}

export default function NewUserDialog({ isOpen, onClose, onSubmit }: NewUserDialogProps) {
    const form = useRef<HTMLFormElement>(null)

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {
        if (form.current) {
            const formData = new FormData(form.current)
            const file = formData.get('avatar') as File
            let imageSrc: string | undefined
            if (file.name && file.size) {
                imageSrc = URL.createObjectURL(file)
            }

            onSubmit?.({ name: formData.get('name') as string, avatar: imageSrc })
        }
    }

    useEffect(() => {
        if (!isOpen && form.current) {
            form.current.reset()
        }
    }, [isOpen])

    return (
        <Dialog isOpen={isOpen}>
            <form
                method="dialog"
                ref={form}
                onSubmit={e => {
                    e.preventDefault()
                    handleSubmit(e)
                }}
            >
                <DialogHeader text="New User" icon={<MdPerson />} onClose={onClose} />
                <DialogBody>
                    <VStack gap="2">
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input name="name" required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Avatar image</FormLabel>
                            <Input name="avatar" type="file" accept="image/png, image/jpeg" />
                        </FormControl>
                    </VStack>
                </DialogBody>
                <DialogFooter>
                    <Button variant="outline" size="sm" colorScheme="red" type="reset">
                        Clear
                    </Button>
                    <Button variant="outline" size="sm" colorScheme="teal" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="solid" size="sm" colorScheme="teal" type="submit">
                        Confirm
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    )
}
