'client'
import React from 'react'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { z } from 'zod'
import { extraPriceSchema } from '@/Schema'
import { zodResolver } from '@hookform/resolvers/zod'
type Size = {
    name: string;
    price: number;
}
type SizeKey = keyof Size;
type Props = {
    sizes: Size[];
    name: string;
    addLabel: string;
    setSizes: React.Dispatch<React.SetStateAction<Size[]>>;

};


const MenuItemsPros: React.FC<Props> = ({ sizes, setSizes, name, addLabel }) => {
    //const [sizes, setSizes] = useState([{ name: '', price: 0 }])
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({

    })
    const form = useForm<z.infer<typeof extraPriceSchema>>({
        resolver: zodResolver(extraPriceSchema),
        defaultValues: {
            name: "",
            price: 0
        }

    });

    function addSizeProp() {
        setSizes((oldSizes: any) => {
            return [...oldSizes, { name: '', price: 0 }];
        })
    }

    const editSizeProp = (ev: React.ChangeEvent<HTMLInputElement>, index: number, p0: SizeKey) => {
        const newValue = p0 === 'price' ? parseFloat(ev.target.value) : ev.target.value;
        setSizes((prevSizes: any) => {
            const newSizes = [...prevSizes];
            newSizes[index] = {
                ...newSizes[index],
                [p0]: newValue,
            };
            return newSizes;
        });
    };

    const removeSizeProp = (indexToRemove: number) => {
        setSizes((prev: any[]) => prev.filter((v, index) => index !== indexToRemove))
    }


    return (

        <div className='bg-gray-200 p-4 rounded-md mb-4 shadow'>
            <Form {...form}>

                <label className='block mb-2 text-sm font-medium text-gray-700'>{name}</label>
                {sizes?.length > 0 && sizes.map((size, index) => (
                    <div className='sm:col-span-2 flex gap-1 items-end' key={index}>
                        <div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-[13px] text-gray-600'>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='Size name'
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    editSizeProp(e, index, 'name');
                                                }}
                                                value={size.name}
                                                className='flex-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-opacity-50 focus:ring-indigo-300'
                                                aria-disabled
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-[12px] text-gray-600'>Extra Size</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                placeholder='Extra Price'
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    editSizeProp(e, index, 'price');
                                                }}
                                                value={size.price}
                                                className='flex-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-opacity-50 focus:ring-indigo-300'
                                                aria-disabled
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='pb-1'>
                            <button onClick={() => removeSizeProp(index)} className='bg-white  border  border-violet-400'><Trash2 /></button>
                        </div>
                    </div>


                ))}
                <Button
                    type='button'
                    onClick={addSizeProp}
                    className='w-full p-2 mt-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
                >
                    {addLabel}
                </Button>

            </Form>
        </div>


    )
}

export default MenuItemsPros