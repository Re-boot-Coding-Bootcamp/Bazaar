"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { initializeCart, makeStore, type AppStore } from "~/lib";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeCart());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
