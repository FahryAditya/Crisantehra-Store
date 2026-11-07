"use client";

import { useCrossDeviceSync } from "@/hooks/use-cross-device-sync";

export function SyncProvider({ children }: { children: React.ReactNode }) {
  useCrossDeviceSync();
  return <>{children}</>;
}

