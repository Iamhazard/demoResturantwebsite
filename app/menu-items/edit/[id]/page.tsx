'use client'

import { MenuItemsProps, MenuitemsProps } from '@/@types/enum'
import { menuItemsByid } from '@/Redux/Features/MenuItemSlice'
import { AppDispatch } from '@/Redux/store'
import Menuitems from '@/components/layout/MenuitemsForm'
import Usertab from '@/components/layout/Usertab'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FcRight } from 'react-icons/fc'
import { useDispatch } from 'react-redux'

interface IParams {
    id: string;
}

const EditMenu = ({ params }: { params: IParams }) => {
    const searchParms = useSearchParams()
    const [menuItem, setMenuItem] = useState<MenuItemsProps | null>(null);

    const [errors, setError] = useState<string | undefined>("");
    const dispatch: AppDispatch = useDispatch();
    //const id = searchParms.get('id');
    console.log(params, "ids")

    useEffect(() => {
        if (params.id) {
            dispatch(menuItemsByid(params.id)).then((res: any) => {
                if (res.payload) {
                    setMenuItem(res.payload)
                }
            })
        }
    }, [dispatch, params.id]);

    console.log("menuitems from id", menuItem)

    return (

        <section className='mt-8'>
            <Usertab isAdmin={true} />

            <div className='flex items-center justify-center py-2 mx-auto mt-4  max-w-xl'>
                <Link href="/menu-items"
                >
                    <Button variant='clicks' size='btns'>
                        Show all menu Items <span className='px-3'><FcRight /></span>  </Button>
                </Link>

            </div>
            {menuItem !== null ? (
                <Menuitems categories={[]} menuitem={menuItem} />
            ) : (
                <div>Loading...</div>
            )}




        </section>
    )
}

export default EditMenu