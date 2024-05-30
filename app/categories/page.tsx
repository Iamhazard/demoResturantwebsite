'use client'
import { createCategory, viewCategories } from '@/Redux/Features/CategorySlice'
import { AppDispatch, RootState } from '@/Redux/store'
import { CategorySchema } from '@/Schema'
import { Header } from '@/components/Auth/CardHeader'
import CardWrapper from '@/components/Auth/CardWrapper'
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper'
import Usertab from '@/components/layout/Usertab'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { profile } from 'console'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'

interface CategoryPageProps {
    userId: string;
}

const CategoryPage: React.FC<CategoryPageProps> = () => {
    const [error, setError] = useState<string | null>("");
    const [success, setSuccess] = useState<string | null>("");
    const [isPending, startTransition] = useTransition();
    const [categories, setCategories] = useState<any[]>([])
    const [editategories, setEditCategories] = useState(null)

    const form = useForm<z.infer<typeof CategorySchema>>({
        defaultValues: {
            category: "",

        }
    })
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((state: RootState) => state.category);
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
            console.log("all category", categories)
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

    }, [form, profile.error, profile.status, profile.success]);
    const onSubmit = (values: z.infer<typeof CategorySchema>) => {
        console.log(" from category", values)

        try {
            startTransition(() => {
                dispatch(createCategory({ userId, category: values.category }))
                setSuccess(profile.success)
                setError(profile.error)

            })
        } catch (error) {

        }

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
                                                <FormLabel>{editategories ? "Update category" : "New Category"}
                                                    {editategories && (
                                                        <>:{editategories}</>
                                                    )}
                                                </FormLabel>
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
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    className='py-4'
                                    variant="default">
                                    {editategories ? 'Update' : 'Create'}
                                </Button>
                            </form>
                        </Form>
                        <div className='mt-4'>
                            <Header label='Edit category'></Header>
                            <Button
                                onClick={() => setEditCategories}
                                disabled={isPending}
                                type="submit"
                                className="w-full mt-4"

                                variant="outline">
                                <span>category</span>
                            </Button>
                        </div>

                    </div>
                </CardWrapper>
            </div>
        </MaxWidthWrapper>
    )
}

export default CategoryPage