import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import { useRouteError } from 'react-router-dom'

import errorImg from '../assets/error.svg'

export default function ErrorPage() {
    const error: any = useRouteError()

    return (
        <VStack as="main" height="full" justify="center">
            <Image boxSize="sm" src={errorImg} alt="error" />
            <Heading>Oops!</Heading>
            <Text>Sorry, an error occured.</Text>
            <Text color="tomato" fontStyle="italic">
                {error.status} {error.statusText}
            </Text>
        </VStack>
    )
}
