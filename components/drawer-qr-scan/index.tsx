import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ScanToPay from 'components/drawer-qr-scan/qr-scanner';
import Link from 'next/link';
import { Fragment, forwardRef, useImperativeHandle, useState } from 'react';

function DrawerQRScan(props: any, ref: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false)
    }),
    []
  );

  function closeModal() {
    setIsOpen(false);
    if(props.closePayMode) {
      props.closePayMode();
    }
    
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:mx-auto md:w-[400px]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed bottom-0 flex h-fit max-w-full ">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-y-full"
                  enterTo="translate-y-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-y-0"
                  leaveTo="translate-y-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen ">
                    <div
                      className={`flex h-full w-full flex-col overflow-y-scroll rounded-t-lg bg-white md:mx-auto md:w-[400px] ${
                        isOpen ? '' : 'py-6'
                      } shadow-xl`}
                    >
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-semibold text-gray-900">
                            {props.panelTitle || ''}
                          </Dialog.Title>

                          <div className="ml-3 flex h-7 items-center">
                            <Link href="">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </Link>
                          </div>
                        </div>
                        <p className="mt-3 text-lg font-medium text-gray-400">
                          Please specify the number of token to be received to share QR code.
                        </p>
                      </div>
                      <div className={`relative mt-6 flex-1 ${isOpen ? '' : ' px-4 sm:px-6'} `}>
                        {isOpen && (
                          <ScanToPay
                            shareQr={props.shareQr}
                            setScanData={props.setScanData}
                            closeScanner={closeModal}
                          />
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default forwardRef(DrawerQRScan);
