import Link from 'next/link'
import React from 'react'
import { NAV_LINKS } from './NavLinks'
import { Button, buttonVariants } from '../ui/button'
import MaxWidthWrapper from './MaxWidthWrapper'
import Cart from './Cart'
import { cn } from '@/lib/utils'
import NavMobile from './MobileNavbar'

const Navbar = () => {
    const user = 0;
    return (
        <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
            <header className='relative bg-white'>
                <MaxWidthWrapper>
                    <div className='border-b border-gray-50'>
                        <div className='flex h-16 items-center'>
                            {/* mobile */}
                            <div className=' px-4 flex lg:ml-0'>
                                <Link href='/'>
                                    <h1>LOGO</h1>
                                </Link>
                            </div>
                            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start px-12'>
                                <div className='hidden z-50 lg:ml-8  lg:block lg:self-stretch'>
                                    <div className="flex space-x-4">
                                        {NAV_LINKS.map((item) => (
                                            <Link
                                                key={item.key}
                                                href={item.href}
                                                className={cn(
                                                    item.current
                                                        ? "text-gray-800"
                                                        : "text-gray-600 hover:bg-gray-300 hover:text-black",
                                                    "rounded-md px-3 py-2 text-sm font-medium"
                                                )}
                                                aria-current={item.current ? "page" : undefined}>
                                                {item.label}

                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='ml-auto flex items-center'>
                                <div className='hidden lg:flex lg:items-center lg:justify-end lg:space-x-6'>
                                    {user ? (
                                        <Button variant='link'>user</Button>
                                    ) : (
                                        <Link href='/login' className={buttonVariants({
                                            variant: "ghost",
                                        })}>Login</Link>
                                    )}
                                    {user ? (
                                        <Button variant='destructive' size='btn'>Logout</Button>
                                    ) : (
                                        <Link href='/register' className={buttonVariants({
                                            variant: "ghost",
                                        })}>Register</Link>
                                    )}
                                    <div className='ml-4 flow-root lg:ml-6'>
                                        <Cart />
                                    </div>

                                </div>
                                <div className=' py-3'>
                                    < NavMobile />
                                </div>


                            </div>

                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>

        </div>
    )
}

export default Navbar