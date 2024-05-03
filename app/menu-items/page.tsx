'use client'
import CardWrapper from '@/components/Auth/CardWrapper'
import { FormError } from '@/components/Auth/form-error'
import { FormSuccess } from '@/components/Auth/form-success'
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper'
import EditableImage from '@/components/layout/Editableimgae'
import Menuitems from '@/components/layout/Menu-items'
import Usertab from '@/components/layout/Usertab'
import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

const MenuItemsPage = ({ menuItem, onSubmit }: any) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [image, setImage] = useState(menuItem?.image || '');
    const [categories, setCategories] = useState([])
    const [editategories, setEditCategories] = useState(null)
    const form = useForm()
    const [menuItems, setMenuItems] = useState([]);



    return (
        <MaxWidthWrapper>
            <Usertab isAdmin={true} />
            <CardWrapper
                headerLabel='Menu'
                backButtonHref='/profile/category'
                backButtonLabel='back'

            >
                <div className='flex items-center justify-center py-6'>
                    <Button className='w-full' variant='clicks' size='btns'><Link
                        href="/menu-items/new"
                    >Show all menu items &rarr;</Link> </Button>
                </div>
            </CardWrapper>

        </MaxWidthWrapper>
    )
}

export default MenuItemsPage