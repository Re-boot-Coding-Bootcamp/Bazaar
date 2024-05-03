"use client";

import { SnackbarProvider } from "notistack";
import { createContext, useContext, useEffect, useState } from "react";

const IsClientContext = createContext(false);

export const IsClientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <IsClientContext.Provider value={isClient}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {children}
      </SnackbarProvider>
    </IsClientContext.Provider>
  );
};

export function useIsClient() {
  return useContext(IsClientContext);
}
