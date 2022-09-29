import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from './pages/error'
import Home from './pages/home'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
])

export default router
