import { CartButtonProps } from '@/@types/enum';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function AddToCartButton({
    hasSizesOrExtras, onClick, basePrice,
}: CartButtonProps) {
    if (!hasSizesOrExtras) {
        return (
            <div className=" text-white mt-4">
                <motion.div className=""
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button size='btn' variant='default' onClick={onClick}>
                        Add to cart ${basePrice}
                    </Button>

                </motion.div>

            </div>
        );
    }
    return (
        <Button
            type="button"
            onClick={onClick}
            className="mt-4 bg-primary text-white rounded-full px-8 py-2  w-full sm:w-auto"
        >
            <span>Add to cart (from ${basePrice})</span>
        </Button>
    );
}