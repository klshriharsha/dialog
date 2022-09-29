import { Box, Container, Heading, IconButton, Spacer, useColorMode } from '@chakra-ui/react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box bg={colorMode === 'light' ? 'gray.50' : 'whiteAlpha.200'}>
            <Container maxW="8xl" py="4" as="header" display="flex">
                <Heading size="lg" fontWeight="medium">
                    Dialog component
                </Heading>
                <Spacer />
                <IconButton
                    rounded="full"
                    aria-label="change theme"
                    icon={colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
                    onClick={toggleColorMode}
                />
            </Container>
        </Box>
    )
}
