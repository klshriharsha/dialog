import { Flex, Heading, IconButton, Spacer, useColorMode } from '@chakra-ui/react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex p="2" as="header">
            <Heading size="lg">Dialog component</Heading>
            <Spacer />
            <IconButton
                rounded="full"
                aria-label="change theme"
                icon={colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
                onClick={toggleColorMode}
            />
        </Flex>
    )
}
