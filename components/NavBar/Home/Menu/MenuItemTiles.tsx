/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import AddToCartButton from './AddToCartButton'
import { MenuTilesProps } from '@/@types/enum';

export const MenuItemTiles: React.FC<MenuTilesProps> = ({ onAddToCart, item }) => {
    const { image, description, name, basePrice = '',
        sizes = '', extraIngredientPrices,
    } = item;
    console.log({ item })
    const hasSizesOrExtras = sizes?.length > 0 || (extraIngredientPrices && Object.keys(extraIngredientPrices).length > 0);

    return (
        <div className='bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all sm:p-2'>
            <div className='text-center'>
                <img src={image} className="max-h-auto max-h-24 block mx-auto sm:max-h-16" alt="pizza" />
            </div>
            <h4 className="font-semibold text-xl my-3 sm:text-lg sm:my-2">{name}</h4>
            <p className="text-gray-500 text-sm line-clamp-3 sm:line-clamp-2 sm:text-xs">
                {description}
            </p>
            <div className='sm:mt-2 mt-4'>
                <AddToCartButton
                    onClick={onAddToCart}
                    image={image}
                    hasSizesOrExtras={hasSizesOrExtras}
                    basePrice={basePrice} />
            </div>

        </div>
    )
}
