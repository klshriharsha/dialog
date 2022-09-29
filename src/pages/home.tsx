import './home.css'

import { Container, Heading, HStack, Link, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { ImMobile } from 'react-icons/im'
import { MdAnimation } from 'react-icons/md'
import { RiFocus3Line } from 'react-icons/ri'

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
        <Container maxW="8xl" mt="10">
            <Text>
                A fully accessible and responsive modal component implemented in React using the default&nbsp;
                <strong>
                    <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog">
                        HTML dialog element.
                    </Link>
                </strong>
                <br />
                <br />
                <Heading size="md" mb="1">
                    Cool features 🎉
                </Heading>
                <List>
                    <ListItem>
                        <Heading size="lg" display="inline">
                            <ListIcon as={RiFocus3Line} color="pink.400" verticalAlign="middle" />
                        </Heading>
                        When the modal is opened, the close button inside the modal is auto-focused. When the modal is
                        closed, focus is restored to the element that triggered the modal
                    </ListItem>
                    <ListItem>
                        <Heading size="lg" display="inline">
                            <ListIcon as={MdAnimation} color="pink.400" verticalAlign="middle" display="inline" />
                        </Heading>
                        Open and close transitions (the default dialog element looks pretty boring)
                    </ListItem>
                    <ListItem>
                        <Heading size="lg" display="inline">
                            <ListIcon as={ImMobile} color="pink.400" verticalAlign="middle" display="inline" />
                        </Heading>
                        Responsive! On mobile, the modal is positioned at the bottom of the screen and on desktop, the
                        modal is positioned at the middle of the screen
                    </ListItem>
                </List>
            </Text>
            <HStack mt="20" as="main" wrap="wrap" justify="center" gap="2">
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
        </Container>
    )
}
