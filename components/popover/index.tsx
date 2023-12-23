'use-client';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon, ShieldExclamationIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react';

interface PopupBoxProps {
  isOpenPopup?: boolean;
  title?: string;
  message?: string;
  messageTitle?: string;
  children?: React.ReactNode;
  imageUrl?: string;
}

function PopupBox(props: PopupBoxProps, ref: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<any>({
    type: '',
    message: ''
  });
  useImperativeHandle(
    ref,
    () => ({
      open: (value: any) => {
        setMessageInfo({ ...value, type: value.type, message: value.message });
        openModal();
      },
      close: () => closeModal()
    }),
    []
  );
  function closeModal() {
    setIsOpen(false);
    setMessageInfo({});
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-md shadow-xl">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    <div className="flex items-center justify-between">
                      <p className="m-0 text-center"> {messageInfo.title}</p>
                      <div
                        className="flex items-center justify-center w-10 h-10 "
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon width="24px" height="24px" />
                      </div>
                    </div>
                  </Dialog.Title>

                  {messageInfo.imageUrl && (
                    <div className="flex justify-center mt-8">
                      <Image src={messageInfo.imageUrl} alt="img" width={220} height={220} />
                    </div>
                  )}

                  <div className="flex flex-col flex-nowrap   items-center justify-center gap-2 [@media(max-width:500px)]:flex-wrap ">
                    {(messageInfo.type === 'alert' && (
                      <ShieldExclamationIcon width={150} height={150} className="text-orange-500" />
                    )) ||
                      null}
                    {(messageInfo.type === 'success' && (
                      <CheckCircleIcon width={150} height={150} className="text-green-500" />
                    )) ||
                      null}

                    {messageInfo.type === 'error' && (
                      <XMarkIcon width={150} height={150} className="text-red-500" />
                    )}
                    <div className="my-6 text-center">
                      <p className="text-xl font-bold">{messageInfo.messageTitle}</p>
                      <p className="text-lg font-medium text-textSecondary">
                        {messageInfo.message}
                      </p>
                    </div>

                    {props.children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default forwardRef(PopupBox);
