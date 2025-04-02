import { ReactNode } from 'react';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Since we already have middleware protecting our routes,
  // we can opt to simplify this component and let middleware
  // handle the redirects. No extra checks needed here.
  
  return (
    <div className="admin-layout">
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  );
}
