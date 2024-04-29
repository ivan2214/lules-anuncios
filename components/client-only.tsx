'use client';

import { useEffect, useState } from 'react';

export const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  return <>{children}</>;
};
