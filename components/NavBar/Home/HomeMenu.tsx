'use client'
import Image from "next/image";
import React, { useState } from "react";
import SectionHeaders from "./Header";
import MenuItem from "./Menu/MenuItem";
import MaxWidthWrapper from "../MaxWidthWrapper";

const menuImages = [
    {
        id: 1, name: 'Pizza', description: "best pizza", image: '/Assets/pizza.jpg'
    },
    {
        id: 1, name: 'Pizza2', description: "best pizza 2", image: '/Assets/pizza.jpg'
    },
    {
        id: 1, name: 'Pizza3', description: "best pizza 3", image: '/Assets/pizza.jpg'
    },
    {
        id: 1, name: 'Pizza4', description: "best pizza 4", image: '/Assets/pizza.jpg'
    }

];

const HomeMenu = () => {
    const [bestSellers, setBestSellers] = useState([]);
    return (
        <MaxWidthWrapper>
            <div className="py-3 absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-\[70px\] text-left -z-10">
                    <Image
                        src={"/Assets/sallad1.png"}
                        alt="image"
                        width={110}
                        height={190}></Image>
                </div>
                <div className=" absolute -top-\[100px\] right-0 -z-10">

                    <Image
                        src={"/Assets/sallad2.png"}
                        width={107}
                        height={195}
                        alt={"sallad"}
                    />
                </div>

            </div>
            <div className="text-center mb-4 sm:mb-6 -py-6">
                <SectionHeaders
                    subHeader="Check out"
                    mainHeader="Out Best Sellers"
                />

            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {menuImages?.length > 0 &&
                    menuImages.map((item) => (
                        <div key={item.id} className="flex flex-col items-center">
                            <MenuItem
                                basePrice={""}
                                sizes={[]}
                                extraIngredientPrices={[]}
                                {...item}
                            />
                        </div>
                    ))}
            </div>

        </MaxWidthWrapper>
    );
};

export default HomeMenu;
