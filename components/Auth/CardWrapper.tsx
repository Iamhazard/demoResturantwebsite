import { CardWrapperProps } from '@/@types/enum'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Header } from './CardHeader'
import { BackButton } from './BackButton'
import { Social } from './Social'


const CardWrapper = ({ children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial, }: CardWrapperProps) => {
    return (
        <Card className='w-[400px] max-w[600] shadow-md my-2'>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>

        </Card>
    )
}

export default CardWrapper