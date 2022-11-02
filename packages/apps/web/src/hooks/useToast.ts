import { useRef } from "react";

import type { ToastHandles } from "@nlw-copa/components/Toast";

export function useToast() {
  const toastRef = useRef<ToastHandles>(null);
  const showToast = toastRef.current?.show ?? (() => {});

  return { toastRef, showToast };
}
