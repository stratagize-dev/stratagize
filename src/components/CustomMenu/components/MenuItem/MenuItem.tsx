import { Menu } from '@headlessui/react';
import React from 'react';
import { MenuItemProps } from '@/components/CustomMenu/components/MenuItem/MenuItemProps';

export function MenuItem({ buttonText, onClick }: MenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active
              ? 'text-purple-500 font-semibold bg-purple-50'
              : 'text-purple-500'
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </Menu.Item>
  );
}
