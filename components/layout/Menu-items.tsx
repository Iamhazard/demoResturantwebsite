'use client'
import React, { useState, useTransition } from 'react'
import MaxWidthWrapper from '../NavBar/MaxWidthWrapper'
import Usertab from './Usertab'
import CardWrapper from '../Auth/CardWrapper'
import EditableImage from './Editableimgae'
import { useForm, SubmitHandler } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { FormError } from '@/components/Auth/form-error'
import { FormSuccess } from '@/components/Auth/form-success'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { Card } from '../ui/card'
import Image from 'next/image'
import { FileList } from '@/@types/enum'

type filesPros = FileList | null;

const Menuitems = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [error, setError] = useState<string | undefined>("");
    const [Name, SetName] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm();

    const onSubmit = () => {

    }

    const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const files: filesPros = e.target.files;
        if (!files || !files.length) {
            alert("Please select a file!");
        }


    }
    return (
        <MaxWidthWrapper className='pb-6'>
            <Card className='w-[420px] max-w[600] shadow-md my-2 sm:mx-auto'>
                <div className='p-2 '>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-2xl mx-auto">
                            <div
                                className='md:grid items-start gap-4 '
                                style={{ gridTemplateColumns: '.3fr .7fr' }}
                            >
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

                                    <div className="space-y-4 mt-4">
                                        <FormField
                                            control={form.control}
                                            name="item-name"
                                            render={({ field }) => (
                                                <FormItem>

                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            aria-disabled

                                                            placeholder={"Enter Item name"}
                                                            {...field}

                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}></FormField>


                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>

                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            aria-disabled
                                                            placeholder="Base Price"
                                                            {...field}
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}></FormField>
                                        <FormField
                                            control={form.control}
                                            name="Description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Give description"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>



                                    <FormError message={error} />
                                    <FormSuccess message={success} />
                                    <Button
                                        variant="destructive"
                                        disabled={isPending}
                                        type="submit"
                                        className="w-full mt-4">
                                        Save
                                    </Button>

                                </div>

                            </div>
                        </form>
                    </Form>
                </div>

            </Card>

        </MaxWidthWrapper>
    )
}

export default Menuitems