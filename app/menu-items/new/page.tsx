'use client'
import CardWrapper from '@/components/Auth/CardWrapper'
import MenuItem from '@/components/NavBar/Home/Menu/MenuItem'
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper'
import Menuitems from '@/components/layout/Menu-items'
import Usertab from '@/components/layout/Usertab'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FcLeft } from 'react-icons/fc'

const NewPage = () => {
    return (
        <section className='mt-8'>
            <Usertab isAdmin={true} />

            <div className='flex items-center justify-center py-6'>
                <Button className='w-full' variant='clicks' size='btns'><Link


                    href="/"
                />Create a new menu <FcLeft /> </Button>
            </div>
            <Menuitems />




        </section>
    )
}

export default NewPage