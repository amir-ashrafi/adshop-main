'use client';

import { UserButton } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';

const AdminMenu = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="داشبورد"
          labelIcon={<LayoutDashboard size={16} />}
          href="/dashboard/original"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default AdminMenu;
