'use client'
import { Label } from '@/components/ui/label'
import { Input } from "@/components/ui/input"
import { motion } from 'framer-motion';
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MenuItemTiles } from './MenuItemTiles'
import { MenuItemsProps } from '@/@types/enum';

const MenuItem = (menuItem: MenuItemsProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const {
        image, name, description, basePrice,
        sizes, extraIngredientPrices,
    } = menuItem;
    const handleAddtoCart = () => {
        console.log("bttn is clicked")
    }
    return (
        <>
            {showPopup && (
                <div className='fixed inset-0 bg-black/80 flex items-center justify-center'>
                    <div className='my-8 bg-white p-2 rounded-lg max-w-md'>
                        <div className='overflow-y p-2' style={{ maxHeight: `calc(100vh - 100px)` }}>
                            <Image src={image} alt='name' width={300} height={200} className='mx-auto' />
                            <h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
                            <p className='text-center text-gray-500'>{description}</p>
                            <div className='py-2'>
                                <h3 className='text-center text-gray-700'>Pick your size</h3>

                                <Label className='flex items-center gap-2 p-4 border rounded-md mb-1'>
                                    <Input type='radio' name='size' id='small' value='small' className='w-4 h-4' />
                                </Label>

                            </div>
                            <div className='py-2'>
                                <h3 className='text-center text-gray-700'>Extras</h3>
                                <Label className='flex items-center gap-2 p-4 border rounded-md mb-1' >
                                    <Input type='checkbox' />
                                </Label>


                            </div>

                            <motion.div className="card"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}>
                                <div className="primary sticky bottom-2"
                                >
                                    Add to cart
                                </div>
                            </motion.div>

                            <Button className='mt-2' variant='secondary'>
                                Cancel
                            </Button>
                        </div>

                    </div>
                </div>)}

            <MenuItemTiles item={{
                image: image,
                description: description,
                name: name,
                basePrice: basePrice,
                sizes: [],
                extraIngredientPrices: []
            }} onAddToCart={handleAddtoCart}
                {...menuItem} />
        </>
    )
}

export default MenuItem