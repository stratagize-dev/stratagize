import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import {
  MenuItem,
  MenuItemProps
} from '@/components/CustomMenu/components/MenuItem';

interface Props {
  text: string;
  menuItems: MenuItemProps[];
}
export function CustomMenu({ text, menuItems }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-purple-500 font-semibold hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {text}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-purple-500"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            {menuItems.map(({ buttonText, onClick }) => (
              <MenuItem
                key={buttonText}
                buttonText={buttonText}
                onClick={onClick}
              />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
