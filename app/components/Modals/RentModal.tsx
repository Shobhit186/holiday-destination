'use client';
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useState, useMemo } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import {  FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountryInput from "../inputs/CountryInput";
import dynamic from "next/dynamic";
import Counters from "../inputs/Counters";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
enum Steps {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}
const RentModal = () => {
  const rentModal = useRentModal();
  const [isLoading,setIsLoading] = useState(false);
  const [steps,setSteps] = useState(Steps.CATEGORY);
  const {register,handleSubmit,setValue,watch,formState:{errors},reset} = useForm<FieldValues>({
    defaultValues:{
        category:"",
        location:null,
        guestcount: 1,
        roomcount: 1,
        bathroomcount: 1,
        imageSrc: "",
        price: 1,
        title: "",
        description: "",
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestcount = watch('guestcount');
  const roomcount = watch('roomcount');
  const bathroomcount = watch('bathroomcount');
  const imageSrc = watch('imageSrc');

  console.log(imageSrc,"SRc");
const Map = useMemo(() => dynamic(() => import('../Map'),{ssr: false}),[location]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setCustomValues = (id:string, value:any) => {
    setValue(id,value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
    })
  }

  const onBack = () => {
    setSteps((value) => value - 1);
  }

  const onNext = () => {
    setSteps((value) => value + 1);
  }

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    if(steps !== Steps.PRICE){
      return onNext();
    }

    setIsLoading(true);
    axios.post('/api/listings',data)
    .then((response) => {
      if(response.status === 200){
        toast.success('Listing created successfully');
        rentModal.onClose();
        reset();
        setSteps(Steps.CATEGORY);
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((error) => {
      toast.error('Something went wrong');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (steps === Steps.PRICE) {
        return "Create";
        }
        return "Next";
  },[steps]);

  const secondaryActionLabel = useMemo(() => {
    if(steps === Steps.CATEGORY){
       return undefined;
    }
    return "Back";
  },[steps])

  let bodyContent = (
    <div className="flex flex-col gap-8">
       <Heading title="Which of these best describes your rental?" subtitle="Pick a category" />
       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mah-h-[50vh] overflow-y-auto">
         {categories.map((item,index) => (
           <div key={index} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValues('category',category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
                description={item.description}
              />
           </div>
         ))}
       </div>
    </div>
  )
  if(steps === Steps.LOCATION){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where is your rental located?" subtitle="Help Guests to find your place" />
            <CountryInput value={location} onChange={(value) => setCustomValues('location',value)}/>
            <Map center={location?.latlng}/>
        </div>
    )
  }

  if(steps === Steps.INFO){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Share some details about your place" subtitle="What amenities do you have?" />
            <Counters title="Number of rooms" subtitle="Please enter the number of rooms" value={roomcount} onChange={(value) => setCustomValues('roomcount',value)} />
            <hr />
            <Counters title="Number of bathrooms" subtitle="Please enter the number of bathrooms" value={bathroomcount} onChange={(value) => setCustomValues('bathroomcount',value)} />
            <hr />
            <Counters title="Number of guests" subtitle="Please enter the number of guests" value={guestcount} onChange={(value) => setCustomValues('guestcount',value)} />
        </div>
    )
  }

  if(steps === Steps.IMAGES){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Add a photo of your place" subtitle="Show guests what your place look like?" />
            <ImageUpload value={imageSrc} onChange={(value) => setCustomValues('imageSrc',value)}  />
        </div>
    )
  }

  if(steps === Steps.DESCRIPTION){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="How would you describe your place" subtitle="Short and Crispy Description" />
            <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
            <hr />
            <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
        </div>
    )
  }

  if(steps === Steps.PRICE){
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Now, set your price!" subtitle="How much do you charge per night?" />
            <Input id="price" label="Price" type="number" formatPrice disabled={isLoading} register={register} errors={errors} required />
        </div>
    )
  }
  return (
    <Modal 
      isOpen={rentModal.isOpen}
      title="Holiday Destination"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={steps === Steps.CATEGORY ? undefined : onBack}
    />
  )
}

export default RentModal