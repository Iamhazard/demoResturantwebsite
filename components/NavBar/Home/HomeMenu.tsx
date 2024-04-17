import Image from 'next/image'
import React from 'react'

const HomeMenu = () => {
    return (
        <section>
            <div className='absolute left-0 right-0 w-full justify-start'>
                <div className='absolute left-0 -top-[70px] text-left -z-10'>
                    <Image src={'/Assets/sallad1.png'} alt='image' width={110} height={190} ></Image>
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                    <Image src={'/Assets/sallad2.png'} width={107} height={195} alt={'sallad'} />
                </div>
            </div>
        </section>
    )
}

export default HomeMenu