'use client';
import { CustomMenu, MenuItemProps } from '@/components/CustomMenu';

export function AdminMenu() {
  const reloadData = () => {};

  const menuItems: MenuItemProps[] = [
    { buttonText: 'Reload Data', onClick: () => {} }
  ];

  return <CustomMenu text="Admin" menuItems={menuItems} />;
}
