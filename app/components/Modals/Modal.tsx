'use client';
import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement | string;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel,
}) => {
    const [showModal,setShowModal] = useState(false);
    useEffect(() => {
        setShowModal(isOpen);
    },[isOpen]);
    const handleClose = useCallback(() => {
      if(disabled){
        return;
      }
      setShowModal(false);
      setTimeout(() => {
        onClose();
      },300)
    },[disabled, onClose])

    const handleSubmit = useCallback(() => {
        if(disabled){
            return;
        }
        onSubmit();
    },[disabled,onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction){
            return;
        }
        secondaryAction();
    },[disabled,secondaryAction]);
    if(!isOpen){
        return null;
    }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
         <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 h-full mx-auto lg:h-auto md:h-auto">
           <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
             <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none ">
                <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                   <button className="p-1 boder-0 hover:opacity-70 transition absolute left-9" onClick={handleClose}>
                    <IoMdClose size={18} />
                   </button>
                   <div className="text-lg font-semibold">
                    {title}
                   </div>
                </div>
                <div className="relative p-6 flex-auto">
                    {body}
                </div>
                <div className="flex flex-col gap-2 p-6">
                   <div className="flex flex-row justify-center items-center gap-4 w-full">
                    {secondaryAction && secondaryLabel && (
                     <Button label={secondaryLabel} disabled={disabled} onClick={handleSecondaryAction} outline />
                    )}
                     <Button label={actionLabel} disabled={disabled} onClick={handleSubmit} />
                   </div>
                </div>
                {footer && (<div className="flex items-center p-6 rounded-b justify-between relative border-t-[1px]">
                  <div className="text-sm text-neutral-500 w-full">
                    {footer}
                  </div>
                </div>)}
             </div>
           </div>
         </div>
      </div>
    </>
  )
}

export default Modal;