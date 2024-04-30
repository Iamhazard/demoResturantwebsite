'use client'
import { Header } from '@/components/Auth/CardHeader'
import CardWrapper from '@/components/Auth/CardWrapper'
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper'
import Usertab from '@/components/layout/Usertab'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

const CategoryPage = () => {
    const [isPending, startTransition] = useTransition();
    const [categories, setCategories] = useState([])
    const [editategories, setEditCategories] = useState(null)
    const form = useForm()

    const onSubmit = () => {

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
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{editategories ? "Update category" : "New Category"}
                                                    {/* {editategories && (
                                                        <>:{editategories}</>
                                                    )} */}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
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