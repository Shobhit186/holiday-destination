'use client';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import Heading from '../Heading';
import Input from "../inputs/input"
import toast from 'react-hot-toast';
import Button from '../Button';

const LoginModal = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            password: ''
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {...data, redirect: false})
        .then((callback) => {
            if(callback?.error) {
                toast.error(callback.error);
            }
            if(callback?.ok && !callback?.error) {
                toast.success('Logged in successfully');
                router.refresh();
                loginModal.onClose();
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
           <Heading title='Welcome Back to Airbnb' subtitle='Sign In to your account!' />
           <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required type="email"  />
           <Input id="password" label='Password' disabled={isLoading} register={register} errors={errors} required type="password" />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-2 w-full'>
            <Button disabled={isLoading} label='Continue with Google' onClick={()=> signIn('google')} icon={FcGoogle} outline />
            <Button disabled={isLoading} label='Continue with Github' onClick={()=> signIn('github')} icon={AiFillGithub} outline />
        
        <div>
            <div className="text-neutral-500 text-center mt-1 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>Don&apos;t have an account?</div>
                    <div onClick={() => {
                        registerModal.onOpen();
                        loginModal.onClose();
                    }} className="text-rose-500 cursor-pointer hover:underline">Register</div>
                </div>
            </div>
        </div>    
        </div>    
    )
  return (
    <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Sign In" onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
  )
}

export default LoginModal