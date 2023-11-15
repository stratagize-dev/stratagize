import { Menu } from '@headlessui/react';
import React from 'react';
import { MenuItemProps } from '@/components/CustomMenu/components/MenuItem/MenuItemProps';

export function MenuItem({ buttonText }: MenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active
              ? 'text-orange-500 font-semibold bg-orange-50'
              : 'text-orange-500'
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          {buttonText}
        </button>
      )}
    </Menu.Item>
  );
}
