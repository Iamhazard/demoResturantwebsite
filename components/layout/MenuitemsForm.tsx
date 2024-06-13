'use client'
import React, { useEffect, useState, useTransition } from 'react'
import MaxWidthWrapper from '../NavBar/MaxWidthWrapper'
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { FormError } from '@/components/Auth/form-error'
import { FormSuccess } from '@/components/Auth/form-success'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { Card } from '../ui/card'
import Image from 'next/image'
import { FileList, MenuItemsProps } from '@/@types/enum'
import MenuItemsPros from './MenuItemsPros'
import { z } from 'zod'
import { MenuItemSchema } from '@/Schema'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/Redux/store'
import { viewCategories } from '@/Redux/Features/CategorySlice'
import { createMenu } from '@/Redux/Features/MenuItemSlice'


export type Size = {
    name: string;
    price: number;
}
type SizeKey = keyof Size;

type Category = {
    [x: string]: any
    id: string;
    category: string;
}

type Props = {
    categories: Category[];
    menuitem: MenuItemsProps
}

const Menuitems: React.FC<Props> = ({ menuitem }) => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [error, setError] = useState<string | undefined>("");
    const [Name, SetName] = useState<string | undefined>("");
    const [productImage, setProductImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(menuitem?.image || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [success, setSuccess] = useState<string | undefined>("");
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState({ type: '', text: '' });
    const [sizes, setSizes] = useState<Size[]>(menuitem?.sizes || [])
    const [
        extraIngredientPrices,
        setExtraIngredientPrices,
    ] = useState<Size[]>(menuitem?.extraIngredientPrices || [])

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({

    })
    //console.log(sizes, "sizes form pros")
    const [categories, setCategories] = useState<Category | null>(null)
    //console.log(extraIngredientPrices, "extraIngredientPrices form pros")
    const dispatch: AppDispatch = useDispatch()
    const [data, setData] = useState([]);
    const profile = useSelector((state: RootState) => state.menu);
    console.log(profile)
    const form = useForm<z.infer<typeof MenuItemSchema>>(
        {
            resolver: zodResolver(MenuItemSchema),
            defaultValues: {
                itemName: menuitem?.itemName,
                Description: menuitem?.Description,
                categoryId: menuitem?.categoryId,
                basePrice: menuitem?.basePrice

            }
        }
    );


    useEffect(() => {
        dispatch(viewCategories()).then((res: any) => {
            if (res.payload && res.payload.data && Array.isArray(res.payload.data)) {
                const mappedData = res.payload.data.map((item: any) => ({
                    id: item.id,
                    category: item.category,
                }));
                setData(mappedData);
                setCategories(res.payload);
            } else {

                console.error('Invalid data received from viewCategories action');
            }
        });
    }, [dispatch]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];
            setProductImage(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
            setSelectedFile(selectedFile);
        } else {
            alert("Please select a file!");
        }

        const fileUploadElement = document.getElementById("file-upload")!;
        if (selectedFile) {
            fileUploadElement.textContent = selectedFile.name;
        } else {
            fileUploadElement.textContent = "";
        }
    };
    const onSubmit = (values: any) => {
        setSuccess("")
        try {
            //console.log(values)
            const formData = new FormData();
            if (selectedFile) {
                formData.append("image", selectedFile)
            }
            formData.append("itemName", values.itemName)
            formData.append("Description", values.Description)
            formData.append("categoryId", values.categoryId)
            formData.append("basePrice", values.basePrice)
            formData.append('extraIngredientPrices', JSON.stringify(extraIngredientPrices));
            formData.append('sizes', JSON.stringify(sizes));
            const formDataObject: any = {};
            for (const pair of formData.entries()) {
                formDataObject[pair[0]] = pair[1];
            }

            console.log(formDataObject, "data form form data")
            startTransition(() => {
                dispatch(createMenu(formDataObject)).then((res) => {
                    if (res.payload === 200) {
                        setMessage({ type: 'success', text: res.payload.msg });
                        setSuccess(res.payload.msg)
                        reset()
                        setSelectedFile(null)
                        setExtraIngredientPrices([])
                        setSizes([])
                    } else {

                        console.log(error)
                    }
                })
            })

        } catch (error) {
            console.error("Submission error:", error);
        }

    }
    return (
        <MaxWidthWrapper className='pb-6'>
            <Card className='w-[460px] max-w[600] shadow-md my-2 sm:mx-auto'>
                <div className='p-2 '>

                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2  mx-auto">
                            <div
                                className='md:grid items-start gap-4 '
                                style={{ gridTemplateColumns: '.3fr .7fr' }}
                            >
                                <div>
                                    <div className='bg-gray-600 p-2 rounded-lg'>
                                        <div className='px-3'>
                                            <Image className="rounded-lg" src={imagePreview || "/Assets/pizza.jpg"} alt='' width={200} height={250}></Image>
                                        </div>
                                        <Label>
                                            <Input type='file' className='hidden' id="file-upload" onChange={handleFileChange} />
                                            <span className={buttonVariants({
                                                className:
                                                    'mt-3 w-full'
                                            })} >Edit</span>
                                        </Label>
                                    </div>
                                </div>
                                <div>
                                    <div className="space-y-4 mt-2">
                                        <FormField
                                            control={form.control}
                                            name="itemName"
                                            render={({ field }) => (
                                                <FormItem>

                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            aria-disabled

                                                            placeholder={"Enter Item name"}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}></FormField>


                                        <FormField
                                            control={form.control}
                                            name="basePrice"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            aria-disabled
                                                            placeholder="Base Price"
                                                            {...field}
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}></FormField>
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="categoryId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a Category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>

                                                                {data && data.map((item: any) => (
                                                                    <SelectItem key={item.id} value={item.id}>{item.category}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="Description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Give description"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />




                                    </div>
                                    <div className='py-1'> <MenuItemsPros name={"Sizes"} addLabel={'Add Items'} sizes={sizes} setSizes={setSizes} /></div>

                                    <div>
                                        <MenuItemsPros name='Extra Ingredients' addLabel='Add ingredients' sizes={extraIngredientPrices} setSizes={setExtraIngredientPrices}
                                        />
                                    </div>


                                    <FormError message={error} />
                                    <FormSuccess message={success} />
                                    <Button
                                        variant="destructive"
                                        disabled={isPending}
                                        type="submit"
                                        className="w-full mt-4">
                                        Save
                                    </Button>

                                </div>

                            </div>
                        </form>
                    </FormProvider>
                </div>

            </Card>

        </MaxWidthWrapper>
    )
}

export default Menuitems