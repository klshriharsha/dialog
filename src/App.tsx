import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'

import Header from './components/header/header'
import ConfirmationProvider from './context/confirmation'
import router from './router'

const theme = extendTheme({
    styles: {
        global: {
            'html, body, #root': {
                height: '100%',
            },
            '#root': {
                display: 'flex',
                flexDirection: 'column',
            },
            dialog: {
                padding: '0',
                backgroundColor: 'transparent',
            },
            'dialog:modal': {
                maxWidth: { base: 'initial', sm: 'calc((100% - 6px) - 2em)' },
            },
            'dialog::backdrop': {
                backgroundColor: baseTheme.colors.blackAlpha[600],
            },
        },
    },
})

function App() {
    return (
        <ChakraProvider theme={theme}>
            <ConfirmationProvider>
                <Header />
                <RouterProvider router={router} />
            </ConfirmationProvider>
        </ChakraProvider>
    )
}

export default App
