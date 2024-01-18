'use client';
import { CustomMenu, MenuItemProps } from '@/components/CustomMenu';
import toast from 'react-hot-toast';
import { useState } from 'react';

export function AdminMenu() {
  const [isDisabled, setIsDisabled] = useState(false);

  const reloadData = async () => {
    const id = toast.loading('Reloading Activities');
    fetch('/api/admin/reload-activities', { method: 'post' })
      .then(() => {
        setIsDisabled(true);
        toast.success('Reload begun', { id });
      })
      .catch(() => toast.error('whoops something went wrong', { id }))
      .finally(() => setIsDisabled(false));
  };

  const menuItems: MenuItemProps[] = [
    { buttonText: 'Reload Data', onClick: () => reloadData(), isDisabled }
  ];

  return <CustomMenu text="Admin" menuItems={menuItems} />;
}
