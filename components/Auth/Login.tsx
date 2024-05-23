'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { Input } from '../ui/input'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from 'zod'
import { RegisterSchema } from '@/Schema'
import { Role } from '@prisma/client'

const Login = () => {
    const params = useSearchParams();
    const callbackUrl = params?.get("callbackUrl");
    const urlError =
        params?.get("error") === "OAuthAccountNotLinked"
            ? "Email already used by different providers!"
            : "";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            lastName: "",
        },
    });


    const onSubmit = () => {

    }
    return (
        <CardWrapper headerLabel={'Welcome Back'} backButtonLabel="Don't have an a account?" backButtonHref='/auth/register' showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <>
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
                            <FormField
                                control={form.control}
                                name="password"
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
                                        <Button
                                            size="sm"
                                            variant="link"
                                            asChild
                                            className="px-0 font-normal">
                                            <Link href="/auth/reset">Forgot Password</Link>
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}></FormField>
                        </>

                    </div>

                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        variant="outline"
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default Login