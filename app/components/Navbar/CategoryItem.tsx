'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons';
import qs from "query-string"
interface CategoryItemProps {
    label: string;
    description: string
    icon: IconType
    selected?: boolean
}
const CategoryItem:React.FC<CategoryItemProps> = ({label,icon:Icon,selected}) => {
  const router = useRouter();
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {};
      if (params) {
          currentQuery = qs.parse(params.toString());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedQuery: any = {
          ...currentQuery,
          category: label
      }

      if(params?.get('category') === label){
        delete updatedQuery.category
      }

      const uri = qs.stringifyUrl({
        url: "/",
        query: updatedQuery
      },{skipNull: true});

      router.push(uri);

    }, [params, router, label])

  return (
    <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800': 'border-transparent'} ${selected ? 'text-neutral-800':'text-neutral-500'} `}>
       <Icon size={24} />
       <div className='font-medium text-sm'>
          {label}
       </div>

    </div>
  )
}

export default CategoryItem