import { EditableImages } from "@/@types/enum";
import Image from "next/image";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { buttonVariants } from "../ui/button";

export default function EditableImage({ link }: EditableImages) {

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

            // const uploadPromise = fetch('/api/upload', {
            //     method: 'POST',
            //     body: data,
            // }).then(response => {
            //     if (response.ok) {
            //         return response.json().then(link => {
            //             setLink(link);
            //         })
            //     }
            //     throw new Error('Something went wrong');
            // });

            // await toast.promise(uploadPromise, {
            //     loading: 'Uploading...',
            //     success: 'Upload complete',
            //     error: 'Upload error',
            // });
        }
    }

    return (
        <>
            {link && (
                <div className='px-6'>
                    <Image className="rounded-lg w-full h-full mb-1" src={link} alt='' width={200} height={250}></Image>
                </div>

            )}
            {!link && (
                <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                    No image
                </div>
            )}
            <Label>
                <Input type='file' className='hidden' onChange={handleFileChange} />
                <span className={buttonVariants({
                    className:
                        'mt-3 w-full'
                })} >Edit</span>
            </Label>
        </>
    );

}

