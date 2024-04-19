import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Homepage = () => {
    return (
        <MaxWidthWrapper>
            <div className='md:grid grid-cols-12 px-4 py-2'>
                <div className='max-w-md md:max-w-full mx-auto md:mx-0 col-start-1 col-end-7 row-start-1 row-end-4 z-10 relative'>
                    <h1 className='text-3xl py-12 sm:text-2xl font-bold text-nowrap '>
                        EveryThing
                        <br />
                        is better
                        <br />
                        with a <span className='text-red-700 '>Pizza</span>
                    </h1>
                    <p className=' text-sm sm:text-md md:text-lg lg:text-xl max-w-[480px] w-full'>
                        Pizza is a missing piece that makes every day a little bit better.
                        <b /> a simple yet delicious pizza is the perfect way to start your day.

                    </p>
                    <div className='flex py-4 gap-12'>
                        <Button variant='destructive' size='btnlg'>Order Now &rarr;</Button>
                        <Button variant='outline' size='btnlg'>Learn more &rarr; </Button>
                    </div>

                </div>
                <div className='lg:block md:block hidden grid-rows-7 col-start-8 col-end-12 row-start-1 row-end-7'>
                    <Image src='/Assets/pizza.png' alt='image' height={600} width={600} ></Image>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Homepage