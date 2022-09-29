import './dialog.css'

import { Box, Flex, Heading, HStack, IconButton, Spacer, useColorMode } from '@chakra-ui/react'
import cn from 'classnames'
import { Children, Fragment, PropsWithChildren, ReactNode, useCallback, useEffect, useRef } from 'react'
import { MdClear } from 'react-icons/md'

export interface DialogProps extends PropsWithChildren {
    isOpen?: boolean
    isConfirmation?: boolean
}

export default function Dialog({ isOpen, children, isConfirmation }: DialogProps) {
    const ref = useRef<HTMLDialogElement>(null)

    const animateClose = useCallback(() => {
        if (ref.current) {
            ref.current.close()
            ref.current.classList.remove('dialog--animate-in')
            ref.current.classList.remove('dialog--animate-out')
        }
    }, [])

    useEffect(() => {
        const dialog = ref.current
        if (dialog) {
            if (isOpen && !dialog.open) {
                dialog.showModal()
                dialog.classList.add('dialog--animate-in')
            } else if (!isOpen && dialog.open) {
                dialog.classList.add('dialog--animate-out')
                setTimeout(animateClose, 250)
            }
        }
    }, [isOpen, animateClose])

    return (
        <Box
            as="dialog"
            shadow="2xl"
            ref={ref as any}
            left={{ base: '0' }}
            right={{ base: '0' }}
            top={{ sm: '0', base: 'auto' }}
            bottom={{ sm: '0', base: '0' }}
            width={{ sm: 'fit-content', base: '100%' }}
            className={cn('dialog', { 'dialog--blur-backdrop': !isConfirmation })}
        >
            {children}
        </Box>
    )
}

export interface DialogHeaderProps {
    text: ReactNode
    icon?: ReactNode
    onClose?: VoidFunction
}

export function DialogHeader({ text, icon, onClose }: DialogHeaderProps) {
    const { colorMode } = useColorMode()

    const bg = colorMode === 'light' ? 'gray.100' : 'gray.700'

    return (
        <HStack
            bg={bg}
            px="4"
            py="2"
            borderTopStartRadius={{ base: 'none', sm: 'md' }}
            borderTopEndRadius={{ base: 'none', sm: 'md' }}
        >
            <HStack fontSize="1.25rem">
                {icon}
                {typeof text === 'string' ? <Heading size="md">{text}</Heading> : text}
            </HStack>
            <Spacer />
            {onClose && <IconButton aria-label="close" rounded="full" icon={<MdClear />} onClick={onClose} />}
        </HStack>
    )
}

interface DialogBodyProps extends PropsWithChildren {
    isConfirmation?: boolean
}

export function DialogBody({ children, isConfirmation }: DialogBodyProps) {
    const { colorMode } = useColorMode()

    const bg = colorMode === 'light' ? 'gray.50' : 'gray.600'
    const borderRadius = isConfirmation
        ? { borderTopStartRadius: { base: 'none', sm: 'md' }, borderTopEndRadius: { base: 'none', sm: 'md' } }
        : {}

    return (
        <Box bg={bg} p="4" {...borderRadius}>
            {children}
        </Box>
    )
}

export function DialogFooter({ children }: PropsWithChildren) {
    const { colorMode } = useColorMode()

    const childrenArr = Children.toArray(children)
    const numChildren = childrenArr.length
    const bg = colorMode === 'light' ? 'gray.100' : 'gray.700'

    return (
        <HStack
            bg={bg}
            p="4"
            borderBottomStartRadius={{ base: 'none', sm: 'md' }}
            borderBottomEndRadius={{ base: 'none', sm: 'md' }}
        >
            <Flex gap="2">
                {childrenArr.slice(0, numChildren - 2).map((c, i) => (
                    <Fragment key={`child-${i}`}>{c}</Fragment>
                ))}
            </Flex>
            <Spacer />
            <Flex gap="2">
                {childrenArr.slice(numChildren - 2).map((c, i) => (
                    <Fragment key={`child-${i}`}>{c}</Fragment>
                ))}
            </Flex>
        </HStack>
    )
}
