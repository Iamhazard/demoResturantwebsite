'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { useForm } from "react-hook-form";
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RegisterSchema } from '@/Schema'
import { z } from 'zod'
import { AppDispatch, RootState } from '@/Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '@/Redux/Features/AuthSlice'
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {

    const [error, setError] = useState<string | null>("");
    const [success, setSuccess] = useState<string | null>("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();
    const dispatch: AppDispatch = useDispatch()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            hashedPassword: "",
            name: "",
            lastName: "",
            role: "USER"
        },
    });
    const auth = useSelector((state: RootState) => state.auth)

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        console.log("values befor dispach", values)

        try {
            dispatch(register(values)).then((data) => {
                setError(auth.error)
                setSuccess(auth.success)
            })

        } catch (error) {
            console.log(error)
        }



    }
    return (
        <CardWrapper
            headerLabel='Register'
            backButtonHref='/auth/login'
            backButtonLabel='Already have a account'
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email address"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}></FormField>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="name"
                                                    placeholder="Enter First Name"
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
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="name"
                                                    placeholder="Enter Last Name"
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
                            name="hashedPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your Password"
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
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                        variant="default">
                        Create an Account

                    </Button>

                </form>
                <div className="my-0 border-b border-gray-400  text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-700 tracking-wide font-medium bg-white transform translate-y-1/2">
                        Or
                    </div>
                </div>
            </Form>

        </CardWrapper>
    )
}

export default Register