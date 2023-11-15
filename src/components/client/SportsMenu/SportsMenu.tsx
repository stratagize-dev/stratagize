'use client';

import { CustomMenu } from '@/components/CustomMenu/CustomMenu';

export function SportsMenu() {
  return (
    <CustomMenu text="Sports" menuItems={[{ buttonText: 'Trail running' }]} />
  );
}
