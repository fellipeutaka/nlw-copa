import { forwardRef, InputHTMLAttributes } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    type="text"
    className="flex-1 px-6 py-4 rounded bg-zinc-800 focus:border-amber-400 border border-zinc-600 outline-none text-sm transition-colors"
    {...props}
    ref={ref}
  />
));

Input.displayName = "Input";
