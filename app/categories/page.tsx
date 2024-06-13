'use client'
import { CategoryState } from '@/@types/enum'
import { createCategory, viewCategories } from '@/Redux/Features/CategorySlice'
import { AppDispatch, RootState } from '@/Redux/store'
import { CategorySchema } from '@/Schema'
import { Header } from '@/components/Auth/CardHeader'
import CardWrapper from '@/components/Auth/CardWrapper'
import { FormError } from '@/components/Auth/form-error'
import { FormSuccess } from '@/components/Auth/form-success'
import { DeleteButton } from '@/components/DeleteButton'
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper'
import Usertab from '@/components/layout/Usertab'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'

export interface Categories {
    data: CategoryState[];
}
interface CategoriesListPros {
    categories: Categories
}

const CategoryPage: React.FC<CategoriesListPros> = () => {
    const [error, setError] = useState<string | null>("");
    const [categoryName, setCategoryName] = useState('');
    const [success, setSuccess] = useState<string | null>("");
    const [isPending, startTransition] = useTransition();
    const [categories, setCategories] = useState<Categories | null>(null)
    const [editCategories, setEditCategories] = useState<CategoryState | null>(null);
    const form = useForm<z.infer<typeof CategorySchema>>({
        defaultValues: {
            category: "",

        }
    })
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((state: RootState) => state.profile);
    const category = useSelector((state: RootState) => state.category);
    const auth = useSelector((state: RootState) => state.auth)
    const userId: any = auth?.user?.id

    //console.log(userId)
    useEffect(() => {
        try {
            dispatch(viewCategories()).then((res: any) => {
                if (res.payload) {
                    setCategories(res.payload);
                }
            });
            //console.log("all category", categories)
        } catch (error) {
            console.log(error)

        }
    }, [categories, dispatch])




    useEffect(() => {
        if (profile.status === 'succeeded') {
            setEditCategories(null);
            form.reset();
            setSuccess(profile.success)
            setError(profile.error)
        } else if (profile.status === 'failed') {
            setError(profile.error);
            setSuccess(null);
        }

    }, [form, profile.error, profile.status, profile.success, setEditCategories]);
    const onSubmit = (values: z.infer<typeof CategorySchema>) => {
        //console.log(" from category", values)
        setSuccess('')
        setError('')
        try {
            startTransition(() => {
                dispatch(createCategory({ userId, category: values.category }))
                setSuccess(category.success)
                setError(category.error)

            })
        } catch (error) {

        }

    }
    const handleDeleteClick = (id: any) => {

    }

    return (
        <MaxWidthWrapper>
            <Usertab isAdmin={true} />
            <div className='py-8'>

                <CardWrapper
                    headerLabel='Category'
                    backButtonHref='/'
                    backButtonLabel='Back home'
                >
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className='space-y-4'>
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <label>{editCategories ? "Update category" : "New Category"}
                                                    {editCategories && (
                                                        <b>:{editCategories.category}</b>
                                                    )}
                                                </label>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter category"
                                                        {...field}
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}></FormField>
                                </div>
                                <FormError message={error} />
                                <FormSuccess message={success} />
                                <div className='pb-2 flex gap-2'>
                                    <Button
                                        disabled={isPending}
                                        type="submit"
                                        className='py-4'
                                        variant="default">
                                        {editCategories ? 'Update' : 'Create'}
                                    </Button>
                                    <Button variant='destructive' type='submit' onClick={() => { }}>Cancel</Button>
                                </div>


                            </form>
                        </Form>
                        <div className='mt-4'>
                            <Header label='Existing category'></Header>
                            {categories?.data?.length ? categories?.data.map((c: CategoryState) => (
                                <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                                    <div className='grow'>
                                        {c.category}

                                    </div>
                                    <div className="flex gap-1">

                                        <Button type="button"
                                            onClick={() => {
                                                setEditCategories(c)
                                                setCategoryName(c.category);
                                            }}
                                        >
                                            Edit
                                        </Button>


                                        <DeleteButton label='Delete'
                                            onDelete={async () => handleDeleteClick(c.id)}
                                        >

                                        </DeleteButton>
                                    </div>

                                </div>
                            )) : <p className='px-4 '>No Categories Available</p>}

                        </div>

                    </div>
                </CardWrapper>
            </div>
        </MaxWidthWrapper>
    )
}

export default CategoryPage