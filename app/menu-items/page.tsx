'use client'
import { MenuItemsProps } from '@/@types/enum'
import CardWrapper from '@/components/Auth/CardWrapper'
import { FormError } from '@/components/Auth/form-error'
import { FormSuccess } from '@/components/Auth/form-success'
import { DeleteButton } from '@/components/DeleteButton'
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper'
import { menuItem } from '@/components/NavBar/NavLinks'
import Usertab from '@/components/layout/Usertab'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'



const MenuItemsPage = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [image, setImage] = useState();
    const [categories, setCategories] = useState([])
    const [editategories, setEditCategories] = useState(null)
    const form = useForm()
    const [menuItems, setMenuItems] = useState(2);
    const [MenuItemName, setMenuItemName] = useState('');

    const handleDeleteClick = (id: any) => {

    }


    return (
        <MaxWidthWrapper>
            <Usertab isAdmin={true} />
            <CardWrapper
                headerLabel='Menu'
                backButtonHref='/profile/category'
                backButtonLabel='back'

            >
                <div className='flex items-center justify-center py-6 '>
                    <Button variant='clicks' size='btns'><Link
                        href="/menu-items/new"
                    >Create new Menu item &rarr;</Link> </Button>
                </div>
                <div>
                    <h2 className='text-sm text-gray-500 mt-8'>Edit menu Item:</h2>

                    {menuItem?.length ? menuItem?.map((c: any) => (
                        <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                            <Link className='grow' href={'/menu-items/edit/' + c.id}>
                                <Image
                                    className="rounded-md object-fill"
                                    src={c.image} alt={''} width={60} height={60} />

                            </Link>
                            <div className="flex gap-1">
                                {c.itemName}
                            </div>

                        </div>
                    )) : <p className='px-4 '>No Categories Available</p>}
                </div>
            </CardWrapper>

        </MaxWidthWrapper>
    )
}

export default MenuItemsPage