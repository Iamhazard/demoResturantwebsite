'use client'
import CardWrapper from '@/components/Auth/CardWrapper'
import { FormError } from '@/components/Auth/form-error'
import { FormSuccess } from '@/components/Auth/form-success'
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper'
import EditableImage from '@/components/layout/Editableimgae'
import Usertab from '@/components/layout/Usertab'
import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
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



    return (
        <MaxWidthWrapper className='pb-3'>
            <Usertab isAdmin={true} />

        </MaxWidthWrapper>
    )
}

export default MenuItemsPage