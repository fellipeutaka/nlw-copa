import { forwardRef, useState, useImperativeHandle, useCallback } from "react";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { CheckCircle, Warning, WarningCircle, X } from "phosphor-react";

type Category = "default" | "success" | "error" | "warning";

type ToastProps = {
  message?: string;
  description?: string;
  category?: Category;
} & ToastPrimitive.ToastProps

type ShowProps = {
  message: string;
  description: string;
  category?: Category;
}

export type ToastHandles = {
  show: (props?: ShowProps) => void;
}

export const Toast = forwardRef<ToastHandles, ToastProps>(
  (initialProps, ref) => {
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [{ category = "default", ...props }, setToastProps] =
      useState(initialProps);

    const show = useCallback((props?: ToastProps) => {
      if (props) {
        setToastProps(props);
      }
      setIsToastVisible(true);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        show,
      }),
      [show]
    );

    return (
      <ToastPrimitive.Provider>
        <ToastPrimitive.Root
          defaultOpen={false}
          duration={4000}
          open={isToastVisible}
          onOpenChange={setIsToastVisible}
          className={`
            data-[state="closed"]:animate-hide
            data-[state="open"]:animate-slideIn
            data-[swipe="move"]:translate-x-[var(--radix-toast-swipe-move-x)]
            data-[swipe="cancel"]:translate-x-0
            data-[swipe="cancel"]:transition-transform
            data-[swipe="cancel"]:duration-200
            data-[swipe="cancel"]:ease-out
            data-[swipe="end"]:animate-swipeOut
            shadow-lg shadow-black/50
            bg-zinc-800 rounded p-4 relative${
              category !== "default"
                ? " grid grid-cols-[40px,1fr] items-center gap-4"
                : ""
            }`}
          {...props}
        >
          {category === "success" ? (
            <CheckCircle className="w-10 h-10 text-green-400" />
          ) : null}
          {category === "warning" ? (
            <Warning className="w-10 h-10 text-yellow-400" />
          ) : null}
          {category === "error" ? (
            <WarningCircle className="w-10 h-10 text-red-600" />
          ) : null}
          <div>
            <ToastPrimitive.Title className="mb-1 font-bold">
              {props.message}
            </ToastPrimitive.Title>
            <ToastPrimitive.Description className="text-sm">
              {props.description}
            </ToastPrimitive.Description>
          </div>
          <ToastPrimitive.Close
            className="absolute top-2 right-2"
            title="Close"
          >
            <X className="w-4 h-4 hover:opacity-70 transition-opacity" />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-3 w-96 z-50 outline-none" />
      </ToastPrimitive.Provider>
    );
  }
);

Toast.displayName = "Toast";
