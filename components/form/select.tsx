import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

const Select = ({ optionsList = [], value = '', handleChange }) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-start gap-x-1.5 rounded-md bg-white px-6 py-4 text-base font-medium text-textSecondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {value || 'Select One'}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10  !w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 ">
              {optionsList.map((eachOption: any, id) => (
                <Menu.Item onClick={() => handleChange(eachOption)} key={id + 1 + ''}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`
                      ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                      block px-4 py-2 text-base
                    
                      `}
                    >
                      {eachOption.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Select;
