import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    isAdmin: boolean
}
const Usertab = ({ isAdmin }: Props) => {

    const path = usePathname()
    return (
        <div className="flex mx-auto gap-2 tabs justify-center flex-wrap ">
            <Link
                className={path === '/profile' ? 'active' : ''}
                href={'/profile'}
            >
                Profile
            </Link>
            {isAdmin && (
                <>
                    <Link
                        href={'/categories'}
                        className={cn(path === '/categories' ? 'active' : '')}
                    >
                        Categories
                    </Link>
                    <Link
                        href={'/menu-items'}
                        className={path.includes('menu-items') ? 'active' : ''}
                    >
                        Menu Items
                    </Link>
                    <Link
                        className={path.includes('/users') ? 'active' : ''}
                        href={'/users'}
                    >
                        Users
                    </Link>
                </>
            )}
            <Link
                className={path === '/orders' ? 'active' : ''}
                href={'/orders'}
            >
                Orders
            </Link>
        </div>
    )
}

export default Usertab