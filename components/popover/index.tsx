'use-client';
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  ArrowDownOnSquareIcon,
  LockClosedIcon,
  ShareIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Button from 'components/botton';

interface PopupBoxProps {
  isOpenPopup?: boolean;
  setIsOpenPopup?: any;
  PopupTitle?: string;
  children?: React.ReactNode;
}

const PopupBox: React.FC<PopupBoxProps> = ({
  isOpenPopup,
  setIsOpenPopup,
  PopupTitle,
  children
}) => {
  return (
    <>
      <Transition appear show={isOpenPopup} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpenPopup(false)}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    <div className="flex items-center justify-between">
                      <span></span>
                      <p className="m-0 text-center"> {PopupTitle}</p>
                      <div
                        className="flex h-10 w-10 items-center justify-center "
                        onClick={() => setIsOpenPopup(false)}
                      >
                        <XMarkIcon width="24px" height="24px" />
                      </div>
                    </div>
                  </Dialog.Title>
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">QR CODE HERE</p>
                  </div>

                  <div className="my-8 text-center">
                    <p className="text-textSecondary text-lg font-medium">
                      Scan this QR code to receive payments
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 ">
                    {/* <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpenPopup(false)}
                    >
                      Got it, thanks!
                    </button> */}

                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PopupBox;
