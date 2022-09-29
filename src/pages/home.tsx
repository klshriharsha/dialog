import './home.css'

import { HStack } from '@chakra-ui/react'
import { useState } from 'react'

import Avatar from '../components/avatar/avatar'
import NewUserDialog from '../components/new-user-dialog'
import { useConfirmation } from '../context/confirmation'
import { User } from '../types/user'

const defaultUsers: User[] = [{ name: 'user 1' }, { name: 'user 2' }]

export default function Home() {
    const [users, setUsers] = useState<User[]>(defaultUsers)
    const [newUserDialog, setNewUserDialog] = useState(false)

    const confirm = useConfirmation()

    return (
        <>
            <HStack as="main" height="full" justify="center">
                {users.map((user, i) => (
                    <Avatar
                        key={`${user.name}-${i}`}
                        name={user.name}
                        imageSrc={user.avatar}
                        onRemove={() =>
                            confirm({
                                onConfirm: () => {
                                    const newUsers = [...users]

                                    newUsers.splice(i, 1)
                                    setUsers(newUsers)
                                },
                            })
                        }
                    />
                ))}
                <Avatar addBtn onAdd={() => setNewUserDialog(true)} />
            </HStack>
            <NewUserDialog
                isOpen={newUserDialog}
                onSubmit={newUser => {
                    setUsers([...users, newUser])
                    setNewUserDialog(false)
                }}
                onClose={() => setNewUserDialog(false)}
            />
        </>
    )
}
