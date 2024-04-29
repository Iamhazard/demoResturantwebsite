'use client'
import CardWrapper from '@/components/Auth/CardWrapper'
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { ChangeEvent, ReactEventHandler, useState, useTransition } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { FormError } from '@/components/Auth/form-error'
import { FormSuccess } from '@/components/Auth/form-success'
import { Label } from '@/components/ui/label'
import { FileList } from '@/@types/enum'

type filesPros = FileList | null;

const ProfilePage = () => {

    const [error, setError] = useState<string | undefined>("");
    const [Name, SetName] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm();

    const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const files: filesPros = e.target.files;
        if (!files || !files.length) {
            alert("Please select a file!");
        }


    }

    const onSubmit = () => {

    }


    return (
        <MaxWidthWrapper className={cn('flex justify-center items-center')}>
            <CardWrapper
                headerLabel='Profile'
                backButtonHref='/'
                backButtonLabel='Back home'
            >
                <div className=' max-auto'>
                    <div className='flex gap-2'>
                        <div>
                            <div className='bg-gray-600 p-2 rounded-lg'>
                                <div className='px-6'>
                                    <Image className="rounded-lg" src="/Assets/pizza.jpg" alt='' width={200} height={250}></Image>
                                </div>
                                <Label>
                                    <Input type='file' className='hidden' onChange={handlefileChange} />
                                    <span className={buttonVariants({
                                        className:
                                            'mt-3 w-full'
                                    })} >Edit</span>
                                </Label>



                            </div>
                        </div>
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="space-y-4">
                                        {showTwoFactor && (
                                            <FormField
                                                control={form.control}
                                                name="code"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Two Factor code</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} disabled={isPending} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}></FormField>
                                        )}
                                        {!showTwoFactor && (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>

                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    aria-disabled
                                                                    placeholder="Enter your Name"
                                                                    {...field}
                                                                    disabled={isPending}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}></FormField>
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>

                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    aria-disabled

                                                                    placeholder={"email"}
                                                                    {...field}
                                                                    disabled={!isPending}
                                                                />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}></FormField>
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>

                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    aria-disabled
                                                                    placeholder="Street Address"
                                                                    {...field}
                                                                    disabled={isPending}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}></FormField>
                                                <div className="flex flex-wrap -mx-3 mb-2">
                                                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <FormField
                                                            control={form.control}
                                                            name="name"
                                                            render={({ field }) => (
                                                                <FormItem>

                                                                    <FormControl>
                                                                        <Input
                                                                            type="name"
                                                                            placeholder="Postal code"
                                                                            {...field}
                                                                            disabled={isPending}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}></FormField>
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3">
                                                        <FormField
                                                            control={form.control}
                                                            name="lastName"
                                                            render={({ field }) => (
                                                                <FormItem>

                                                                    <FormControl>
                                                                        <Input
                                                                            type="name"
                                                                            placeholder="City"
                                                                            {...field}
                                                                            disabled={isPending}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}></FormField>

                                                    </div>
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>

                                                            <FormControl>
                                                                <Input
                                                                    type="text"
                                                                    aria-disabled
                                                                    placeholder="country"
                                                                    {...field}
                                                                    disabled={isPending}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}></FormField>

                                            </>
                                        )}
                                    </div>

                                    <FormError message={error} />
                                    <FormSuccess message={success} />
                                    <Button
                                        variant="destructive"
                                        disabled={isPending}
                                        type="submit"
                                        className="w-full">
                                        Save
                                    </Button>
                                </form>
                            </Form>
                        </div>

                    </div>

                </div>
            </CardWrapper>

        </MaxWidthWrapper>
    )
}

export default ProfilePage