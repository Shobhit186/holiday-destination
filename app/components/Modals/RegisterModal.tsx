'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
                loginModal.onOpen();
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required type="email" />
            <Input id="password" label='Password' disabled={isLoading} register={register} errors={errors} required type="password" />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-2 w-full'>
            <Button disabled={isLoading} label='Continue with Google' onClick={() => signIn('google')} icon={FcGoogle} outline />
            <Button disabled={isLoading} label='Continue with Github' onClick={() => signIn('github')} icon={AiFillGithub} outline />

            <div>
                <div className="text-neutral-500 text-center mt-1 font-light">
                    <div className="justify-center flex flex-row items-center gap-2">
                        <div>Already have an account?</div>
                        <div onClick={() => {
                            loginModal.onOpen();
                            registerModal.onClose();
                        }} className="text-rose-500 cursor-pointer hover:underline">Login</div>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title="Register User" actionLabel="Register" onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    )
}

export default RegisterModal