import { Flex, IconButton, Image } from '@chakra-ui/react'
import { ForwardedRef, forwardRef } from 'react'
import { MdAdd, MdClear } from 'react-icons/md'

import avatar from '../../assets/avatar.svg'

interface AvatarProps {
    name?: string
    addBtn?: boolean
    imageSrc?: string
    onAdd?: VoidFunction
    onRemove?: VoidFunction
}

function Avatar({ imageSrc, name, addBtn, onAdd, onRemove }: AvatarProps, ref: ForwardedRef<HTMLDivElement>) {
    if (addBtn) {
        return (
            <IconButton aria-label="add user" rounded="full" boxSize="24" onClick={onAdd}>
                <MdAdd size="24" />
            </IconButton>
        )
    }

    return (
        <Flex
            ref={ref}
            justify="center"
            align="center"
            boxSize="24"
            rounded="full"
            position="relative"
            display="inline-flex"
            bg="whiteAlpha.100"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="blackAlpha.400"
        >
            <Image boxSize="14" src={imageSrc ?? avatar} alt={name ?? 'avatar'} />
            <IconButton
                size="md"
                top="-5px"
                right="-5px"
                rounded="full"
                position="absolute"
                aria-label="remove user"
                onClick={onRemove}
            >
                <MdClear />
            </IconButton>
        </Flex>
    )
}

export default forwardRef(Avatar)
