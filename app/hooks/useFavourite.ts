import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IFavourite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavourite = ({listingId, currentUser}:IFavourite) => {
   const router = useRouter();
   const loginModal = useLoginModal();

   const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(listingId);
   },[currentUser,listingId]);

   const toggleFavourite = useCallback(async(e:React.MouseEvent<HTMLDivElement>) => {
     e.stopPropagation();
     if(!currentUser){
        return loginModal.onOpen();
     }

     try {
        let request;
        if(hasFavourited){
            request = () => axios.delete(`/api/favourites/${listingId}`);
        }
        else{
            request = () => axios.post(`/api/favourites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success('Success');
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     } catch (error) {
        toast.error('Something went wrong');
     }
   },[currentUser,hasFavourited,listingId,loginModal,router]);

   return {hasFavourited,toggleFavourite};
}

export default useFavourite;