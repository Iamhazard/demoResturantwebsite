'use client'
import { MenuitemsProps } from '@/@types/enum';
import { viewMenuItems } from '@/Redux/Features/MenuItemSlice';
import { AppDispatch, RootState } from '@/Redux/store';
import CardWrapper from '@/components/Auth/CardWrapper';
import MaxWidthWrapper from '@/components/NavBar/MaxWidthWrapper';
import Usertab from '@/components/layout/Usertab';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const MenuItemsPage = () => {
    const [isPending, startTransition] = useTransition();
    const [errors, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [image, setImage] = useState();
    const [categories, setCategories] = useState([]);
    const [editCategories, setEditCategories] = useState(null);
    const form = useForm();
    const [menuItems, setMenuItems] = useState<MenuitemsProps[]>([]);
    const [MenuItemName, setMenuItemName] = useState('');
    const dispatch: AppDispatch = useDispatch();

    const handleDeleteClick = (id: any) => {
        // Handle delete functionality
    };

    useEffect(() => {
        dispatch(viewMenuItems()).then((res: any) => {
            if (res.payload) {
                setMenuItems(res.payload);
            } else {
                setError("Failed to fetch menu items.");
            }
        }).catch((error) => {
            setError("An error occurred while fetching menu items.");
        });
    }, [dispatch]);

    return (
        <MaxWidthWrapper>
            <Usertab isAdmin={true} />
            <CardWrapper
                headerLabel='Menu'
                backButtonHref='/profile/category'
                backButtonLabel='back'
            >
                <div className='flex items-center justify-center py-6 '>
                    <Button variant='clicks' size='btns'>
                        <Link href="/menu-items/new">Create new Menu item &rarr;</Link>
                    </Button>
                </div>
                <div>
                    <h2 className='text-sm text-gray-500 mt-8'>Edit menu Item:</h2>

                    {isPending && <p>Loading...</p>}
                    {errors && <p className='text-red-500'>{errors}</p>}
                    {menuItems.length ? (
                        menuItems.map((c: any) => (
                            <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                                <Link className='grow' href={'/menu-items/edit/' + c.id}>
                                    <Image
                                        className="rounded-md object-fill"
                                        src={c.image || '/default-image.jpg'}
                                        alt={c.itemName || 'Menu Item Image'}
                                        width={60}
                                        height={60}
                                    />
                                </Link>
                                <div className="flex gap-1">
                                    {c.itemName}
                                </div>
                            </div>
                        ))
                    ) : (
                        !isPending && <p className='px-4'>No Menu Items Available</p>
                    )}
                </div>
            </CardWrapper>
        </MaxWidthWrapper>
    );
}

export default MenuItemsPage;
