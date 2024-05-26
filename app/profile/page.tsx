'use client'
import CardWrapper from '@/components/Auth/CardWrapper'
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { FormError } from '@/components/Auth/form-error'
import { FormSuccess } from '@/components/Auth/form-success'
import { Label } from '@/components/ui/label'
import { FileList } from '@/@types/enum'
import Usertab from '@/components/layout/Usertab'
import { object, z } from 'zod'
import { ProfielSchema } from '@/Schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Redux/store'
import { selectCurrentUser } from '@/Redux/Features/AuthSlice'

type filesPros = FileList | null;

const ProfilePage = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [error, setError] = useState<string | null>("");
    const [email, Setemail] = useState<string | null>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ProfielSchema>>({
        resolver: zodResolver(ProfielSchema),
        defaultValues: {
            name: "",
            email: "",
            StreetAddress: "",
            postalCode: "",
            city: "",
            country: "",
        }
    })



    const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const files: filesPros = e.target.files;

        if (files && files.length > 0) {
            setSelectedFile(files[0])

        } else {
            alert("Please select a file!");

        }

    }
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    useEffect(() => {
        if (auth.status == 'succeeded') {

            auth.user
            setIsAdmin(auth.isAdmin);



        }
    }, [auth.status, auth.user, auth.isAdmin])

    const onSubmit = (values: z.infer<typeof ProfielSchema>) => {
        setError("");
        setSuccess("")
        console.log("values befor formdata", values)
        const formData = new FormData();
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('StreetAddress', values.StreetAddress)
        formData.append('postalCode', values.postalCode)
        formData.append('city', values.city)
        formData.append('country', values.country)
        if (selectedFile) {
            formData.append("profieImage", selectedFile)
        }
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }


        console.log("values befor dispach", formData)

        startTransition(() => {


        })


    }
    console.log("is admin", isAdmin)

    return (
        <section className='py-8'>
            <Usertab isAdmin={isAdmin} />
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

                                                                    placeholder={user?.email}
                                                                    {...field}
                                                                    disabled={!isPending}
                                                                />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}></FormField>
                                                <FormField
                                                    control={form.control}
                                                    name="StreetAddress"
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
                                                            name="postalCode"
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
                                                            name="city"
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
                                                    name="country"
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
        </section>

    )
}

export default ProfilePage