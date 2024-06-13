'use client'

import Menuitems from '@/components/layout/MenuitemsForm'
import Usertab from '@/components/layout/Usertab'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FcRight } from 'react-icons/fc'

const NewPage = () => {
    return (

        <section className='mt-8'>
            <Usertab isAdmin={true} />

            <div className='flex items-center justify-center py-2 mx-auto mt-4  max-w-xl'>
                <Link href="/menu-items"
                >
                    <Button variant='clicks' size='btns'>
                        Show all menu Items <span className='px-3'><FcRight /></span>  </Button>
                </Link>

            </div>
            <Menuitems categories={[]} menuitem={{
                id: '',
                itemName: '',
                Description: '',
                categoryId: '',
                basePrice: '',
                image: '',
                sizes: [],
                extraIngredientPrices: []
            }} />




        </section>
    )
}

export default NewPage