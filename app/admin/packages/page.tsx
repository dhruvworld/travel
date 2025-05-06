'use client';

import type { FC } from 'react';
import PackageManager from '@/components/admin/PackageManager';
import type { PackageItem } from '@/types/package';
import { getAllPackages } from "../../lib/services/firebase-package";

const AdminPackagesPage: FC = () => {
  const initial: PackageItem[] = [{
    id: '',
    title: '',
    description: '',
    price: 0,
    duration: 0,
    location: '',
    image: '',
    highlights: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }];

  return <PackageManager label="Manage Tour Packages" initial={initial} />;
};

export default AdminPackagesPage;
