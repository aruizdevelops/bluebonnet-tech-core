'use client';

import { createContext, useContext, useMemo } from 'react';

const TenantContext = createContext(null);

const defaultTenantConfig = {
  id: 'core',
  name: 'Bluebonnet Tech',
  logo: null,
  theme: {},
  features: {},
};

export function TenantProvider({ config = {}, children }) {
  const tenant = useMemo(
    () => ({ ...defaultTenantConfig, ...config }),
    [config]
  );

  return (
    <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}

export default TenantProvider;
