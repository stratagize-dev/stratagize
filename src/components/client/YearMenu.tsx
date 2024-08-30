'use client';

import { useRouter } from 'next/navigation';
import { CustomMenu, MenuItemProps } from '@/components/CustomMenu';

export function YearMenu() {
  const router = useRouter();

  const menuItems: MenuItemProps[] = Array.from({ length: 14 }, (_, index) => ({
    buttonText: `${index + 2010}`,
    onClick: () => router.push(`/${index + 2010}`)
  }));

  return <CustomMenu text="Year" menuItems={menuItems} />;
}
