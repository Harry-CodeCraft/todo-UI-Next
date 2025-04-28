"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/redux/store";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <Provider store={storeRef.current}>{children}</Provider>
    </AppRouterCacheProvider>
  );
};
