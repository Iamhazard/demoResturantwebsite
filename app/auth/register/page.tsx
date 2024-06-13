import Register from '@/components/Auth/Register'
import React from 'react'
import { Suspense } from 'react'
const RegisterPage = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <div>
                <Register />
            </div>
        </Suspense>

    )
}

export default RegisterPage