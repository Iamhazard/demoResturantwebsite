import Login from '@/components/Auth/Login'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <div>
                <Login />
            </div>
        </Suspense>

    )
}

export default LoginPage