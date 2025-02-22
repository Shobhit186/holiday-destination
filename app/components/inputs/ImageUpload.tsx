/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {CldUploadWidget} from 'next-cloudinary'
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    // eslint-disable-next-line no-var
    var cloudinary: any;
}

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({value,onChange}) => {
  const handleChange = useCallback((result:any) => {
    console.log(result.info.secure_url,"ID");
    onChange(result.info.secure_url);
  },[onChange]);

  return (
    <CldUploadWidget onSuccess={handleChange} uploadPreset="mz6wz5tj" options={{maxFiles: 1}}>
        {({open}) => {
            return (
                <div onClick={() => open()} className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'>
                   <TbPhotoPlus size={50} />
                   <div className='font-semibold text-lg'>Click to Upload</div>
                   {value && (
                    <div className='absolute inset-0 w-full h-full'>
                      <img style={{ width: "100%", height: "auto" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWg7X0YYzUCU5m8BA_sH_ti92q4X0lCz5h_w&s" alt="Upload"  />
                    </div>
                   )}
                </div>
            )
        }}
    </CldUploadWidget>
  )
}

export default ImageUpload